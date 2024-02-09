import { Injectable } from '@nestjs/common';
import { ReservationRepository } from './db/reservation.repository';
import { ReservationEntity } from './db/reservation.entity';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { ReservationCreated } from './type/reservation-created.type';
import { QueueNamesEnum } from '../common/queue.enum';

@Injectable()
export class ReservationService {
  constructor(
    private readonly reservationRepository: ReservationRepository,
    @InjectQueue(QueueNamesEnum.RESERVATION)
    private readonly queue: Queue,
  ) {}

  async findById(id: number): Promise<ReservationEntity> {
    return await this.reservationRepository.findOneOrFail({
      where: { id },
      relations: { user: true, property: { owner: true } },
    });
  }

  async reserveProperty(
    reservationData: Partial<ReservationEntity>,
    userId: number,
  ): Promise<ReservationEntity> {
    // TODO validate and throw error if user has any other reservations on this date
    const result = await this.reservationRepository.save({
      ...reservationData,
      userId,
    });
    const fullData = await this.findById(result.id);

    await this.pushReservedPropertyMessage({
      propertyName: fullData.property.name,
      propertyOwnerEmail: fullData.property.owner.email,
      reservingUserEmail: fullData.user.email,
      reservingUserName: fullData.user.name,
      startDate: fullData.startDate,
      endDate: fullData.endDate,
    });
    return result;
  }

  private async pushReservedPropertyMessage(data: ReservationCreated) {
    await this.queue.add(data);
  }
}
