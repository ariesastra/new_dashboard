import { Module } from '@nestjs/common';
import { AdsDataRepository } from '../ads_data/database/adsData.repository';
import { YoutubeRegularDataAdapter } from './adapter/youtubeData.adapter';
import { YoutubeAdsService } from './youtube.service';

@Module({
  imports: [],
  controllers: [],
  providers: [AdsDataRepository, YoutubeRegularDataAdapter],
  exports: [YoutubeAdsService],
})
export class YoutubeAdsModule {}
