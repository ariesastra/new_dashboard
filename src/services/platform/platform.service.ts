import { Injectable, NotFoundException } from '@nestjs/common';
import { GlobalResponse } from 'src/helper/common/globalResponse';
import { GlobalResponseType } from 'src/helper/types/common.type';
import { PlatformEntity } from './database/entity/platform.entity';
import { PlatformRepository } from './database/platform.repository';
import { Platform } from './dto/platform.dto';
import { PlatformAdapter } from './adapter/platform.adapter';

@Injectable()
export class PlatformService {
  response = new GlobalResponse();
  constructor(
    private readonly platformRespository: PlatformRepository,
    private readonly platformAdapter: PlatformAdapter,
  ) {}

  async createPlatform(platform: string): Promise<GlobalResponseType> {
    try {
      const newPlatfrom: PlatformEntity = new PlatformEntity();
      newPlatfrom.id = crypto.randomUUID();
      newPlatfrom.platformName = platform;
      await this.platformRespository.save(newPlatfrom).catch((error) => {
        throw error.detail;
      });

      return this.response.successResponse(
        201,
        `platform ${platform} has ben created!`,
        newPlatfrom,
      );
    } catch (error) {
      console.error(
        `[PlatformService][createPlatform] error when create platform for ${platform}`,
        error,
      );
      return this.response.error(error);
    }
  }

  async deletePlatformById(platformId: string): Promise<GlobalResponseType> {
    try {
      const platformById: PlatformEntity =
        await this.platformRespository.findOneBy({ id: platformId });
      if (!platformById) {
        throw new NotFoundException(`platform ${platformId} not found!`);
      }

      await this.platformRespository.delete(platformById.id).catch((error) => {
        throw error.detail;
      });

      return this.response.successResponse(
        200,
        `platform ${platformById.platformName} delete successful`,
        platformById,
      );
    } catch (error) {
      console.error(
        `[PlatformService][deletePlatformById] error when delete platform id for ${platformId}`,
        error,
      );
      return this.response.error(error);
    }
  }

  async getAllPlatform(): Promise<GlobalResponseType> {
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

      return this.response.successResponse(200, 'success', collectionName);
    } catch (error) {
      console.error(
        `[PlatformService][getAllPlatform] error when get all platform`,
        error,
      );
      return this.response.error(error);
    }
  }

  async getPlatformById(platformId: string): Promise<Platform> {
    try {
      const platform: PlatformEntity = await this.platformRespository.findOneBy(
        {
          id: platformId,
        },
      );
      const platformAdapter: Platform =
        this.platformAdapter.entityToReponse(platform);

      return platformAdapter;
    } catch (error) {
      console.error(
        `[PlatformService][getPlatformById] error when get platform id ${platformId}`,
        error,
      );
      return this.response.error(error);
    }
  }
}
