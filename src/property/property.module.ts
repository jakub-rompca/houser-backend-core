import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropertyEntity } from './db/property.entity';
import { PropertyService } from './property.service';
import { PropertyResolver } from './property.resolver';
import { PropertyRepository } from './db/property.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PropertyEntity])],
  providers: [PropertyService, PropertyResolver, PropertyRepository],
  exports: [PropertyService],
})
export class PropertyModule {}
