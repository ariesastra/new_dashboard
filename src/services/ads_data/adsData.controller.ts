import { Controller, Get, Post } from '@nestjs/common';
import { GoogleMetadataService } from 'src/config/googleapis/googleMetaData.service';

@Controller('v1/ads-data')
export class AdsDataController {
  constructor(private readonly googleMetadata: GoogleMetadataService) {}

  @Get('/sheets-data')
  async sheetConnection(): Promise<any> {
    return this.googleMetadata.sheetsConnection(
      'regular',
      '1uCfIwIbjRp_D9baqVq0p3v6tUm9_yIBoAk9znXhVxAA',
    );
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
