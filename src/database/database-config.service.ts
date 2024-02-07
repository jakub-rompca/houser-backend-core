import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { join, resolve } from 'path';
import { config as dotenvConfig } from 'dotenv';

export class DatabaseConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    const basePath = resolve(join(__dirname, '..', '..'));
    dotenvConfig({ path: basePath + '/.env' });

    return {
      type: 'mysql',
      host: `${process.env.DATABASE_HOST}`,
      port: Number(`${process.env.DATABASE_PORT}`),
      username: `${process.env.DATABASE_USERNAME}`,
      password: `${process.env.DATABASE_PASSWORD}`,
      database: `${process.env.DATABASE_NAME}`,
      autoLoadEntities: true,
      // TODO fix config so synchronize is not run
      synchronize: true,
      // entities: [basePath + '/src/**/*.entity.[tj]s'],
      // migrations: [basePath + '/src/database/migrations/*.ts'],
    };
  }
}
