import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseService } from '../../base/base.service';

import appConfig from '../../config/app.config';

import { Product } from './product.entity';

import { CreateProductInput } from './dto/create-product-input.dto';
import { GetOneTaskInput } from './dto/get-one-product-input.dto';
import { GetAllTasksInput } from './dto/get-all-products-input.dto';
import { UpdateTaskInput } from './dto/update-product-input.dto';

@Injectable()
export class ProductService extends BaseService<Product> {
  constructor(
    @Inject(appConfig.KEY)
    private readonly appConfiguration: ConfigType<typeof appConfig>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {
    super(productRepository);
  }

  // CRUD

  public async create(input: CreateProductInput): Promise<Product> {
    const created = this.productRepository.create({
      ...input,
    });

    const saved = await this.productRepository.save(created);

    return saved;
  }

  public async getOne(input: GetOneTaskInput): Promise<Product | undefined> {
    const { uid } = input;

    const existing = await this.getOneByOneFields({
      fields: { uid },
      checkIfExists: false,
    });

    return existing;
  }

  public async getAll(input: GetAllTasksInput): Promise<Product[]> {
    const { limit, skip, q } = input;

    const query = this.productRepository
      .createQueryBuilder('task')
      .loadAllRelationIds();

    if (q)
      query.where('task.description like :q', {
        q: `%${q}%`,
      });

    query.limit(limit || 10).skip(skip);

    const items = await query.getMany();

    return items;
  }

  public async update(
    getOneInput: GetOneTaskInput,
    input: UpdateTaskInput,
  ): Promise<Product> {
    const { uid } = getOneInput;

    const existing = await this.getOneByOneFields({
      fields: { uid },
      checkIfExists: true,
    });

    const preloaded = await this.productRepository.preload({
      id: existing.id,
      ...input,
    });

    const saved = await this.productRepository.save(preloaded);

    return {
      ...existing,
      ...saved,
    } as Product;
  }

  public async delete(input: any): Promise<Product> {
    const { uid } = input;

    const existing = await this.getOneByOneFields({
      fields: { uid },
      checkIfExists: true,
    });

    const clone = { ...existing };

    await this.productRepository.softRemove(existing);

    return clone as Product;
  }

  // CRUD

  public async finish(input: GetOneTaskInput): Promise<Product> {
    const { uid } = input;

    const existing = await this.getOneByOneFields({
      fields: { uid },
      checkIfExists: true,
    });

    const preloaded = await this.productRepository.preload({
      id: existing.id,
      // done: true,
    });

    const saved = await this.productRepository.save(preloaded);

    return {
      ...existing,
      ...saved,
    } as Product;
  }
}
