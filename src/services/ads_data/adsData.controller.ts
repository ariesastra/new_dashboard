import { Controller, Post } from '@nestjs/common';

@Controller('v1/ads-data')
export class AdsDataController {
  constructor() {}

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
