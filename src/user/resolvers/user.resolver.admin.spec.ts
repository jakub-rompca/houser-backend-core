import { Test, TestingModule } from '@nestjs/testing';
import { UserAdminResolver } from './user.resolver.admin';

describe('UserAdminResolver', () => {
  let service: UserAdminResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserAdminResolver],
    }).compile();

    service = module.get<UserAdminResolver>(UserAdminResolver);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // TODO e2e-esque auth tests
});
