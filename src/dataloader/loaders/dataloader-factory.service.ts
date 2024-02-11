import { Injectable } from '@nestjs/common';
import { UserService } from '../../user/user.service';
import { PropertyService } from '../../property/property.service';
import { DataloaderFactoryInterface } from '../interface/dataloader.factory.interface';
import DataLoader from 'dataloader';
import { UserEntity } from '../../user/db/user.entity';
import { convertEntityArrayToEntityMap } from '../dataloader.utils';
import { PropertyEntity } from '../../property/db/property.entity';
import { DataloaderSupportInterface } from '../interface/dataloader-support.interface';
import { BasicEntity } from '../../database/basic.entity';

@Injectable()
export class DataloaderFactory {
  constructor(
    private readonly userService: UserService,
    private readonly propertyService: PropertyService,
  ) {}

  public getLoaders(): DataloaderFactoryInterface {
    return {
      usersLoader: this.createGenericLoader<UserEntity>(this.userService),
      propertiesLoader: this.createGenericLoader<PropertyEntity>(
        this.propertyService,
      ),
    };
  }

  private createGenericLoader<T extends BasicEntity>(
    genericService: DataloaderSupportInterface<T>,
  ) {
    return new DataLoader<number, T>(async (userIds) => {
      const users = await genericService.findByIds([...userIds]);
      const map = convertEntityArrayToEntityMap(users);
      return userIds.map((id) => map[id]);
    });
  }
}
