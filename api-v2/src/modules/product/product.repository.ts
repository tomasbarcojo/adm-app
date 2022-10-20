import { getConnection } from 'typeorm';
import { PaginationDto } from '../dto/pagination.dto';
import { GetAllProductsInput } from './dto/get-all-products-input.dto';
import { GetAllProductsOutput } from './dto/get-product-by-categoryid.dto';
import { Product } from './product.entity';

export class ProductRepository {
  async getAllProducts(input: GetAllProductsInput, pagination: PaginationDto): Promise<GetAllProductsOutput> {
    const { id, categoryId, name } = input;
    const { page, limit } = pagination;

    const dataQuery = getConnection().createQueryBuilder().select('*').from(Product, 'P');

    if (id) {
      dataQuery.where('P.id like :q', {
        id: `%${id}%`,
      });
    }
    if (name) {
      dataQuery.where('P.name like :q', {
        name: `%${name}%`,
      });
    }
    if (categoryId) {
      dataQuery.where('P.categoryId = :categoryId', { categoryId: categoryId });
    }

    const dataCount = await dataQuery.getCount();
    const data = await dataQuery
      .offset((page - 1) * limit)
      .limit(limit)
      .getRawMany();
    const totalPages: number = dataCount ? Math.ceil(dataCount / limit) : 0;

    return { data, totalPages, totalData: data.length, total: dataCount };
  }
}
