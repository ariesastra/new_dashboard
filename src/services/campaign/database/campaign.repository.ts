import { Repository } from 'typeorm';
import { CampaignEntity } from './entity/campaign.entity';

export class CampaignRepository extends Repository<CampaignEntity> {}
