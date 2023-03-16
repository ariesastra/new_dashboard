import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CampaignService } from './campaign.service';
import { CampaignController } from './compaign.controller';

@Module({
  imports: [TypeOrmModule.forFeature([])],
  controllers: [CampaignController],
  providers: [CampaignService],
  exports: [CampaignService],
})
export class CampaignModule {}
