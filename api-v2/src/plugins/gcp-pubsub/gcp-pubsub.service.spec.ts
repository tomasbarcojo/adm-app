import { Test, TestingModule } from '@nestjs/testing';
import { GcpPubsubService } from './gcp-pubsub.service';

describe('GcpPubsubService', () => {
  let service: GcpPubsubService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GcpPubsubService],
    }).compile();

    service = module.get<GcpPubsubService>(GcpPubsubService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
