import * as path from 'path';

import { Test, TestingModule } from '@nestjs/testing';
import { HttpException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import appConfig from '../../config/app.config';
import appConfigSchema from '../../config/app.schema';

import { Product } from './product.entity';

import { ProductService } from './product.service';

import { CreateProductInput } from './dto/create-product-input.dto';
import { GetOneTaskInput } from './dto/get-one-product-input.dto';
import { GetAllTasksInput } from './dto/get-all-products-input.dto';
import { UpdateTaskInput } from './dto/update-product-input.dto';

const envPath = path.resolve(__dirname, '../../../.env.test');

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

const createMockRepository = <T = any>(): MockRepository<T> => ({
  create: jest.fn(),
  findOne: jest.fn(),
  save: jest.fn(),
  createQueryBuilder: jest.fn(),
  preload: jest.fn(),
  softRemove: jest.fn(),
});

describe('ProductService', () => {
  let service: ProductService;
  let taskRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [appConfig],
          envFilePath: envPath,
          validationSchema: appConfigSchema,
        }),
      ],
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(Product),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    taskRepository = module.get<MockRepository>(getRepositoryToken(Product));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    describe('when create a task', () => {
      it('should return the task object', async () => {
        const expectedTask = {};

        taskRepository.create.mockReturnValue(expectedTask);
        taskRepository.save.mockResolvedValue(expectedTask);

        const task = await service.create({} as CreateProductInput);

        expect(task).toEqual(expectedTask);
      });
    });

    describe('when a task already exists', () => {
      it('should throw the "HttpException"', async () => {
        const createTaskInput = {} as CreateProductInput;

        taskRepository.findOne.mockReturnValue({});

        try {
          await service.create(createTaskInput);
        } catch (error) {
          expect(error).toBeInstanceOf(HttpException);
        }
      });
    });
  });

  describe('getOne', () => {
    describe('when get a task', () => {
      it('should return the task object', async () => {
        const expectedTask = {};

        taskRepository.findOne.mockReturnValue(expectedTask);

        const task = await service.getOne({} as GetOneTaskInput);

        expect(task).toEqual(expectedTask);
      });
    });

    describe('when a task does not exist', () => {
      it('should return an undefined object', async () => {
        taskRepository.findOne.mockReturnValue(undefined);

        const task = await service.getOne({} as GetOneTaskInput);

        expect(task).toBeUndefined();
      });
    });
  });

  describe('getAll', () => {
    describe('when get all tasks', () => {
      it('should return the tasks array', async () => {
        const expectedTasks = [{}];

        taskRepository.createQueryBuilder.mockReturnValue({
          loadAllRelationIds: jest.fn().mockReturnThis(),
          where: jest.fn().mockReturnThis(),
          limit: jest.fn().mockReturnThis(),
          skip: jest.fn().mockReturnThis(),
          getMany: jest.fn().mockReturnValue(expectedTasks),
        });

        const tasks = await service.getAll({} as GetAllTasksInput);

        expect(tasks).toEqual(expectedTasks);
      });
    });

    describe('when no tasks exist', () => {
      it('should return an empty array', async () => {
        taskRepository.createQueryBuilder.mockReturnValue({
          loadAllRelationIds: jest.fn().mockReturnThis(),
          where: jest.fn().mockReturnThis(),
          limit: jest.fn().mockReturnThis(),
          skip: jest.fn().mockReturnThis(),
          getMany: jest.fn().mockReturnValue([]),
        });

        const tasks = await service.getAll({} as GetAllTasksInput);

        expect(tasks).toEqual([]);
      });
    });
  });

  describe('update', () => {
    describe('when update a task', () => {
      it('should return the updated task object', async () => {
        const expectedTask = {};

        taskRepository.findOne.mockReturnValue(expectedTask);
        taskRepository.save.mockReturnValue(expectedTask);

        const task = await service.update(
          {} as GetOneTaskInput,
          {} as UpdateTaskInput,
        );

        expect(task).toEqual(expectedTask);
      });
    });
  });

  describe('delete', () => {
    describe('when delete a task', () => {
      it('should return the deleted task object', async () => {
        const expectedTask = {};

        taskRepository.findOne.mockReturnValue(expectedTask);
        taskRepository.softRemove.mockReturnValue(expectedTask);

        const task = await service.delete({} as GetOneTaskInput);

        expect(task).toEqual(expectedTask);
      });
    });
  });
});
