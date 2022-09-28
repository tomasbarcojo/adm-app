import { Test, TestingModule } from '@nestjs/testing';

import { TaskService } from './task.service';

import { TaskController } from './task.controller';

type MockService = Partial<Record<keyof TaskService, jest.Mock>>;
const createMockService = (): MockService => ({});

describe('TaskController', () => {
  let controller: TaskController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        {
          provide: TaskService,
          useValue: createMockService(),
        },
      ],
    }).compile();

    controller = module.get<TaskController>(TaskController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
