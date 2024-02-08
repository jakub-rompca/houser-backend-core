import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropertyEntity } from './property.entity';
import { PropertyService } from './property.service';
import { PropertyResolver } from './property.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([PropertyEntity])],
  providers: [PropertyService, PropertyResolver],
})
export class PropertyModule {}
