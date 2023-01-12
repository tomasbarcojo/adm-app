import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { Repository } from 'typeorm';
import { PaginationDto } from '../dto/pagination.dto';
import { Product } from '../product/product.entity';
import { CreatePurchaseInput } from './dto/create-purchase-input.dto';
import { GetAllPurchasesInput } from './dto/get-all-purchase-input.dto';
import { GetOnePurchaseInput } from './dto/get-one-purchase-input.dto';
import { GetPurchaseDetailInput } from './dto/get-purchase-detail-input.dto';
import { UpdatePurchaseInput } from './dto/update-purchase-input.dto';
import { PurchasedProduct } from './entities/purchase-product.entity';
import { Purchase } from './entities/purchase.entity';
import { PurchaseRepository } from './purchase.repository';

@Injectable()
export class PurchaseService {
  constructor(@Inject('purchaseRepository') private readonly purchaseRepository: PurchaseRepository) {}

  //CRUD

  public async create(input: CreatePurchaseInput): Promise<Purchase> {
    return this.purchaseRepository.createPurchase(input);
  }

  // public async getOne(input: GetOnePurchaseInput): Promise<Purchase | undefined> {
  //   const existing = await this.getOneByOneFields({
  //     fields: input,
  //     checkIfExists: false,
  //   });

  //   return existing;
  // }

  public async getAll(input: GetAllPurchasesInput, pagination: PaginationDto): Promise<any> {
    try {
      const purchasesData = this.purchaseRepository.getAllPurchases(input, pagination);
      // const { limit, skip, q } = input;
      // const query = this.purchaseRepository
      //   .createQueryBuilder('P')
      //   .select('*')
      //   .innerJoin(PurchasedProduct, 'PP', 'P.id = PP.purchaseId');
      // if (q)
      //   query
      //     .where('purcharseName like :q', {
      //       q: `%${q}%`,
      //     })
      //     .andWhere('id = :q', { q: `%${q}%` });

      // query.limit(limit || 10).skip(skip);

      // const purcharse = await query.getRawMany();

      // if (purchasesData.length === 0) {
      //   throw new NotFoundException('No purchases');
      // }

      return purchasesData;
    } catch (error) {
      return error;
    }
  }

  // public async getDetail(input: GetPurchaseDetailInput): Promise<Purchase> {
  //   const existing = await this.getOneByOneFields({
  //     fields: input,
  //     checkIfExists: false,
  //   });

  //   return existing;
  // }

  // public async update(getOneInput: GetOnePurchaseInput, input: UpdatePurchaseInput): Promise<Purchase> {
  //   const { id } = getOneInput;

  //   const existing = await this.getOneByOneFields({
  //     fields: { id },
  //     checkIfExists: true,
  //   });

  //   const preloaded = await this.purchaseRepository.preload({
  //     id: existing.id,
  //     ...input,
  //   });

  //   const saved = await this.purchaseRepository.save(preloaded);

  //   return {
  //     ...existing,
  //     ...saved,
  //   } as Purchase;
  // }

  // public async delete(input: any): Promise<Purchase> {
  //   const { id } = input;

  //   const existing = await this.getOneByOneFields({
  //     fields: { id },
  //     checkIfExists: true,
  //   });

  //   const clone = { ...existing };

  //   await this.purchaseRepository.softRemove(existing);

  //   return clone as Purchase;
  // }

  // finish?

  // public async finish(input: GetOnePurchaseInput): Promise<Purchase> {
  //   const { id } = input;

  //   const existing = await this.getOneByOneFields({
  //     fields: { id },
  //     checkIfExists: true,
  //   });

  //   const preloaded = await this.purchaseRepository.preload({
  //     id: existing.id,
  //     // done: true,
  //   });

  //   const saved = await this.purchaseRepository.save(preloaded);

  //   return {
  //     ...existing,
  //     ...saved,
  //   } as Purchase;
  // }
}
