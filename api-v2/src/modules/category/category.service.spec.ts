import * as path from 'path';

import { Test, TestingModule } from '@nestjs/testing';
import { HttpException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import appConfig from '../../config/app.config';
import appConfigSchema from '../../config/app.schema';

import { Category } from './category.entity';

import { CategoryService } from './category.service';

import { CreateCategoryInput } from './dto/create-category-input.dto';
import { GetOneCategoryInput } from './dto/get-one-category-input.dto';
import { GetAllCategoriesInput } from './dto/get-all-categories-input.dto';
import { UpdateCategoryInput } from './dto/update-category-input.dto';

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

describe('CategoryService', () => {
  let service: CategoryService;
  let categoryRepository: MockRepository;

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
        CategoryService,
        {
          provide: getRepositoryToken(Category),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    categoryRepository = module.get<MockRepository>(getRepositoryToken(Category));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    describe('when create a category', () => {
      it('should return the category object', async () => {
        const expectedCategory = {};

        categoryRepository.create.mockReturnValue(expectedCategory);
        categoryRepository.save.mockResolvedValue(expectedCategory);

        const category = await service.create({} as CreateCategoryInput);

        expect(category).toEqual(expectedCategory);
      });
    });

    describe('when a category already exists', () => {
      it('should throw the "HttpException"', async () => {
        const CreateCategoryInput = {} as CreateCategoryInput;

        categoryRepository.findOne.mockReturnValue({});

        try {
          await service.create(CreateCategoryInput);
        } catch (error) {
          expect(error).toBeInstanceOf(HttpException);
        }
      });
    });
  });

  describe('getOne', () => {
    describe('when get a category', () => {
      it('should return the category object', async () => {
        const expectedCategory = {};

        categoryRepository.findOne.mockReturnValue(expectedCategory);

        const category = await service.getOne({} as GetOneCategoryInput);

        expect(category).toEqual(expectedCategory);
      });
    });

    describe('when a category does not exist', () => {
      it('should return an undefined object', async () => {
        categoryRepository.findOne.mockReturnValue(undefined);

        const category = await service.getOne({} as GetOneCategoryInput);

        expect(category).toBeUndefined();
      });
    });
  });

  describe('getAll', () => {
    describe('when get all categorys', () => {
      it('should return the categorys array', async () => {
        const expectedCategorys = [{}];

        categoryRepository.createQueryBuilder.mockReturnValue({
          loadAllRelationIds: jest.fn().mockReturnThis(),
          where: jest.fn().mockReturnThis(),
          limit: jest.fn().mockReturnThis(),
          skip: jest.fn().mockReturnThis(),
          getMany: jest.fn().mockReturnValue(expectedCategorys),
        });

        const categorys = await service.getAll({} as GetAllCategoriesInput);

        expect(categorys).toEqual(expectedCategorys);
      });
    });

    describe('when no categorys exist', () => {
      it('should return an empty array', async () => {
        categoryRepository.createQueryBuilder.mockReturnValue({
          loadAllRelationIds: jest.fn().mockReturnThis(),
          where: jest.fn().mockReturnThis(),
          limit: jest.fn().mockReturnThis(),
          skip: jest.fn().mockReturnThis(),
          getMany: jest.fn().mockReturnValue([]),
        });

        const categorys = await service.getAll({} as GetAllCategoriesInput);

        expect(categorys).toEqual([]);
      });
    });
  });

  describe('update', () => {
    describe('when update a category', () => {
      it('should return the updated category object', async () => {
        const expectedCategory = {};

        categoryRepository.findOne.mockReturnValue(expectedCategory);
        categoryRepository.save.mockReturnValue(expectedCategory);

        const category = await service.update({} as GetOneCategoryInput, {} as UpdateCategoryInput);

        expect(category).toEqual(expectedCategory);
      });
    });
  });

  describe('delete', () => {
    describe('when delete a category', () => {
      it('should return the deleted category object', async () => {
        const expectedCategory = {};

        categoryRepository.findOne.mockReturnValue(expectedCategory);
        categoryRepository.softRemove.mockReturnValue(expectedCategory);

        const category = await service.delete({} as GetOneCategoryInput);

        expect(category).toEqual(expectedCategory);
      });
    });
  });
});
