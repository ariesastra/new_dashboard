import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CampaignService } from './campaign.service';
import { CampaignController } from './compaign.controller';
import { CampaignRepository } from './database/campaign.repository';
import { CampaignEntity } from './database/entity/campaign.entity';
import { CampaignAdapter } from './adapter/campaign.adapter';

@Module({
  imports: [TypeOrmModule.forFeature([CampaignEntity])],
  controllers: [CampaignController],
  providers: [CampaignService, CampaignRepository, CampaignAdapter],
  exports: [CampaignService],
})
export class CampaignModule {}
