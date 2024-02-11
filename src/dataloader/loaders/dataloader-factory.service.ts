import { Injectable } from '@nestjs/common';
import { UserService } from '../../user/user.service';
import { PropertyService } from '../../property/property.service';
import { DataloaderFactoryInterface } from '../interface/dataloader.factory.interface';
import DataLoader from 'dataloader';
import { UserEntity } from '../../user/db/user.entity';
import { convertEntityArrayToEntityMap } from '../dataloader.utils';
import { PropertyEntity } from '../../property/db/property.entity';

@Injectable()
export class DataloaderFactory {
  constructor(
    private readonly userService: UserService,
    private readonly propertyService: PropertyService,
  ) {}

  public getLoaders(): DataloaderFactoryInterface {
    return {
      usersLoader: this.createUsersLoader(),
      propertiesLoader: this.createPropertiesLoader(),
    };
  }

  private createUsersLoader(): DataLoader<number, UserEntity> {
    return new DataLoader<number, UserEntity>(async (userIds) => {
      const users = await this.userService.findByIds([...userIds]);
      const map = convertEntityArrayToEntityMap(users);
      return userIds.map((id) => map[id]);
    });
  }

  private createPropertiesLoader(): DataLoader<number, PropertyEntity> {
    return new DataLoader<number, PropertyEntity>(async (userIds) => {
      const users = await this.propertyService.findByIds([...userIds]);
      const map = convertEntityArrayToEntityMap(users);
      return userIds.map((id) => map[id]);
    });
  }
}
