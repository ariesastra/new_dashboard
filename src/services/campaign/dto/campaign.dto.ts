export class CampaignRequest {
  companyId: string;
  campaignName: string;
}

export enum CampaignStatus {
  ACTIVE = 'ACTIVE',
  NOT_ACTIVE = 'NOT ACTIVE',
}
