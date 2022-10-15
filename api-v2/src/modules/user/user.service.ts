import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';

import { BaseService } from '../../base/base.service';

import { User } from './user.entity';

import { CreateUserInput } from './dto/create-user-input.dto';
import { GetOneUserInput } from './dto/get-one-user-input.dto';
import { GetAllCategoriesInput } from './dto/get-all-user-input.dto';
import { UpdateUserInput } from './dto/update-user-input.dto';
import { LoginUserInput } from './dto/login-user-input.dto';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(
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
      throw new BadRequestException(`User already exists`);
    }

    const created = this.userRepository.create({
      ...input,
    });

    const saved = await this.userRepository.save(created);

    return saved;
  }

  public async getOne(input: GetOneUserInput): Promise<User | undefined> {
    const existing = await this.getOneByOneFields({
      fields: input,
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

  public async update(getOneInput: GetOneUserInput, input: UpdateUserInput): Promise<User> {
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

  public async finish(input: GetOneUserInput): Promise<User> {
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
}
