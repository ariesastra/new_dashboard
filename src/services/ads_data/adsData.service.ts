import { Injectable } from '@nestjs/common';
import { GlobalResponse } from 'src/helper/common/globalResponse';

@Injectable()
export class AdsDataService {
  response = new GlobalResponse();
  constructor() {}

  async createNewAdsData(): Promise<any> {
    try {
    } catch (error) {
      console.error(
        `[AdsDataService][createNewAdsData] error when create new ads data`,
        error,
      );
      return this.response.error(error);
    }
  }
}
