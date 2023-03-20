import { Controller, Get, Post } from '@nestjs/common';
import { GoogleMetadataService } from 'src/config/googleapis/googleMetaData.service';

@Controller('v1/ads-data')
export class AdsDataController {
  constructor(private readonly googleMetadata: GoogleMetadataService) {}

  @Get('/google-connection')
  async sheetConnection(): Promise<any> {
    return this.googleMetadata.sheetsConnection();
  }

  @Post('/create')
  async createNewAdsData(): Promise<any> {
    try {
      console.log(
        `[AdsDataController][createNewAdsData] start creating new ads data`,
      );
    } catch (error) {
      console.error(
        `[AdsDataController][createNewAdsData] error when create new ads data`,
        error,
      );
    }
  }
}
