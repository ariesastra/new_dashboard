import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { AdsContainerEntity } from 'src/services/ads_container/database/entity/adsContainer.entity';
import { AdsDataEntity } from 'src/services/ads_data/database/entity/adsData.entity';
import { AuthTokenEntity } from 'src/services/auth/database/entity/AuthToken.entity';
import { CampaignEntity } from 'src/services/campaign/database/entity/campaign.entity';
import { CompanyEntity } from 'src/services/company/database/entity/company.entity';
import { PlatformEntity } from 'src/services/platform/database/entity/platform.entity';
import { UserEntity } from 'src/services/users/database/entity/User.entity';

@Injectable()
export class DbConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const host = this.configService.get<string>('db-config.database.host');
    const port = this.configService.get<number>('db-config.database.port');
    const username = this.configService.get<string>(
      'db-config.database.username',
    );
    const password = this.configService.get<string>(
      'db-config.database.password',
    );
    const database = this.configService.get<string>(
      'db-config.database.database',
    );

    return {
      type: 'postgres',
      host: host,
      port: port,
      username: username,
      password: password,
      database: database,
      schema: 'main',
      entities: [
        UserEntity,
        AuthTokenEntity,
        PlatformEntity,
        CompanyEntity,
        CampaignEntity,
        AdsContainerEntity,
        AdsDataEntity,
      ],
      extra: {
        max: 50,
      },
      logging: ['warn', 'error'],
    };
  }
}
