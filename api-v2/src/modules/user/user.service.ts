import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { BaseService } from '../../base/base.service';

import appConfig from '../../config/app.config';

import { User } from './user.entity';

import { CreateUserInput } from './dto/create-user-input.dto';
import { GetOneCategoryInput } from './dto/get-one-user-input.dto';
import { GetAllCategoriesInput } from './dto/get-all-user-input.dto';
import { UpdateCategoryInput } from './dto/update-user-input.dto';
import { LoginUserInput } from './dto/login-user-input.dto';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    @Inject(appConfig.KEY)
    private readonly appConfiguration: ConfigType<typeof appConfig>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super(userRepository);
  }

  // CRUD

  public async create(input: CreateUserInput): Promise<User> {
    const { email } = input;
    const existing = await this.userRepository.findOne({
      email,
    });
    if (existing) {
      throw new NotFoundException(`User already exists`)
    }
    
    const created = this.userRepository.create({
      ...input,
    });

    const saved = await this.userRepository.save(created);

    return saved;
  }

  public async getOne(input: GetOneCategoryInput): Promise<User | undefined> {
    const { id } = input;

    const existing = await this.getOneByOneFields({
      fields: { id },
      checkIfExists: false,
    });

    return existing;
  }

  public async getAll(input: GetAllCategoriesInput): Promise<User[]> {
    const { limit, skip, q } = input;

    const query = this.userRepository.createQueryBuilder('user').loadAllRelationIds();

    if (q)
      query.where('user.description like :q', {
        q: `%${q}%`,
      });

    query.limit(limit || 10).skip(skip);

    const items = await query.getMany();

    return items;
  }

  public async update(getOneInput: GetOneCategoryInput, input: UpdateCategoryInput): Promise<User> {
    const { id } = getOneInput;

    const existing = await this.getOneByOneFields({
      fields: { id },
      checkIfExists: true,
    });

    const preloaded = await this.userRepository.preload({
      id: existing.id,
      ...input,
    });

    const saved = await this.userRepository.save(preloaded);

    return {
      ...existing,
      ...saved,
    } as User;
  }

  public async delete(input: any): Promise<User> {
    const { id } = input;

    const existing = await this.getOneByOneFields({
      fields: { id },
      checkIfExists: true,
    });

    const clone = { ...existing };

    await this.userRepository.softRemove(existing);

    return clone as User;
  }

  // CRUD

  public async finish(input: GetOneCategoryInput): Promise<User> {
    const { id } = input;

    const existing = await this.getOneByOneFields({
      fields: { id },
      checkIfExists: true,
    });

    const preloaded = await this.userRepository.preload({
      id: existing.id,
      // done: true,
    });

    const saved = await this.userRepository.save(preloaded);

    return {
      ...existing,
      ...saved,
    } as User;
  }

  public async login(input: LoginUserInput): Promise<User> {
    const { username, password } = input;

    const existing = await this.userRepository.findOne({
      username,
    });
    if (!existing) {
      throw new NotFoundException(`User doesn't exist`)
    }
    // const isMatch = await bcrypt.compare(password, existing);
    return {
      ...existing,
    } as User;
  }
}
