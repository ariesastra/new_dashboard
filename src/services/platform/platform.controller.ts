import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { GlobalResponseType } from 'src/helper/types/common.type';
import { PlatformRequest } from './dto/platform.dto';
import { PlatformService } from './platform.service';

@Controller('v1/platform')
export class PlatformController {
  constructor(private readonly platformService: PlatformService) {}

  @Get('/all')
  async getAllPlatform(): Promise<GlobalResponseType> {
    try {
      console.log(`[PlatformController][PlatformService] get all platform`);
      return await this.platformService.getAllPlatform();
    } catch (error) {
      console.error(
        `[PlatformController][PlatformService] error when get all platform`,
        error,
      );
    }
  }

  @Post()
  async createPlatform(
    @Body() platform: PlatformRequest,
  ): Promise<GlobalResponseType> {
    try {
      console.log(
        `[PlatformController][createPlatform] create platform for ${platform.platformName}`,
      );
      return await this.platformService.createPlatform(platform.platformName);
    } catch (error) {
      console.error(
        `[PlatformController][createPlatform] error when create platform for ${platform}`,
        error,
      );
    }
  }

  @Delete()
  async deletePlatfromByName(
    @Query('platform') platformName: string,
  ): Promise<GlobalResponseType> {
    try {
      return await this.platformService.deletePlatformByName(platformName);
    } catch (error) {
      console.error(
        `[PlatformController][deletePlatfromByName] error when create platform for ${platformName}`,
        error,
      );
    }
  }
}
