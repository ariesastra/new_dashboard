import { Injectable } from '@nestjs/common';
import { GlobalResponse } from 'src/helper/types/common.type';
import { PlatformEntity } from './database/entity/platform.entity';
import { PlatformRepository } from './database/platform.repository';

@Injectable()
export class PlatformService {
  constructor(private readonly platformRespository: PlatformRepository) {}

  async createPlatform(platform: string): Promise<GlobalResponse> {
    try {
      const newPlatfrom: PlatformEntity = new PlatformEntity();
      newPlatfrom.id = crypto.randomUUID();
      newPlatfrom.platformName = platform;
      await this.platformRespository.save(newPlatfrom);

      return {
        statusCode: 201,
        message: `platform ${platform} has ben created!`,
      };
    } catch (error) {
      console.error(
        `[PlatformService][createPlatform] error when create platform for ${platform}`,
        error,
      );
      return error.response;
    }
  }

  async deletePlatformByName(platformName: string): Promise<any> {
    try {
      const platformByName: PlatformEntity =
        await this.platformRespository.findPlatformByName(
          platformName.toUpperCase(),
        );
      console.log(platformByName);
    } catch (error) {
      console.error(
        `[PlatformService][deletePlatformByName] error when create platform for ${platformName}`,
        error,
      );
    }
  }
}
