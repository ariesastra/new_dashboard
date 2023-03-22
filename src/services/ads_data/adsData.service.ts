import { Injectable } from '@nestjs/common';
import { GoogleMetadataService } from 'src/config/googleapis/googleMetaData.service';
import { GlobalResponse } from 'src/helper/common/globalResponse';
import { AdsContainerEntity } from '../ads_container/database/entity/adsContainer.entity';
import { RegularDataAdapter } from './adapter/regularData.adapter';
import { AdsDataRepository } from './database/adsData.repository';
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
          await this.regularRangeAssignment(sheetData);
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

  async regularRangeAssignment(regularSheetData: any[]): Promise<any> {
    try {
      const [first, ...restOfRegularData] = regularSheetData;
      for (const regularData of restOfRegularData) {
        const regularDataAdapter =
          this.regularDataAdapter.sheetToInterface(regularData);
        console.log(regularDataAdapter);
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
