import { AuditEntity } from 'src/helper/entities/Audit.entity';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'campaign' })
export class CampaignEntity extends AuditEntity {
  @PrimaryColumn({ name: 'id' })
  id: string;
  @Column({ name: 'company_id' })
  companyId: string;
  @Column({ name: 'campaign_name' })
  campaignName: string;
}
