import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GlobalResponseType } from 'src/helper/types/common.type';
import { PlatformRequest } from './dto/platform.dto';
import { PlatformService } from './platform.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('v1/platform')
export class PlatformController {
  constructor(private readonly platformService: PlatformService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('/all')
  @HttpCode(HttpStatus.OK)
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

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @HttpCode(HttpStatus.CREATED)
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

  @UseGuards(AuthGuard('jwt'))
  @Delete('/:platformId')
  @HttpCode(HttpStatus.OK)
  async deletePlatfromById(
    @Param('platformId') platformId: string,
  ): Promise<GlobalResponseType> {
    try {
      return await this.platformService.deletePlatformById(platformId);
    } catch (error) {
      console.error(
        `[PlatformController][deletePlatfromByName] error when delte platform id for ${platformId}`,
        error,
      );
    }
  }
}
