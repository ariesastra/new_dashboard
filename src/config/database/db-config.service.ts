import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class DbConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get<string>('db-config.platformDatabase.host'),
      port: this.configService.get<number>('db-config.platformDatabase.port'),
      username: this.configService.get<string>(
        'db-config.platformDatabase.username',
      ),
      password: this.configService.get<string>(
        'db-config.platformDatabase.password',
      ),
      database: this.configService.get<string>(
        'db-config.platformDatabase.database',
      ),
      schema: this.configService.get<string>(
        'db-config.platformDatabase.schema',
      ),
      entities: [],
      extra: {
        max: 50,
      },
      logging: ['warn', 'error'],
    };
  }
}
