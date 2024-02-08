import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './db/user.entity';
import { UserResolver } from './resolvers/user.resolver';
import { UserAdminResolver } from './resolvers/user.resolver.admin';
import { UserService } from './user.service';
import { UserRepository } from './db/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserService, UserResolver, UserAdminResolver, UserRepository],
  exports: [UserService],
})
export class UserModule {}
