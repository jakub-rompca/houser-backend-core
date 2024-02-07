import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Housing } from './housing.entity';
import { HousingService } from './housing.service';

@Module({
  imports: [TypeOrmModule.forFeature([Housing])],
  providers: [HousingService],
})
export class HousingModule {}
