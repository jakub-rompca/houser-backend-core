import { Test, TestingModule } from '@nestjs/testing';
import { ReservationService } from './reservation.service';
import { ReservationEntity } from './db/reservation.entity';
import { faker } from '@faker-js/faker';
import { UserEntity } from '../user/db/user.entity';
import { ReservationRepository } from './db/reservation.repository';
import { getQueueToken } from '@nestjs/bull';
import { QueueNamesEnum } from '../common/queue.enum';

// TODO adjust tests so the ids and relations are as expected
describe('ReservationService', () => {
  let service: ReservationService;

  // TODO test utils for generating sample entities
  const prepareUserEntitySample = (userId?: number): UserEntity => {
    return {
      id: userId ? userId : faker.number.int(),
      reservations: [],
      name: faker.person.fullName(),
      email: faker.internet.email(),
      properties: [],
      isActive: true,
      password: faker.internet.password(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.past(),
    };
  };

  const prepareReservationEntitySample = (): ReservationEntity => {
    const userId = faker.number.int();
    const propertyId = faker.number.int();
    return {
      id: faker.number.int(),
      startDate: faker.date.past(),
      endDate: faker.date.future(),
      userId,
      isAccepted: true,
      user: prepareUserEntitySample(userId),
      propertyId,
      property: {
        id: propertyId,
        name: faker.lorem.sentence(),
        ownerId: faker.number.int(),
        owner: prepareUserEntitySample(),
        reservations: [],
        isAcceptRequired: false,
        isPaymentRequired: false,
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
      },
      updatedAt: faker.date.past(),
      createdAt: faker.date.future(),
    };
  };

  const mockBullQueue = {
    add: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservationService,
        {
          provide: getQueueToken(QueueNamesEnum.RESERVATION),
          useValue: mockBullQueue,
        },
      ],
    })
      .useMocker((token) => {
        if (token === ReservationRepository) {
          return {
            findOneOrFail: jest
              .fn()
              .mockResolvedValue(prepareReservationEntitySample()),
            save: jest.fn().mockResolvedValue(prepareReservationEntitySample()),
          };
        }
      })
      .compile();

    service = module.get<ReservationService>(ReservationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should push message to queue on reserveProperty', async () => {
    // Given
    const reservationData = prepareReservationEntitySample();
    // TODO userId without correlation to reservationData
    const userId = faker.number.int();

    // When
    const queueAddMock = jest.spyOn(mockBullQueue, 'add').mockResolvedValue({});
    await service.reserveProperty(reservationData, userId);

    // Then
    expect(queueAddMock).toHaveBeenCalledTimes(1);
  });
});
