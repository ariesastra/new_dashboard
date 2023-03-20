import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoogleMetadataService } from 'src/config/googleapis/googleMetaData.service';
import { AdsDataController } from './adsData.controller';
import { AdsDataService } from './adsData.service';
import { AdsDataRepository } from './database/adsData.repository';
import { AdsDataEntity } from './database/entity/adsData.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AdsDataEntity])],
  controllers: [AdsDataController],
  providers: [AdsDataService, AdsDataRepository, GoogleMetadataService],
  exports: [AdsDataService],
})
export class AdsDataModule {}
