import { Injectable } from '@nestjs/common';
import { CampaignEntity } from '../database/entity/campaign.entity';

@Injectable()
export class CampaignAdapter {
  public EntityToResult(campaign: CampaignEntity) {
    const campaignResult: CampaignEntity = new CampaignEntity();
    campaignResult.id = campaign.id;
    campaignResult.companyId = campaign.companyId;
    campaignResult.campaignName = campaign.campaignName;
    campaignResult.status = campaign.status;

    return campaignResult;
  }
}
