import { Injectable } from '@nestjs/common';
import { GlobalResponse } from 'src/helper/common/globalResponse';

@Injectable()
export class AdsContainerService {
  response: GlobalResponse = new GlobalResponse();
  constructor() {}

  async getAllAdsContainer(): Promise<GlobalResponse> {
    try {
    } catch (error) {
      console.error(
        `[AdsContainerService][getAllAdsContainer] error when get all campaign`,
        error,
      );
      return this.response.error(error);
    }
  }

  async getAdsContainerById(containerId: string): Promise<GlobalResponse> {
    try {
      console.log(containerId);
    } catch (error) {
      console.error(
        `[AdsContainerService][getAllAdsContainer] error when get all campaign`,
        error,
      );
      return this.response.error(error);
    }
  }
}
