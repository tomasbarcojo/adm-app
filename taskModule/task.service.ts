import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseService } from '../../base/base.service';

import appConfig from '../../config/app.config';

import { Task } from './task.entity';

import { CreateTaskInput } from './dto/create-task-input.dto';
import { GetOneTaskInput } from './dto/get-one-task-input.dto';
import { GetAllTasksInput } from './dto/get-all-tasks-input.dto';
import { UpdateTaskInput } from './dto/update-task-input.dto';

@Injectable()
export class TaskService extends BaseService<Task> {
  constructor(
    @Inject(appConfig.KEY)
    private readonly appConfiguration: ConfigType<typeof appConfig>,
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {
    super(taskRepository);
  }

  // CRUD

  public async create(input: CreateTaskInput): Promise<Task> {
    const created = this.taskRepository.create({
      ...input,
    });

    const saved = await this.taskRepository.save(created);

    return saved;
  }

  public async getOne(input: GetOneTaskInput): Promise<Task | undefined> {
    const { uid } = input;

    const existing = await this.getOneByOneFields({
      fields: { uid },
      checkIfExists: false,
    });

    return existing;
  }

  public async getAll(input: GetAllTasksInput): Promise<Task[]> {
    const { limit, skip, q } = input;

    const query = this.taskRepository
      .createQueryBuilder('task')
      .loadAllRelationIds();

    if (q)
      query.where('task.description like :q', {
        q: `%${q}%`,
      });

    query.limit(limit || 10).skip(skip);

    const items = await query.getMany();

    return items;
  }

  public async update(
    getOneInput: GetOneTaskInput,
    input: UpdateTaskInput,
  ): Promise<Task> {
    const { uid } = getOneInput;

    const existing = await this.getOneByOneFields({
      fields: { uid },
      checkIfExists: true,
    });

    const preloaded = await this.taskRepository.preload({
      id: existing.id,
      ...input,
    });

    const saved = await this.taskRepository.save(preloaded);

    return {
      ...existing,
      ...saved,
    } as Task;
  }

  public async delete(input: any): Promise<Task> {
    const { uid } = input;

    const existing = await this.getOneByOneFields({
      fields: { uid },
      checkIfExists: true,
    });

    const clone = { ...existing };

    await this.taskRepository.softRemove(existing);

    return clone as Task;
  }

  // CRUD

  public async finish(input: GetOneTaskInput): Promise<Task> {
    const { uid } = input;

    const existing = await this.getOneByOneFields({
      fields: { uid },
      checkIfExists: true,
    });

    const preloaded = await this.taskRepository.preload({
      id: existing.id,
      done: true,
    });

    const saved = await this.taskRepository.save(preloaded);

    return {
      ...existing,
      ...saved,
    } as Task;
  }
}
