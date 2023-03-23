import { Injectable } from '@nestjs/common';
import { GoogleMetadataService } from 'src/config/googleapis/googleMetaData.service';
import { GlobalResponse } from 'src/helper/common/globalResponse';
import { AdsContainerEntity } from '../ads_container/database/entity/adsContainer.entity';
import { RegularDataAdapter } from './adapter/regularData.adapter';
import { AdsDataRepository } from './database/adsData.repository';
import { AdsDataEntity } from './database/entity/adsData.entity';
import { sheetsRange } from './dto/adsData.dto';

@Injectable()
export class AdsDataService {
  response = new GlobalResponse();
  constructor(
    private readonly adsDataRepository: AdsDataRepository,
    private readonly googleService: GoogleMetadataService,
    private readonly regularDataAdapter: RegularDataAdapter,
  ) {}

  async createNewAdsData(containerEntity: AdsContainerEntity): Promise<any> {
    try {
      for (const range of sheetsRange) {
        const sheetData = await this.googleService.sheetsConnection(
          range,
          containerEntity.sheetId,
        );

        if (range === 'regular') {
          await this.regularRangeAssignment(sheetData, containerEntity.id);
        }
      }
    } catch (error) {
      console.error(
        `[AdsDataService][createNewAdsData] error when create new ads data`,
        error,
      );
      throw error;
    }
  }

  async regularRangeAssignment(
    regularSheetData: any[],
    containerId: string,
  ): Promise<any> {
    try {
      const [first, ...restOfRegularData] = regularSheetData;
      for (const regularData of restOfRegularData) {
        const [globalAdsData, regularAdsData, youtubeAdsData] =
          this.regularDataAdapter.youtubeInterface(regularData);

        const regularAdsDataEntity: AdsDataEntity = new AdsDataEntity();
        regularAdsDataEntity.id = crypto.randomUUID();
        regularAdsDataEntity.date = globalAdsData.date;
        regularAdsDataEntity.containerId = containerId;
        regularAdsDataEntity.adsData = {
          regularAdsData,
          youtubeAdsData,
        };
        console.log(regularAdsDataEntity);
        await this.adsDataRepository.save(regularAdsDataEntity);
      }
    } catch (error) {
      console.error(
        `[AdsDataService][createNewAdsData] error when create new ads data`,
        error,
      );
      throw error;
    }
  }
}
