import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Housing } from './housing.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HousingService {
  constructor(
    @InjectRepository(Housing)
    private housingRepository: Repository<Housing>,
  ) {}

  public async findAll(): Promise<Housing[]> {
    return this.housingRepository.find();
  }

  public async findById(id: number): Promise<Housing | null> {
    return this.housingRepository.findOneBy({ id });
  }

  public async removeOneById(id: number): Promise<void> {
    await this.housingRepository.delete(id);
  }
}
