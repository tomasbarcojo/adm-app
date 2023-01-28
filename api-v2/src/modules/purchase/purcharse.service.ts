import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { Repository } from 'typeorm';
import { PaginationDto } from '../dto/pagination.dto';
import { Product } from '../product/product.entity';
import { CreatePurchaseInput } from './dto/create-purchase-input.dto';
import { GetAllPurchasesInput } from './dto/get-all-purchase-input.dto';
import { GetDetailsByPurchaseId } from './dto/get-details-by-purchase-id.dto';
import { GetOnePurchaseInput } from './dto/get-one-purchase-input.dto';
import { GetPurchaseDetailInput } from './dto/get-purchase-detail-input.dto';
import { UpdatePurchaseInput } from './dto/update-purchase-input.dto';
import { PurchasedProduct } from './entities/purchase-product.entity';
import { Purchase } from './entities/purchase.entity';
import { PurchaseRepository } from './purchase.repository';

@Injectable()
export class PurchaseService {
  constructor(
    private readonly purchaseRepository: PurchaseRepository,
    @InjectRepository(PurchasedProduct) private readonly purchasedProductRepository: Repository<PurchasedProduct>,
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
          purchaseState: purchase.purchaseState,
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
    const total = purchaseDetail.reduce((accumulator, product) => accumulator + product.price * product.quantity, initialValue);
    return { products: purchaseDetail, total: total };
  }

  // public async getDetail(input: GetPurchaseDetailInput): Promise<Purchase> {
  //   const existing = await this.getOneByOneFields({
  //     fields: input,
  //     checkIfExists: false,
  //   });

  //   return existing;
  // }

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
