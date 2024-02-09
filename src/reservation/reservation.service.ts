import { Injectable } from '@nestjs/common';
import { ReservationRepository } from './db/reservation.repository';
import { ReservationEntity } from './db/reservation.entity';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

@Injectable()
export class ReservationService {
  constructor(
    private readonly reservationRepository: ReservationRepository,
    @InjectQueue('reservation')
    private readonly queue: Queue,
  ) {}

  async findById(id: number): Promise<ReservationEntity | null> {
    return await this.reservationRepository.findOneBy({ id });
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
    // TODO proper queue message with needed data
    await this.queue.add({ test: 'message' });
    return result;
  }
}
