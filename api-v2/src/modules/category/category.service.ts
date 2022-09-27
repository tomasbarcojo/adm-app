import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseService } from '../../base/base.service';

import appConfig from '../../config/app.config';

import { Category } from './category.entity';

import { CreateCategoryInput } from './dto/create-category-input.dto';
import { GetOneTaskInput } from './dto/get-one-category-input.dto';
import { GetAllTasksInput } from './dto/get-all-categories-input.dto';
import { UpdateTaskInput } from './dto/update-category-input.dto';

@Injectable()
export class CategoryService extends BaseService<Category> {
  constructor(
    @Inject(appConfig.KEY)
    private readonly appConfiguration: ConfigType<typeof appConfig>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {
    super(categoryRepository);
  }

  // CRUD

  public async create(input: CreateCategoryInput): Promise<Category> {
    const created = this.categoryRepository.create({
      ...input,
    });

    const saved = await this.categoryRepository.save(created);

    return saved;
  }

  public async getOne(input: GetOneTaskInput): Promise<Category | undefined> {
    const { uid } = input;

    const existing = await this.getOneByOneFields({
      fields: { uid },
      checkIfExists: false,
    });

    return existing;
  }

  public async getAll(input: GetAllTasksInput): Promise<Category[]> {
    const { limit, skip, q } = input;

    const query = this.categoryRepository.createQueryBuilder('task').loadAllRelationIds();

    if (q)
      query.where('task.description like :q', {
        q: `%${q}%`,
      });

    query.limit(limit || 10).skip(skip);

    const items = await query.getMany();

    return items;
  }

  public async update(getOneInput: GetOneTaskInput, input: UpdateTaskInput): Promise<Category> {
    const { uid } = getOneInput;

    const existing = await this.getOneByOneFields({
      fields: { uid },
      checkIfExists: true,
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
    const { uid } = input;

    const existing = await this.getOneByOneFields({
      fields: { uid },
      checkIfExists: true,
    });

    const clone = { ...existing };

    await this.categoryRepository.softRemove(existing);

    return clone as Category;
  }

  // CRUD

  public async finish(input: GetOneTaskInput): Promise<Category> {
    const { uid } = input;

    const existing = await this.getOneByOneFields({
      fields: { uid },
      checkIfExists: true,
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
