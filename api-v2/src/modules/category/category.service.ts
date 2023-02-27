import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import appConfig from '../../config/app.config';

import { Category } from './category.entity';

import { CreateCategoryInput } from './dto/create-category-input.dto';
import { GetOneCategoryInput } from './dto/get-one-category-input.dto';
import { GetAllCategoriesInput } from './dto/get-all-categories-input.dto';
import { UpdateCategoryInput } from './dto/update-category-input.dto';

@Injectable()
export class CategoryService {
  constructor(
    @Inject(appConfig.KEY)
    private readonly appConfiguration: ConfigType<typeof appConfig>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  // CRUD

  public async create(input: CreateCategoryInput): Promise<Category> {
    const created = this.categoryRepository.create({
      ...input,
    });

    const saved = await this.categoryRepository.save(created);

    return saved;
  }

  public async getOne(input: GetOneCategoryInput): Promise<Category | undefined> {
    const { id } = input;

    const existing = await this.categoryRepository.findOne({
      where: { id: id },
    });

    return existing;
  }

  public async getAll(input: GetAllCategoriesInput): Promise<Category[]> {
    const { limit, skip, q } = input;

    const query = this.categoryRepository.createQueryBuilder('category').loadAllRelationIds();

    if (q)
      query.where('category.description like :q', {
        q: `%${q}%`,
      });

    query.limit(limit || 10).skip(skip);

    const items = await query.getMany();

    return items;
  }

  public async update(getOneInput: GetOneCategoryInput, input: UpdateCategoryInput): Promise<Category> {
    const { id } = getOneInput;

    const existing = await this.categoryRepository.findOne({
      where: { id: id },
    });

    const preloaded = await this.categoryRepository.preload({
      id: existing.id,
      ...input,
    });

    const saved = await this.categoryRepository.save(preloaded);

    return {
      ...existing,
      ...saved,
    } as Category;
  }

  public async delete(input: any): Promise<Category> {
    const { id } = input;

    const existing = await this.categoryRepository.findOne({
      where: { id: id },
    });

    const clone = { ...existing };

    await this.categoryRepository.softRemove(existing);

    return clone as Category;
  }

  // CRUD

  public async finish(input: GetOneCategoryInput): Promise<Category> {
    const { id } = input;

    const existing = await this.categoryRepository.findOne({
      where: { id: id },
    });

    const preloaded = await this.categoryRepository.preload({
      id: existing.id,
      // done: true,
    });

    const saved = await this.categoryRepository.save(preloaded);

    return {
      ...existing,
      ...saved,
    } as Category;
  }
}
