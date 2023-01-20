import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { Repository } from 'typeorm';
import { PaginationDto } from '../dto/pagination.dto';
import { CreateSupplierInput } from './dto/create-supplier-input.dto';
import { GetAllSupplierInput } from './dto/get-all-supplier-input.dto';
import { GetOneSupplierInput } from './dto/get-one-supplier-input.dto';
import { GetSupplierDetailInput } from './dto/get-supplier-detail-input.dto';
import { UpdateSupplierInput } from './dto/update-supplier-input.dto';
import { Supplier } from './supplier.entity';
import { SupplierRepository } from './supplier.repository';

@Injectable()
export class SupplierService extends BaseService<Supplier> {
  constructor(
    @InjectRepository(Supplier)
    private readonly supplierRepository: Repository<Supplier>,
    @Inject('productRepository') private readonly supplierRepositoryV2: SupplierRepository,
  ) {
    super(supplierRepository);
  }

  //CRUD

  public async create(input: CreateSupplierInput): Promise<Supplier> {
    const created = this.supplierRepository.create(input);
    const saved = await this.supplierRepository.save(created);

    return saved;
  }

  public async getOne(input: GetOneSupplierInput): Promise<Supplier | undefined> {
    const existing = await this.getOneByOneFields({
      fields: input,
      checkIfExists: false,
    });

    return existing;
  }

  public async getAll(input: GetAllSupplierInput, pagination: PaginationDto) {
    try {
      return await this.supplierRepositoryV2.getAllSuppliers(input, pagination);
    } catch (error) {
      return error;
    }
  }

  public async getDetail(input: GetSupplierDetailInput): Promise<Supplier> {
    const existing = await this.getOneByOneFields({
      fields: input,
      checkIfExists: false,
    });

    return existing;
  }

  public async update(getOneInput: GetOneSupplierInput, input: UpdateSupplierInput): Promise<Supplier> {
    const { id } = getOneInput;

    const existing = await this.getOneByOneFields({
      fields: { id },
      checkIfExists: true,
    });

    const preloaded = await this.supplierRepository.preload({
      id: existing.id,
      ...input,
    });

    const saved = await this.supplierRepository.save(preloaded);

    return {
      ...existing,
      ...saved,
    } as Supplier;
  }

  public async delete(input: any): Promise<Supplier> {
    const { id } = input;

    const existing = await this.getOneByOneFields({
      fields: { id },
      checkIfExists: true,
    });

    const clone = { ...existing };

    await this.supplierRepository.softRemove(existing);

    return clone as Supplier;
  }

  // finish?

  public async finish(input: GetOneSupplierInput): Promise<Supplier> {
    const { id } = input;

    const existing = await this.getOneByOneFields({
      fields: { id },
      checkIfExists: true,
    });

    const preloaded = await this.supplierRepository.preload({
      id: existing.id,
      // done: true,
    });

    const saved = await this.supplierRepository.save(preloaded);

    return {
      ...existing,
      ...saved,
    } as Supplier;
  }
}
