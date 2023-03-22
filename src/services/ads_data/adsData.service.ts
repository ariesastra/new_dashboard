import { Injectable } from '@nestjs/common';
import { GoogleMetadataService } from 'src/config/googleapis/googleMetaData.service';
import { GlobalResponse } from 'src/helper/common/globalResponse';
import { AdsContainerEntity } from '../ads_container/database/entity/adsContainer.entity';
import { AdsDataRepository } from './database/adsData.repository';

@Injectable()
export class AdsDataService {
  response = new GlobalResponse();
  constructor(
    private readonly adsDataRepository: AdsDataRepository,
    private readonly googleService: GoogleMetadataService,
  ) {}

  async createNewAdsData(containerEntity: AdsContainerEntity): Promise<any> {
    try {
      const sheetRegularData = await this.googleService.sheetsConnection(
        'regular',
        containerEntity.sheetId,
      );
      console.log(sheetRegularData);
    } catch (error) {
      console.error(
        `[AdsDataService][createNewAdsData] error when create new ads data`,
        error,
      );
      return this.response.error(error);
    }
  }
}
