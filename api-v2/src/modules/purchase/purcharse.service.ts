import { HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { Connection, Repository, In } from 'typeorm';
import { PaginationDto } from '../dto/pagination.dto';
import { Product } from '../product/product.entity';
import { CreatePurchaseInput } from './dto/create-purchase-input.dto';
import { GetAllPurchasesInput } from './dto/get-all-purchase-input.dto';
import { GetDetailsByPurchaseId } from './dto/get-details-by-purchase-id.dto';
import { GetOnePurchaseInput } from './dto/get-one-purchase-input.dto';
import { GetPurchaseDetailInput } from './dto/get-purchase-detail-input.dto';
import { UpdatePurchaseInput } from './dto/update-purchase-input.dto';
import { PurchasedProduct } from './entities/purchase-product.entity';
import { Purchase, PurchaseStatus } from './entities/purchase.entity';
import { PurchaseRepository } from './purchase.repository';

@Injectable()
export class PurchaseService {
  constructor(
    private connection: Connection,
    private readonly purchaseRepository: PurchaseRepository,
    @InjectRepository(PurchasedProduct) private readonly purchasedProductRepository: Repository<PurchasedProduct>,
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
  ) {}

  //CRUD

  public async createPurchase(input: CreatePurchaseInput) {
    const { productList } = input;

    const newPurchase = await this.purchaseRepository.createPurchase(input);

    const productArr = [];
    for (const product of productList) {
      productArr.push({
        productId: product.productId,
        purchaseId: newPurchase.id,
        quantity: product.quantity,
        price: product.price,
        discount: product.discount,
      });
    }

    const prodListInstance = this.purchasedProductRepository.create(productArr);
    await this.purchasedProductRepository.save(prodListInstance);

    return newPurchase;
  }

  public async getAll(pagination: PaginationDto): Promise<any> {
    try {
      const purchasesData = await this.purchaseRepository.getAllPurchases(pagination);
      const purchasesMap = new Map();

      for (const purchase of purchasesData.data) {
        purchasesMap.set(purchase.id, {
          id: purchase.id,
          purchaseState: purchase.purchaseStatus,
          paymentExpirationDate: purchase.paymentExpirationDate,
        });
      }
      return purchasesData;
    } catch (error) {
      return error;
    }
  }

  public async getDetailsByPurchaseId(input: GetOnePurchaseInput): Promise<GetDetailsByPurchaseId> {
    const purchaseDetail = await this.purchaseRepository.getDetailsByPurchaseId(input);
    const initialValue = 0;
    const total = purchaseDetail.reduce(
      (accumulator, product) => accumulator + product.price * product.quantity,
      initialValue,
    );
    return { products: purchaseDetail, total: total };
  }

  public async updateStatus(purchaseId: number, purchaseStatus: PurchaseStatus): Promise<Purchase | string> {
    const invalidChange = [PurchaseStatus.CANCELADA, PurchaseStatus.RECIBIDA];
    const purchase: Purchase = await this.purchaseRepository.findOne({
      where: {
        id: purchaseId,
      },
    });

    if (purchase.purchaseStatus !== purchaseStatus) {
      if (invalidChange.includes(purchase.purchaseStatus as PurchaseStatus)) {
        throw new HttpException(
          'No se puede cambiar el estado de una compra recibida o cancelada',
          HttpStatus.BAD_REQUEST,
        );
      }
    } else return `same status`;

    switch (purchaseStatus) {
      case PurchaseStatus.EN_TRANSITO:
        console.log(`entro al switch de ${PurchaseStatus.EN_TRANSITO}`);
        return purchase;
      case PurchaseStatus.CANCELADA:
        console.log(`entro al switch de ${PurchaseStatus.CANCELADA}`);
        const preloadedCanceled = await this.purchaseRepository.preload({
          id: purchase.id,
          purchaseStatus,
        });
        return await this.purchaseRepository.save(preloadedCanceled);
      case PurchaseStatus.RECIBIDA:
        console.log(`entro al switch de ${PurchaseStatus.RECIBIDA}`);
        const preloadedReceived = await this.purchaseRepository.preload({
          id: purchase.id,
          purchaseStatus,
        });

        const productList = await this.purchasedProductRepository.find({
          where: {
            purchaseId,
          },
        });

        const productsMap = new Map();
        productList.forEach((el) => {
          productsMap.set(el.productId, el.quantity);
        });

        const productsDataForUpdate = await this.productRepository.find({
          where: {
            id: In(productList.map((el) => el.productId)),
          },
        });

        productsDataForUpdate.forEach((el) => {
          const stock = productsMap.get(el.id);
          el.stock += stock;
          productsMap.set(el.id, el);
        });
        this.connection.transaction(async (manager) => {
          await manager.save(await this.productRepository.save(Array.from(productsMap.values())));
          await manager.save(await this.purchaseRepository.save(preloadedReceived));
        });
        return preloadedReceived;
      default:
        break;
    }

    // const preloaded = await this.purchaseRepository.preload({
    //   id: purchase.id,
    //   purchaseStatus,
    // });

    // manager.save(await this.purchaseRepository.save(preloaded));

    // const productList = await this.purchasedProductRepository.find({
    //   where: {
    //     purchaseId,
    //   },
    // });

    // const productsMap = new Map();
    // productList.forEach((el) => {
    //   productsMap.set(el.productId, el.quantity);
    // });

    // const productsDataForUpdate = await this.productRepository.find({
    //   where: {
    //     id: In(productList.map((el) => el.productId)),
    //   },
    // });

    // productsDataForUpdate.forEach((el) => {
    //   const stock = productsMap.get(el.id);
    //   el.stock += stock;
    //   productsMap.set(el.id, el);
    // });

    // await manager.save(await this.productRepository.save(Array.from(productsMap.values())));
    // return 'success';
  }

  // public async update(getOneInput: GetOnePurchaseInput, input: UpdatePurchaseInput): Promise<Purchase> {
  //   const { id } = getOneInput;

  //   const existing = await this.getOneByOneFields({
  //     fields: { id },
  //     checkIfExists: true,
  //   });

  //   const preloaded = await this.purchaseRepository.preload({
  //     id: existing.id,
  //     ...input,
  //   });

  //   const saved = await this.purchaseRepository.save(preloaded);

  //   return {
  //     ...existing,
  //     ...saved,
  //   } as Purchase;
  // }

  // public async delete(input: any): Promise<Purchase> {
  //   const { id } = input;

  //   const existing = await this.getOneByOneFields({
  //     fields: { id },
  //     checkIfExists: true,
  //   });

  //   const clone = { ...existing };

  //   await this.purchaseRepository.softRemove(existing);

  //   return clone as Purchase;
  // }

  // finish?

  // public async finish(input: GetOnePurchaseInput): Promise<Purchase> {
  //   const { id } = input;

  //   const existing = await this.getOneByOneFields({
  //     fields: { id },
  //     checkIfExists: true,
  //   });

  //   const preloaded = await this.purchaseRepository.preload({
  //     id: existing.id,
  //     // done: true,
  //   });

  //   const saved = await this.purchaseRepository.save(preloaded);

  //   return {
  //     ...existing,
  //     ...saved,
  //   } as Purchase;
  // }
}
