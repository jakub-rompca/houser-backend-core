import { DataSource, Repository } from 'typeorm';
import { ReservationEntity } from './reservation.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ReservationRepository extends Repository<ReservationEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(ReservationEntity, dataSource.createEntityManager());
  }
}
