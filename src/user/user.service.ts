import { Injectable } from '@nestjs/common';
import { UserEntity } from './db/user.entity';
import { UserRepository } from './db/user.repository';
import { DataloaderSupportInterface } from '../dataloader/interface/dataloader-support.interface';

@Injectable()
export class UserService implements DataloaderSupportInterface<UserEntity> {
  constructor(private readonly userRepository: UserRepository) {}

  public async findAll(): Promise<UserEntity[]> {
    return this.userRepository.find({
      relations: { properties: true, reservations: true },
    });
  }

  public async findById(id: number): Promise<UserEntity | null> {
    return this.userRepository.findOneBy({ id });
  }

  public async findByIds(ids: number[]): Promise<UserEntity[]> {
    return this.userRepository.getByIds(ids);
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
