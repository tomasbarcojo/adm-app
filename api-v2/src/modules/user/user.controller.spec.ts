import { Test, TestingModule } from '@nestjs/testing';

import { CategoryService } from './user.service';

import { CategoryController } from './user.controller';

type MockService = Partial<Record<keyof CategoryService, jest.Mock>>;
const createMockService = (): MockService => ({});

describe('CategoryController', () => {
  let controller: CategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [
        {
          provide: CategoryService,
          useValue: createMockService(),
        },
      ],
    }).compile();

    controller = module.get<CategoryController>(CategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
