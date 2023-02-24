import { InjectRepository } from '@nestjs/typeorm';
import { EntityRepository, getConnection, Repository } from 'typeorm';
import { PaginationDto } from '../dto/pagination.dto';
import { Product } from '../product/product.entity';
import { Supplier } from '../supplier/supplier.entity';
import { CreatePurchaseInput } from './dto/create-purchase-input.dto';
import { GetAllPurchasesInput } from './dto/get-all-purchase-input.dto';
import { GetAllPurchasesOutput } from './dto/get-all-purchase-output.dto';
import { PurchasedProductList } from './dto/get-details-by-purchase-id.dto';
import { GetOnePurchaseInput } from './dto/get-one-purchase-input.dto';
import { PurchasedProduct } from './entities/purchase-product.entity';
import { Purchase } from './entities/purchase.entity';

@EntityRepository(Purchase)
export class PurchaseRepository extends Repository<Purchase> {
  constructor(
    @InjectRepository(PurchasedProduct)
    private readonly purchasedProductRepository: Repository<PurchasedProduct>,
  ) {
    super();
  }

  async createPurchase(input: CreatePurchaseInput) {
    const newPurchaseInstance = this.create(input);
    const newPurchase = await this.save(newPurchaseInstance);

    return newPurchase;
  }

  async getAllPurchases(pagination: PaginationDto): Promise<GetAllPurchasesOutput> {
    const { page, limit } = pagination;
    const dataQuery = getConnection()
      .createQueryBuilder()
      .select([
        'P.id as id',
        'S.businessName as businessName',
        'P.purchaseStatus as purchaseStatus',
        'P.createdAt as createdAt',
        'P.updatedAt as updatedAt',
        'P.paymentExpirationDate as paymentExpirationDate',
      ])
      .from(Purchase, 'P')
      .innerJoin(Supplier, 'S', 'P.supplierId = S.id')
      .where('P.deletedAt IS NULL');

    const dataCount = await dataQuery.getCount();
    const data = await dataQuery
      .offset((page - 1) * limit)
      .limit(limit)
      .getRawMany();
    const totalPages: number = dataCount ? Math.ceil(dataCount / limit) : 0;

    return { data, totalPages, totalData: data.length, total: dataCount };
  }

  async getDetailsByPurchaseId(input: GetOnePurchaseInput): Promise<PurchasedProductList[]> {
    const { purchaseId } = input;

    const dataQuery = getConnection()
      .createQueryBuilder()
      .select(['PP.productId as productId', 'PP.quantity as quantity', 'PP.price as price', 'PP.discount as discount', 'PR.name as name'])
      .from(Purchase, 'P')
      .innerJoin(PurchasedProduct, 'PP', 'PP.purchaseId = P.id')
      .innerJoin(Product, 'PR', 'PR.id = PP.productId')
      .where('PP.purchaseId = :purchaseId', { purchaseId: purchaseId })
      .andWhere('P.deletedAt IS NULL');

    return await dataQuery.getRawMany();
  }
}
