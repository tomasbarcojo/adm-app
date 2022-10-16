import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseService } from '../../base/base.service';

import appConfig from '../../config/app.config';

import { Product } from './product.entity';

import { CreateProductInput } from './dto/create-product-input.dto';
import { GetOneProductInput } from './dto/get-one-product-input.dto';
import { GetAllProductsInput } from './dto/get-all-products-input.dto';
import { UpdateProductInput } from './dto/update-product-input.dto';

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
    const created = this.productRepository.create(input);

    const saved = await this.productRepository.save(created);

    return saved;
  }

  public async getOne(input: GetOneProductInput): Promise<Product | undefined> {
    const { id } = input;

    const existing = await this.getOneByOneFields({
      fields: { id },
      checkIfExists: false,
    });

    return existing;
  }

  public async getAll(input: GetAllProductsInput): Promise<Product[]> {
    try {
      const { limit, skip, q } = input;
      const query = this.productRepository.createQueryBuilder().loadAllRelationIds();

      if (q)
        query
          .where('articleName like :q', {
            q: `%${q}%`,
          })
          .andWhere('id = :q', { q: `%${q}%` });

      query.limit(limit || 10).skip(skip);

      const products = await query.getMany();

      if (products.length === 0) {
        throw new NotFoundException('No products');
      }

      return products;
    } catch (error) {
      return error;
    }
  }

  public async update(getOneInput: GetOneProductInput, input: UpdateProductInput): Promise<Product> {
    const { id } = getOneInput;

    const existing = await this.getOneByOneFields({
      fields: { id },
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
    const { id } = input;

    const existing = await this.getOneByOneFields({
      fields: { id },
      checkIfExists: true,
    });

    const clone = { ...existing };

    await this.productRepository.softRemove(existing);

    return clone as Product;
  }

  // CRUD

  public async finish(input: GetOneProductInput): Promise<Product> {
    const { id } = input;

    const existing = await this.getOneByOneFields({
      fields: { id },
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
