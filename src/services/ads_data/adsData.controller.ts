import { Body, Controller, Get, NotFoundException, Post } from '@nestjs/common';
import { GoogleMetadataService } from 'src/config/googleapis/googleMetaData.service';
import { GlobalResponse } from 'src/helper/common/globalResponse';
import { AdsContainerService } from '../ads_container/adsContainer.service';
import { AdsDataService } from './adsData.service';
import { AdsDataRequest } from './dto/adsData.dto';

@Controller('v1/ads-data')
export class AdsDataController {
  constructor(
    private readonly googleMetadata: GoogleMetadataService,
    private readonly adsContainerService: AdsContainerService,
    private readonly adsDataService: AdsDataService,
  ) {}

  @Get('/sheets-data')
  async sheetConnection(): Promise<any> {
    return this.googleMetadata.sheetsConnection(
      'regular',
      '1uCfIwIbjRp_D9baqVq0p3v6tUm9_yIBoAk9znXhVxAA',
    );
  }

  @Post('/create')
  async createNewAdsData(@Body() adsDataRequest: AdsDataRequest): Promise<any> {
    try {
      console.log(
        `[AdsDataController][createNewAdsData] start creating new ads data`,
      );

      const adsContainer: GlobalResponse =
        await this.adsContainerService.getAdsContainerById(
          adsDataRequest.containerId,
        );
      if (adsContainer.statusCode === 404)
        throw new NotFoundException(
          `invalid container id for ${adsDataRequest.containerId}`,
        );

      return this.adsDataService.createNewAdsData(adsContainer.data);
    } catch (error) {
      console.error(
        `[AdsDataController][createNewAdsData] error when create new ads data`,
        error,
      );
      throw error;
    }
  }
}
