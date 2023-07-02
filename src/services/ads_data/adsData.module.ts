import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoogleMetadataService } from 'src/config/googleapis/googleMetaData.service';
import { AdsContainerModule } from '../ads_container/adsContainer.module';
import { AccessTokenStrategy } from '../auth/strategies/access-token.strategy';
import { TokenModule } from '../jwt/token.module';
import { RegularDataAdapter } from './adapter/regularData.adapter';
import { YoutubeAdapter } from './adapter/youtubeData.adapter';
import { AdsDataController } from './adsData.controller';
import { AdsDataService } from './adsData.service';
import { AdsDataRepository } from './database/adsData.repository';
import { AdsDataEntity } from './database/entity/adsData.entity';
import { PlatformModule } from '../platform/platform.module';
import { YoutubeAdsModule } from '../youtube/youtube.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AdsDataEntity]),
    AdsContainerModule,
    TokenModule,
    PlatformModule,
    YoutubeAdsModule,
  ],
  controllers: [AdsDataController],
  providers: [
    AdsDataService,
    AdsDataRepository,
    GoogleMetadataService,
    RegularDataAdapter,
    YoutubeAdapter,
    AccessTokenStrategy,
  ],
  exports: [AdsDataService],
})
export class AdsDataModule {}
