import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { GlobalResponse } from 'src/helper/common/globalResponse';
import { CampaignService } from './campaign.service';
import { CampaignRequest } from './dto/campaign.dto';

@Controller('v1/campaign')
export class CampaignController {
  constructor(private readonly campaignService: CampaignService) {}

  @Get('/all')
  async getAllCampaign(): Promise<GlobalResponse> {
    try {
      console.log(
        `[CampaignController][getAllCampaign] start get all campaign`,
      );

      return await this.campaignService.getAllCampaign();
    } catch (error) {
      console.error(
        `[CampaignController][getAllCampaign] error when get all campaign`,
        error,
      );
    }
  }

  @Get('/:company-id')
  async getCampaignByCompanyId(
    @Param('company-id') companyId: string,
  ): Promise<GlobalResponse> {
    try {
      console.log(
        `[CampaignController][getCampaignByCompanyId] start get campaign by company id for ${companyId}`,
      );

      return await this.campaignService.getCampaignByCompanyId(companyId);
    } catch (error) {
      console.error(
        `[CampaignController][getCampaignByCompanyId] error when get campaign by company id for ${companyId}`,
        error,
      );
    }
  }

  @Post('/create')
  async createNewCampaign(
    @Body() campaignRequest: CampaignRequest,
  ): Promise<GlobalResponse> {
    try {
      console.log(
        `[CampaignController][createNewCampaign] start create new campaign for ${campaignRequest}`,
      );

      return await this.campaignService.createNewCampaign(campaignRequest);
    } catch (error) {
      console.error(
        `[CampaignController][createNewCampaign] error when create new campaign`,
        error,
      );
    }
  }

  @Put('/:campaign-id/update')
  async updateCampaignById(
    @Param('campaign-id') campaignId: string,
    @Body() campaignRequest: CampaignRequest,
  ): Promise<GlobalResponse> {
    try {
      console.log(
        `[CampaignController][updateCampaignById] start update campaign for ${campaignRequest}`,
      );

      return await this.campaignService.updateCampaignById(
        campaignId,
        campaignRequest,
      );
    } catch (error) {
      console.error(
        `[CampaignController][updateCampaignById] error when update campaign by id for ${campaignId}`,
        error,
      );
    }
  }
}
