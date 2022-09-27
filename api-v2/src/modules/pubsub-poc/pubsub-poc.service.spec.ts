import { Test, TestingModule } from '@nestjs/testing';
import { PubsubPocService } from './pubsub-poc.service';

describe('PubsubPocService', () => {
  let service: PubsubPocService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PubsubPocService],
    }).compile();

    service = module.get<PubsubPocService>(PubsubPocService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
