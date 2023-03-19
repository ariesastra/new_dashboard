import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GlobalResponse } from 'src/helper/common/globalResponse';
import { AdsContainerService } from './adsContainer.service';
import { AdsContainerRequest } from './dto/adsContainer.dto';

@Controller('v1/ads-container')
export class AdsContainerController {
  constructor(private readonly adsContainerService: AdsContainerService) {}

  @Get()
  async getAllAds(): Promise<GlobalResponse> {
    try {
      console.log('[AdsContainerController][getAllAds] start get all ads');
      return this.adsContainerService.getAllAdsContainer();
    } catch (error) {
      console.error(
        `[AdsContainerController][getAllAds] error when get all Ads Container`,
        error,
      );
    }
  }

  @Get('/:id')
  async getAdsContainerById(
    @Param('id') containerId: string,
  ): Promise<GlobalResponse> {
    try {
      console.log(
        `[AdsContainerController][getAdsContainerById] start get ads container by id ${containerId}`,
      );
      return this.adsContainerService.getAdsContainerById(containerId);
    } catch (error) {
      console.error(
        `[AdsContainerController][getAdsContainerById] error when get Ads Container by id ${containerId}`,
        error,
      );
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/create')
  async createAdsContainer(
    @Body() request: AdsContainerRequest,
  ): Promise<GlobalResponse> {
    try {
      console.log(
        `[AdsContainerController][createAdsContainer] create ads container for ${JSON.stringify(
          request,
        )}`,
      );
      return this.adsContainerService.createAdsContainer(request);
    } catch (error) {
      console.error(
        `[AdsContainerController][createAdsContainer] error when create new Ads Container ${JSON.stringify(
          request,
        )}`,
        error,
      );
    }
  }

  @Put('/:containerId/update')
  async updateAdsContainerById(
    @Param('containerId') containerId: string,
    @Body() request: AdsContainerRequest,
  ): Promise<GlobalResponse> {
    try {
      console.log(
        `[AdsContainerController][updateAdsContainerById] create ads container for id ${containerId} with data: ${JSON.stringify(
          request,
        )}`,
      );
      return this.adsContainerService.updateAdsContainerById(
        containerId,
        request,
      );
    } catch (error) {
      console.error(
        `[AdsContainerController][updateAdsContainerById] error when update Ads Container by id ${containerId}`,
        error,
      );
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/:id')
  async deleteAdsContainerById(
    @Param('id') containerId: string,
  ): Promise<GlobalResponse> {
    try {
      console.log(
        `[AdsContainerController][deleteAdsContainerById] create ads container by id ${containerId}`,
      );
      return this.adsContainerService.deleteContainerById(containerId);
    } catch (error) {
      console.error(
        `[AdsContainerController][deleteAdsContainerById] error when update Ads Container by id ${containerId}`,
        error,
      );
    }
  }
}
