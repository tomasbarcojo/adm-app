import { getConnection } from 'typeorm';
import { PaginationDto } from '../dto/pagination.dto';
import { GetAllOutput } from '../product/dto/get-product-by-categoryid.dto';
import { GetAllSupplierInput } from './dto/get-all-supplier-input.dto';
import { Supplier } from './supplier.entity';

export class SupplierRepository {
  async getAllSuppliers(input: GetAllSupplierInput, pagination: PaginationDto): Promise<GetAllOutput> {
    const { search } = input;
    const { page, limit } = pagination;
    const dataQuery = getConnection().createQueryBuilder().select('*').from(Supplier, 'P').where('P.deletedAt IS NULL');

    if (search) {
      dataQuery
        .andWhere('P.id like :search', {
          search: `%${search}%`,
        })
        .orWhere('P.businessName like :search', {
          search: `%${search}%`,
        });
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