import { Test, TestingModule } from '@nestjs/testing';
import { ReservationResolver } from './reservation.resolver';

describe('ReservationResolver', () => {
  let service: ReservationResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReservationResolver],
    }).compile();

    service = module.get<ReservationResolver>(ReservationResolver);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // TODO e2e-esque tests with actual test database
});
