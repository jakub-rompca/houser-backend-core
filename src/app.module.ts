import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { DataSource } from 'typeorm';
import { DatabaseModule } from './database/database.module';
import { DatabaseConfigService } from './database/database-config.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ReservationModule } from './reservation/reservation.module';
import { PropertyModule } from './property/property.module';
import { DataloaderModule } from './dataloader/dataloader.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfigService,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // TODO playground to false if prod
      playground: true,
      // TODO schema to file on later stage
      // autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      autoSchemaFile: true,
    }),
    UserModule,
    PropertyModule,
    DatabaseModule,
    ReservationModule,
    DataloaderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private readonly dataSource: DataSource) {}
}
