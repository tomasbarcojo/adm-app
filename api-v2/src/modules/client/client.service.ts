import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './client.entity';
import { CreateClientInput } from './dto/create-client-input.dto';
import { GetAllClientInput } from './dto/get-all-client-input.dto';
import { GetOneClientInput } from './dto/get-one-client-input.dto';
import { UpdateClientInput } from './dto/update-client-input.dto';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}

  //CRUD

  public async create(input: CreateClientInput): Promise<Client> {
    const created = this.clientRepository.create(input);
    const saved = await this.clientRepository.save(created);

    return saved;
  }

  public async getOne(input: GetOneClientInput): Promise<Client | undefined> {
    const { id } = input;
    const existing = await this.clientRepository.findOne({
      where: { id: id },
    });

    return existing;
  }

  public async getAll(input: GetAllClientInput): Promise<Client[]> {
    try {
      const { limit, skip, q } = input;
      const query = this.clientRepository.createQueryBuilder().loadAllRelationIds();
      if (q)
        query
          .where('purcharseName like :q', {
            q: `%${q}%`,
          })
          .andWhere('id = :q', { q: `%${q}%` });

      query.limit(limit || 10).skip(skip);

      const purcharse = await query.getMany();

      if (purcharse.length === 0) {
        throw new NotFoundException('No supplier');
      }

      return purcharse;
    } catch (error) {
      return error;
    }
  }

  public async update(getOneInput: GetOneClientInput, input: UpdateClientInput): Promise<Client> {
    const { id } = getOneInput;

    const existing = await this.clientRepository.findOne({
      where: { id: id },
    });

    const preloaded = await this.clientRepository.preload({
      id: existing.id,
      ...input,
    });

    const saved = await this.clientRepository.save(preloaded);

    return {
      ...existing,
      ...saved,
    } as Client;
  }

  public async delete(input: any): Promise<Client> {
    const { id } = input;

    const existing = await this.clientRepository.findOne({
      where: { id: id },
    });

    const clone = { ...existing };

    await this.clientRepository.softRemove(existing);

    return clone as Client;
  }

  // finish?

  public async finish(input: GetOneClientInput): Promise<Client> {
    const { id } = input;

    const existing = await this.clientRepository.findOne({
      where: { id: id },
    });

    const preloaded = await this.clientRepository.preload({
      id: existing.id,
      // done: true,
    });

    const saved = await this.clientRepository.save(preloaded);

    return {
      ...existing,
      ...saved,
    } as Client;
  }
}
