import { Injectable } from '@nestjs/common';
import { ReservationRepository } from './db/reservation.repository';
import { ReservationEntity } from './db/reservation.entity';

@Injectable()
export class ReservationService {
  constructor(private readonly reservationRepository: ReservationRepository) {}

  async findById(id: number): Promise<ReservationEntity | null> {
    return await this.reservationRepository.findOneBy({ id });
  }
}
