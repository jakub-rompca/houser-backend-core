import { BasicEntity } from '../../database/basic.entity';

export interface DataloaderSupportInterface<T extends BasicEntity> {
  findByIds(ids: number[]): Promise<T[]>;
}
