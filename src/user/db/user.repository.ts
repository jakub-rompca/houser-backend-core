import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }

  public async getByIds(ids: number[]): Promise<UserEntity[]> {
    return this.createQueryBuilder('u').where('id IN(:ids)', { ids }).getMany();
  }
}
