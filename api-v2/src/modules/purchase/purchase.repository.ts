import { Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { PaginationDto } from '../dto/pagination.dto';
import { GetAllOutput } from '../product/dto/get-all-products-output.dto';
import { CreatePurchaseInput } from './dto/create-purchase-input.dto';
import { GetAllPurchasesInput } from './dto/get-all-purchase-input.dto';
import { PurchasedProduct } from './entities/purchase-product.entity';
import { Purchase } from './entities/purchase.entity';

export class PurchaseRepository extends Repository<Purchase> {
  constructor(
    @InjectRepository(PurchasedProduct)
    private readonly purchasedProductRepository: Repository<PurchasedProduct>,
  ) {
    super();
  }

  async createPurchase(input: CreatePurchaseInput) {
    const { productList } = input;

    const newPurchaseInstance = this.create(input);
    const newPurchase = await this.save(newPurchaseInstance);

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
    const prodList = await this.purchasedProductRepository.save(prodListInstance);

    return newPurchase;
  }

  async getAllPurchases(input: GetAllPurchasesInput, pagination: PaginationDto): Promise<GetAllOutput> {
    const { search } = input;
    const { page, limit } = pagination;
    const dataQuery = getConnection().createQueryBuilder().select('*').from(Purchase, 'P').where('P.deletedAt IS NULL');

    // if (search) {
    //   dataQuery
    //     .andWhere('P.id like :search', {
    //       search: `%${search}%`,
    //     })
    //     .orWhere('P.name like :search', {
    //       search: `%${search}%`,
    //     });
    // }

    const dataCount = await dataQuery.getCount();
    const data = await dataQuery
      .offset((page - 1) * limit)
      .limit(limit)
      .getRawMany();
    const totalPages: number = dataCount ? Math.ceil(dataCount / limit) : 0;

    return { data, totalPages, totalData: data.length, total: dataCount };
  }
}
