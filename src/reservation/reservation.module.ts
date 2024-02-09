import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationEntity } from './db/reservation.entity';
import { ReservationRepository } from './db/reservation.repository';
import { ReservationResolver } from './reservation.resolver';
import { BullModule } from '@nestjs/bull';
import { QueueNamesEnum } from '../common/queue.enum';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReservationEntity]),
    BullModule.registerQueue({ name: QueueNamesEnum.RESERVATION }),
  ],
  providers: [ReservationService, ReservationResolver, ReservationRepository],
})
export class ReservationModule {}
