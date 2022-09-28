import { Test, TestingModule } from '@nestjs/testing';

import { ProductService } from './product.service';

import { ProductController } from './product.controller';

type MockService = Partial<Record<keyof ProductService, jest.Mock>>;
const createMockService = (): MockService => ({});

describe('ProductController', () => {
  let controller: ProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: ProductService,
          useValue: createMockService(),
        },
      ],
    }).compile();

    controller = module.get<ProductController>(ProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
