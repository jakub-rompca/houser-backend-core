import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PropertyEntity } from './property.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(PropertyEntity)
    private readonly propertyRepository: Repository<PropertyEntity>,
  ) {}

  public async findAll(): Promise<PropertyEntity[]> {
    return this.propertyRepository.find();
  }

  public async findById(id: number): Promise<PropertyEntity | null> {
    return this.propertyRepository.findOneBy({ id });
  }

  public async createProperty(
    propertyData: Partial<PropertyEntity>,
  ): Promise<PropertyEntity | null> {
    const savedProperty = await this.propertyRepository.save(propertyData);
    return this.propertyRepository.findOneBy({ id: savedProperty.id });
  }

  public async updateProperty(
    id: number,
    propertyData: Partial<PropertyEntity>,
  ): Promise<PropertyEntity | null> {
    await this.propertyRepository.update(id, propertyData);
    return this.propertyRepository.findOneBy({ id });
  }

  public async removeOneById(id: number): Promise<true> {
    await this.propertyRepository.delete(id);
    return true;
  }
}
