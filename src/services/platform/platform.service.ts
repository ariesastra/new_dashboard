import { Injectable, NotFoundException } from '@nestjs/common';
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
      await this.platformRespository.save(newPlatfrom).catch((error) => {
        throw error.detail;
      });

      return {
        statusCode: 201,
        message: `platform ${platform} has ben created!`,
      };
    } catch (error) {
      console.error(
        `[PlatformService][createPlatform] error when create platform for ${platform}`,
        error,
      );
      return error.response ? error.response : error;
    }
  }

  async deletePlatformByName(platformName: string): Promise<GlobalResponse> {
    try {
      const platformByName: PlatformEntity =
        await this.platformRespository.findPlatformByName(
          platformName.toUpperCase(),
        );
      if (!platformByName) {
        throw new NotFoundException(`platform ${platformName} not found!`);
      }

      await this.platformRespository
        .delete(platformByName.id)
        .catch((error) => {
          throw error.detail;
        });

      return {
        statusCode: 200,
        message: `platform ${platformName} delete successful`,
      };
    } catch (error) {
      console.error(
        `[PlatformService][deletePlatformByName] error when create platform for ${platformName}`,
        error,
      );
      return error.response ? error.response : error;
    }
  }

  async getAllPlatform(): Promise<GlobalResponse> {
    try {
      const getAll: PlatformEntity[] = await this.platformRespository.find();
      const collectionName: unknown[] = [];
      for (const platform of getAll) {
        if (platform.platformName) {
          collectionName.push({
            id: platform.id,
            name: platform.platformName,
          });
        }
      }

      return {
        statusCode: 200,
        message: 'Success',
        data: collectionName,
      };
    } catch (error) {
      console.error(
        `[PlatformService][getAllPlatform] error when get all platform`,
        error,
      );
      return error.response ? error.response : error;
    }
  }
}
