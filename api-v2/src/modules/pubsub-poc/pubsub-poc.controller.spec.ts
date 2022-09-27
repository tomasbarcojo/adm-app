import { Test, TestingModule } from '@nestjs/testing';
import { PubsubPocController } from './pubsub-poc.controller';

describe('PubsubPocController', () => {
  let controller: PubsubPocController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PubsubPocController],
    }).compile();

    controller = module.get<PubsubPocController>(PubsubPocController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
