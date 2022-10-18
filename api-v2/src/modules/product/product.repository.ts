import { getConnection } from 'typeorm';
import { PaginationDto } from '../dto/pagination.dto';
import { GetProductByCategoryId } from './dto/get-product-by-categoryid.dto';
import { Product } from './product.entity';

export class ProductRepository {
  async getProductByCategoryId(categoryId: string, pagination: PaginationDto): Promise<GetProductByCategoryId> {
    const { page, limit } = pagination;
    const dataQuery = getConnection()
      .createQueryBuilder()
      .select('*')
      .from(Product, 'P')
      .where('P.categoryId = :categoryId', { categoryId: categoryId })
      const dataCount = await dataQuery.getCount()
      const data = await dataQuery.offset((page - 1) * limit).limit(limit).getRawMany()
      const totalPages: number = dataCount ? Math.ceil(dataCount / limit) : 0;
      return { data, totalPages, totalData: data.length, total: dataCount };
    }
}
