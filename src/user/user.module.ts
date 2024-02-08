import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UserResolver } from './resolvers/user.resolver';
import { UserAdminResolver } from './resolvers/user.resolver.admin';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserService, UserResolver, UserAdminResolver],
})
export class UserModule {}
