import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  public async findById(id: number): Promise<UserEntity | null> {
    return this.userRepository.findOneBy({ id });
  }

  public async findByName(name: string): Promise<UserEntity | null> {
    return this.userRepository.findOneBy({ name });
  }

  // TODO send info to queue?
  public async registerUser(
    userData: Partial<UserEntity>,
  ): Promise<UserEntity | null> {
    const savedUser = await this.userRepository.save(userData);
    return this.userRepository.findOneBy({ id: savedUser.id });
  }

  // TODO restrict in some way
  public async updateUser(
    id: number,
    userData: Partial<UserEntity>,
  ): Promise<UserEntity | null> {
    await this.userRepository.update(id, userData);
    return this.userRepository.findOneBy({ id });
  }

  // TODO deactivate and anonymize instead of removing
  public async removeOneById(id: number): Promise<true> {
    await this.userRepository.delete(id);
    return true;
  }
}
