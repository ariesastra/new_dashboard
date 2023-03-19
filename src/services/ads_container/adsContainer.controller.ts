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
import { AdsContainerRequest } from './dto/adsContainer.dto';

@Controller('v1/ads-container')
export class AdsContainerController {
  constructor() {}

  @Get()
  async getAllAds(): Promise<GlobalResponse> {
    try {
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
    } catch (error) {
      console.error(
        `[AdsContainerController][getAdsContainerById] error when get Ads Container by id ${containerId}`,
        error,
      );
    }
  }

  @Post('/create')
  async createAdsContainer(
    @Body() request: AdsContainerRequest,
  ): Promise<GlobalResponse> {
    try {
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
    } catch (error) {
      console.error(
        `[AdsContainerController][deleteAdsContainerById] error when update Ads Container by id ${containerId}`,
        error,
      );
    }
  }
}
