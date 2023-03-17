import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CampaignEntity } from './entity/campaign.entity';

export class CampaignRepository extends Repository<CampaignEntity> {
  constructor(
    @InjectRepository(CampaignEntity)
    private readonly campaignRepository: Repository<CampaignEntity>,
  ) {
    super(
      campaignRepository.target,
      campaignRepository.manager,
      campaignRepository.queryRunner,
    );
  }
}
