import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { GlobalResponse } from 'src/helper/common/globalResponse';
import { AdsContainerEntityAdapter } from './adapter/adsContainer.adapter';
import { AdsContainerRepository } from './database/adsContainer.repository';
import { AdsContainerEntity } from './database/entity/adsContainer.entity';
import { AdsContainerRequest } from './dto/adsContainer.dto';

@Injectable()
export class AdsContainerService {
  response: GlobalResponse = new GlobalResponse();
  constructor(
    private readonly adsContainerRepository: AdsContainerRepository,
    private readonly adsContainerAdapter: AdsContainerEntityAdapter,
  ) {}

  async getAllAdsContainer(): Promise<GlobalResponse> {
    try {
      const adsContainer: AdsContainerEntity[] =
        await this.adsContainerRepository.find();
      const containerResponse: AdsContainerEntity[] = [];
      for (const container of adsContainer) {
        containerResponse.push(
          this.adsContainerAdapter.entityToResponse(container),
        );
      }
      return this.response.successResponse(200, 'success', containerResponse);
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
      const containerById: AdsContainerEntity =
        await this.adsContainerRepository.findOneBy({ id: containerId });
      if (!containerById)
        throw new NotFoundException('no container id was found!');

      return this.response.successResponse(
        200,
        'success',
        this.adsContainerAdapter.entityToResponse(containerById),
      );
    } catch (error) {
      console.error(
        `[AdsContainerService][getAdsContainerById] error when get ads container by id for ${containerId}`,
        error,
      );
      return this.response.error(error);
    }
  }

  async createAdsContainer(
    request: AdsContainerRequest,
  ): Promise<GlobalResponse> {
    try {
      const newAdsContainer: AdsContainerEntity = new AdsContainerEntity();
      newAdsContainer.id = crypto.randomUUID();
      newAdsContainer.campaignId = request.campaignId;
      newAdsContainer.platformId = request.platformId;
      newAdsContainer.adsName = request.adsName;
      newAdsContainer.sheetId = request.sheetId ?? null;
      await this.adsContainerRepository.save(newAdsContainer);

      return this.response.successResponse(
        201,
        'success create new Ads Container',
        request,
      );
    } catch (error) {
      console.error(
        `[AdsContainerService][createAdsContainer] error when create ads container for ${JSON.stringify(
          request,
        )}`,
        error,
      );
      return this.response.error(error);
    }
  }

  async updateAdsContainerById(
    containerId: string,
    request: AdsContainerRequest,
  ): Promise<GlobalResponse> {
    try {
      const containerById: AdsContainerEntity =
        await this.adsContainerRepository.findOneBy({ id: containerId });
      if (!containerById)
        throw new NotFoundException('no container id was found!');

      const updatedById = await this.adsContainerRepository.update(
        {
          id: containerId,
        },
        {
          campaignId: request.campaignId,
          platformId: request.platformId,
          adsName: request.adsName,
          sheetId: request.sheetId !== '' ? request.sheetId : null,
          lastUpdatedAt: new Date(),
        },
      );

      if (updatedById.affected == 1)
        return this.response.successResponse(200, 'success');
    } catch (error) {
      console.error(
        `[AdsContainerService][updateAdsContainerById] error when update ads container for id ${containerId}`,
        error,
      );
      return this.response.error(error);
    }
  }

  async deleteContainerById(containerId: string): Promise<GlobalResponse> {
    try {
      const containerById: AdsContainerEntity =
        await this.adsContainerRepository.findOneBy({ id: containerId });
      if (!containerById)
        throw new NotFoundException('no container id was found!');

      const deleteById = await this.adsContainerRepository.delete({
        id: containerId,
      });
      if (deleteById.affected === 0) {
        throw new InternalServerErrorException(
          `something wrong when deletion process for ads container id ${containerId}`,
        );
      }

      return this.response.successResponse(
        200,
        `ads container id ${containerId} deleted successful!`,
      );
    } catch (error) {
      console.error(
        `[AdsContainerService][deleteContainerById] error when delete ads container by id ${containerId}`,
        error,
      );
      return this.response.error(error);
    }
  }
}
