import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { GlobalResponse } from 'src/helper/common/globalResponse';
import { CampaignRepository } from './database/campaign.repository';
import { CampaignEntity } from './database/entity/campaign.entity';
import { CampaignRequest, CampaignStatus } from './dto/campaign.dto';

@Injectable()
export class CampaignService {
  response = new GlobalResponse();
  constructor(private readonly campaignRepository: CampaignRepository) {}

  async getAllCampaign(): Promise<GlobalResponse> {
    try {
      const allCampaign: CampaignEntity[] =
        await this.campaignRepository.find();

      return this.response.successResponse(200, 'success', allCampaign);
    } catch (error) {
      console.error(
        `[CampaignService][getAllCampaign] error when get all campaign`,
        error,
      );
      return this.response.errorResponse(
        error.response?.statusCode ?? 500,
        error?.message ?? 'internal server error',
        error.response ? error.response : error.detail,
      );
    }
  }

  async getCampaignByCompanyId(companyId: string): Promise<GlobalResponse> {
    try {
      const campaignEntity: CampaignEntity =
        await this.campaignRepository.findOneBy({
          companyId: companyId,
        });
      if (!campaignEntity) {
        throw new NotFoundException('company id not found');
      }

      return this.response.successResponse(200, 'success', campaignEntity);
    } catch (error) {
      console.error(
        `[CampaignService][getCampaignByCompanyId] error when get campaign by company id for ${companyId}`,
        error,
      );
      return this.response.errorResponse(
        error.response?.statusCode ?? 500,
        error?.message ?? 'internal server error',
        error.response ? error.response : error.detail,
      );
    }
  }

  async activateCampaignById(id: string): Promise<GlobalResponse> {
    try {
      const campaign: CampaignEntity = await this.campaignRepository.findOneBy({
        id: id,
      });
      if (!campaign) throw new NotFoundException(`invalid campaign id`);

      const updateStatus = await this.campaignRepository.update(
        { id: id },
        { status: CampaignStatus.ACTIVE, lastUpdatedAt: new Date() },
      );

      if (updateStatus.affected === 1) {
        return this.response.successResponse(200, 'success', updateStatus);
      }

      throw new InternalServerErrorException(
        `failed update status campaign for id ${id}`,
      );
    } catch (error) {
      console.error(
        `[CampaignService][activateCompanyById] error when activate campaign by id for ${id}`,
        error,
      );

      throw this.response.error(error);
    }
  }

  async createNewCampaign(
    campaignRequest: CampaignRequest,
  ): Promise<GlobalResponse> {
    try {
      if (!campaignRequest.companyId || !campaignRequest.campaignName) {
        throw new BadRequestException('fill all requested form');
      }
      const campaignEntity: CampaignEntity = new CampaignEntity();
      campaignEntity.id = crypto.randomUUID();
      campaignEntity.companyId = campaignRequest.companyId;
      campaignEntity.campaignName = campaignRequest.campaignName;
      await this.campaignRepository.save(campaignEntity);

      return this.response.successResponse(201, 'success', campaignEntity);
    } catch (error) {
      console.error(
        `[CampaignService][getCampaignByCompanyId] error when create campaign for ${campaignRequest}`,
        error,
      );
      return this.response.errorResponse(
        error.response?.statusCode ?? 500,
        error?.message ?? 'internal server error',
        error.response ? error.response : error.detail,
      );
    }
  }

  async updateCampaignById(
    campaignId: string,
    campaignRequest: CampaignRequest,
  ): Promise<GlobalResponse> {
    try {
      if (!campaignId) throw new BadRequestException('invalid campaign id');

      const updateById: any = await this.campaignRepository.update(
        {
          id: campaignId,
        },
        {
          campaignName: campaignRequest.campaignName,
          companyId: campaignRequest.companyId,
          lastUpdatedAt: new Date(),
        },
      );
      if (!updateById.affected)
        throw new InternalServerErrorException('update by id failed!');

      return this.response.successResponse(
        200,
        'success update',
        campaignRequest,
      );
    } catch (error) {
      console.error(
        `[CampaignService][updateCampaignById] error when update campaign by id: ${campaignId}`,
        error,
      );
      return this.response.errorResponse(
        error.response?.statusCode ?? 500,
        error?.message ?? 'internal server error',
        error.response ? error.response : error.detail,
      );
    }
  }
}
