import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { AuthToken } from 'src/services/users/database/entity/AuthToken.entity';
import { Users } from 'src/services/users/database/entity/User.entity';

@Injectable()
export class DbConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get<string>('db-config.database.host'),
      port: this.configService.get<number>('db-config.database.port'),
      username: this.configService.get<string>('db-config.database.username'),
      password: this.configService.get<string>('db-config.database.password'),
      database: this.configService.get<string>('db-config.database.database'),
      schema: this.configService.get<string>('db-config.database.schema'),
      entities: [Users, AuthToken],
      extra: {
        max: 50,
      },
      logging: ['warn', 'error'],
    };
  }
}
