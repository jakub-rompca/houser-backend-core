import { Module } from '@nestjs/common';
import { DataloaderFactory } from './loaders/dataloader-factory.service';
import { UserModule } from '../user/user.module';
import { PropertyModule } from '../property/property.module';

@Module({
  providers: [DataloaderFactory],
  exports: [DataloaderFactory],
  imports: [UserModule, PropertyModule],
})
export class DataloaderModule {}
