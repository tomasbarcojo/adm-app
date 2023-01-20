import { InjectRepository } from '@nestjs/typeorm';
import { EntityRepository, getConnection, Repository } from 'typeorm';
import { PaginationDto } from '../dto/pagination.dto';
import { CreatePurchaseInput } from './dto/create-purchase-input.dto';
import { GetAllPurchasesInput } from './dto/get-all-purchase-input.dto';
import { GetAllPurchasesOutput } from './dto/get-all-purchase-output.dto';
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

  async getAllPurchases(input: GetAllPurchasesInput, pagination: PaginationDto): Promise<GetAllPurchasesOutput> {
    const { page, limit } = pagination;
    const dataQuery = getConnection()
      .createQueryBuilder()
      .select([
        'P.id as id',
        'P.purchaseState as purchaseState',
        'P.paymentExpirationDate as paymentExpirationDate',
        'PP.productId as productId',
        'PP.quantity as quantity',
        'PP.price as price',
        'PP.discount as discount',
      ])
      .from(Purchase, 'P')
      .innerJoin(PurchasedProduct, 'PP', 'PP.purchaseId = P.id')
      .where('P.deletedAt IS NULL');

    const dataCount = await dataQuery.getCount();
    const data = await dataQuery
      .offset((page - 1) * limit)
      .limit(limit)
      .getRawMany();
    const totalPages: number = dataCount ? Math.ceil(dataCount / limit) : 0;

    return { data, totalPages, totalData: data.length, total: dataCount };
  }
}
