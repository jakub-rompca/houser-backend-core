import { DataSource, Repository } from 'typeorm';
import { PropertyEntity } from './property.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PropertyRepository extends Repository<PropertyEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(PropertyEntity, dataSource.createEntityManager());
  }

  public async getByIds(ids: number[]): Promise<PropertyEntity[]> {
    return this.createQueryBuilder('p')
      .where('p.id IN(:ids)', { ids })
      .getMany();
  }
}
