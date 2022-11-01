import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseService } from 'src/base/base.service';

import appConfig from 'src/config/app.config';

import { Pricelist } from './entity/pricelist.entity';

import { CreatePricelistInput } from './dto/create-pricelist-input.dto';
import { GetOnePricelistInput } from './dto/get-one-pricelist-input.dto';
import { GetAllPricelistInput } from './dto/get-all-pricelist-input.dto';
import { UpdatePricelistInput } from './dto/update-pricelist-input.dto';

@Injectable()
export class PricelistService extends BaseService<Pricelist> {
  constructor(
    @Inject(appConfig.KEY)
    private readonly appConfiguration: ConfigType<typeof appConfig>,
    @InjectRepository(Pricelist)
    private readonly pricelistRepository: Repository<Pricelist>,
  ) {
    super(pricelistRepository);
  }

  //CRUD

  public async create(input: CreatePricelistInput): Promise<Pricelist> {
    const created = this.pricelistRepository.create(input);

    const saved = await this.pricelistRepository.save(created);

    return saved;
  }

  public async getOne(input: GetOnePricelistInput): Promise<Pricelist | undefined> {
    const existing = await this.getOneByOneFields({
      fields: input,
      checkIfExists: false,
    });

    return existing;
  }

  public async getAll(input: GetAllPricelistInput): Promise<Pricelist[]> {
    try {
      const { limit, skip, q } = input;
      const query = this.pricelistRepository.createQueryBuilder().loadAllRelationIds();

      if (q)
        query
          .where('name like :q', {
            q: `%${q}%`,
          })
          .andWhere('id = :q', { q: `%${q}%` });

      query.limit(limit || 10).skip(skip);

      const pricelist = await query.getMany();

      if (pricelist.length === 0) {
        throw new NotFoundException('No pricelist');
      }

      return pricelist;
    } catch (error) {
      return error;
    }
  }

  public async update(getOneInput: GetOnePricelistInput, input: UpdatePricelistInput): Promise<Pricelist> {
    const { id } = getOneInput;

    const existing = await this.getOneByOneFields({
      fields: { id },
      checkIfExists: true,
    });

    const preloaded = await this.pricelistRepository.preload({
      id: existing.id,
      ...input,
    });

    const saved = await this.pricelistRepository.save(preloaded);

    return {
      ...existing,
      ...saved,
    } as Pricelist;
  }

  public async delete(input: any): Promise<Pricelist> {
    const { id } = input;

    const existing = await this.getOneByOneFields({
      fields: { id },
      checkIfExists: true,
    });

    const clone = { ...existing };

    await this.pricelistRepository.softRemove(existing);

    return clone as Pricelist;
  }

  public async finish(input: GetOnePricelistInput): Promise<Pricelist> {
    const { id } = input;

    const existing = await this.getOneByOneFields({
      fields: { id },
      checkIfExists: true,
    });

    const preloaded = await this.pricelistRepository.preload({
      id: existing.id,
    });

    const saved = await this.pricelistRepository.save(preloaded);

    return {
      ...existing,
      ...saved,
    } as Pricelist;
  }
}
