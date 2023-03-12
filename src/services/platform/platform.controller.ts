import { Body, Controller, Delete, Post, Query } from '@nestjs/common';
import { GlobalResponse } from 'src/helper/types/common.type';
import { PlatformRequest } from './dto/platform.dto';
import { PlatformService } from './platform.service';

@Controller('v1/platform')
export class PlatformController {
  constructor(private readonly platformService: PlatformService) {}

  @Post()
  async createPlatform(
    @Body() platform: PlatformRequest,
  ): Promise<GlobalResponse> {
    try {
      console.log(
        `[PlatformController][createPlatform] create platform for ${platform}`,
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
  ): Promise<any> {
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
