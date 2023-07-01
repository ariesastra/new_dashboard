import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
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

  @Get('/:containerId')
  async adsDataByContainerId(
    @Param('containerId') containerId: string,
  ): Promise<any> {
    try {
      console.log(
        `[AdsDataController][adsDataByContainerId] start get ads data by container id for ${containerId}`,
      );
      const adsContainer: GlobalResponse =
        await this.adsContainerService.getAdsContainerById(containerId);
      if (adsContainer.statusCode !== 200) {
        throw new NotFoundException(`invalid container id for ${containerId}`);
      }

      return this.adsDataService.getDataByContainerId(adsContainer.data);
    } catch (error) {
      console.error(
        `[AdsDataController][adsDataByContainerId] error when get ads data by container id for ${containerId}`,
        error,
      );
      throw error;
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/fetch')
  @HttpCode(HttpStatus.OK)
  async fetchNewAdsData(@Body() adsDataRequest: AdsDataRequest): Promise<any> {
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

      return this.adsDataService.fetchAdsData(adsContainer.data);
    } catch (error) {
      console.error(
        `[AdsDataController][createNewAdsData] error when create new ads data`,
        error,
      );
      throw error;
    }
  }
}
