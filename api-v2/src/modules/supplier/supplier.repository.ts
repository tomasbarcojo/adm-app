import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { PaginationDto } from '../dto/pagination.dto';
import { GetAllSupplierInput } from './dto/get-all-supplier-input.dto';
import { Supplier } from './supplier.entity';

export class SupplierRepository {
  constructor(@InjectDataSource() private dataSource: DataSource) {}
  async getAllSuppliers(input: GetAllSupplierInput, pagination: PaginationDto) {
    const { search } = input;
    const { page, limit } = pagination;
    const dataQuery = this.dataSource.createQueryBuilder().select('*').from(Supplier, 'P').where('P.deletedAt IS NULL');

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
