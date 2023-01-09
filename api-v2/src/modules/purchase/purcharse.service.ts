import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { Repository } from 'typeorm';
import { CreatePurchaseInput } from './dto/create-purchase-input.dto';
import { GetAllPurchaseInput } from './dto/get-all-purchase-input.dto';
import { GetOnePurchaseInput } from './dto/get-one-purchase-input.dto';
import { GetPurchaseDetailInput } from './dto/get-purchase-detail-input.dto';
import { UpdatePurchaseInput } from './dto/update-purchase-input.dto';
import { Purchase } from './entities/purchase.entity';

@Injectable()
export class PurchaseService extends BaseService<Purchase> {
  constructor(
    @InjectRepository(Purchase)
    private readonly purchaseRepository: Repository<Purchase>,
  ) {
    super(purchaseRepository);
  }

  //CRUD

  public async create(input: CreatePurchaseInput): Promise<Purchase> {
    const created = this.purchaseRepository.create(input);
    const saved = await this.purchaseRepository.save(created);

    return saved;
  }

  public async getOne(input: GetOnePurchaseInput): Promise<Purchase | undefined> {
    const existing = await this.getOneByOneFields({
      fields: input,
      checkIfExists: false,
    });

    return existing;
  }

  public async getAll(input: GetAllPurchaseInput): Promise<Purchase[]> {
    try {
      const { limit, skip, q } = input;
      const query = this.purchaseRepository.createQueryBuilder().loadAllRelationIds();
      if (q)
        query
          .where('purcharseName like :q', {
            q: `%${q}%`,
          })
          .andWhere('id = :q', { q: `%${q}%` });

      query.limit(limit || 10).skip(skip);

      const purcharse = await query.getMany();

      if (purcharse.length === 0) {
        throw new NotFoundException('No purchase');
      }

      return purcharse;
    } catch (error) {
      return error;
    }
  }

  public async getDetail(input: GetPurchaseDetailInput): Promise<Purchase> {
    const existing = await this.getOneByOneFields({
      fields: input,
      checkIfExists: false,
    });

    return existing;
  }

  public async update(getOneInput: GetOnePurchaseInput, input: UpdatePurchaseInput): Promise<Purchase> {
    const { id } = getOneInput;

    const existing = await this.getOneByOneFields({
      fields: { id },
      checkIfExists: true,
    });

    const preloaded = await this.purchaseRepository.preload({
      id: existing.id,
      ...input,
    });

    const saved = await this.purchaseRepository.save(preloaded);

    return {
      ...existing,
      ...saved,
    } as Purchase;
  }

  public async delete(input: any): Promise<Purchase> {
    const { id } = input;

    const existing = await this.getOneByOneFields({
      fields: { id },
      checkIfExists: true,
    });

    const clone = { ...existing };

    await this.purchaseRepository.softRemove(existing);

    return clone as Purchase;
  }

  // finish?

  public async finish(input: GetOnePurchaseInput): Promise<Purchase> {
    const { id } = input;

    const existing = await this.getOneByOneFields({
      fields: { id },
      checkIfExists: true,
    });

    const preloaded = await this.purchaseRepository.preload({
      id: existing.id,
      // done: true,
    });

    const saved = await this.purchaseRepository.save(preloaded);

    return {
      ...existing,
      ...saved,
    } as Purchase;
  }
}
