import { Module } from '@nestjs/common';
import { AdsDataRepository } from '../ads_data/database/adsData.repository';
import { YoutubeRegularDataAdapter } from './adapter/youtubeData.adapter';
import { YoutubeAdsService } from './youtube.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdsDataEntity } from '../ads_data/database/entity/adsData.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AdsDataEntity])],
  controllers: [],
  providers: [AdsDataRepository, YoutubeRegularDataAdapter, YoutubeAdsService],
  exports: [YoutubeAdsService],
})
export class YoutubeAdsModule {}
