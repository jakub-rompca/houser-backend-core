import { Test, TestingModule } from '@nestjs/testing';
import { HousingResolver } from './housing.resolver';

describe('HousingResolver', () => {
  let resolver: HousingResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HousingResolver],
    }).compile();

    resolver = module.get<HousingResolver>(HousingResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
