import { Test, TestingModule } from '@nestjs/testing';
import { MeritService } from './merit.service';

describe('MeritService', () => {
  let service: MeritService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MeritService],
    }).compile();

    service = module.get<MeritService>(MeritService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
