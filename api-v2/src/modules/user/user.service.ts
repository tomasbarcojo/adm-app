import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';

import { User } from './user.entity';

import { CreateUserInput } from './dto/create-user-input.dto';
import { GetOneUserInput } from './dto/get-one-user-input.dto';
import { GetAllCategoriesInput } from './dto/get-all-user-input.dto';
import { UpdateUserInput } from './dto/update-user-input.dto';
import { LoginUserInput } from './dto/login-user-input.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // CRUD

  public async create(input: CreateUserInput): Promise<User> {
    const { email } = input;
    const existing = await this.userRepository.findOne({
      where: { email: email },
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
    const existing = await this.userRepository.findOne({
      where: { id: input.id },
    });
    return existing;
  }

  public async getAll(input: GetAllCategoriesInput): Promise<User[]> {
    const { limit, skip, q } = input;

    const query = this.userRepository.createQueryBuilder('user').loadAllRelationIds();

    if (q)
      query
        .where('user.id like :q', {
          q: `%${q}%`,
        })
        .orWhere('user.firstName like :q', {
          q: `%${q}%`,
        });

    query.limit(limit || 10).skip(skip);

    const items = await query.getMany();

    return items;
  }

  public async update(getOneInput: GetOneUserInput, input: UpdateUserInput): Promise<User> {
    const { id } = getOneInput;

    const existing = await this.userRepository.findOne({
      where: { id: id },
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

    const existing = await this.userRepository.findOne({
      where: { id: id },
    });

    const clone = { ...existing };

    await this.userRepository.softRemove(existing);

    return clone as User;
  }

  // CRUD

  public async finish(input: GetOneUserInput): Promise<User> {
    const { id } = input;

    const existing = await this.userRepository.findOne({
      where: { id: id },
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
