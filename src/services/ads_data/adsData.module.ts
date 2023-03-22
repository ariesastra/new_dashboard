import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoogleMetadataService } from 'src/config/googleapis/googleMetaData.service';
import { AdsContainerModule } from '../ads_container/adsContainer.module';
import { RegularDataAdapter } from './adapter/regularData.adapter';
import { AdsDataController } from './adsData.controller';
import { AdsDataService } from './adsData.service';
import { AdsDataRepository } from './database/adsData.repository';
import { AdsDataEntity } from './database/entity/adsData.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AdsDataEntity]), AdsContainerModule],
  controllers: [AdsDataController],
  providers: [
    AdsDataService,
    AdsDataRepository,
    GoogleMetadataService,
    RegularDataAdapter,
  ],
  exports: [AdsDataService],
})
export class AdsDataModule {}
