import { Test, TestingModule } from '@nestjs/testing';

import { Task } from '../modules/category/category.entity';

import { BaseService } from './base.service';

describe('BaseService', () => {
  let service: BaseService<Task>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BaseService],
    }).compile();

    service = module.get<BaseService<Task>>(BaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
