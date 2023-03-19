import { AuditEntity } from 'src/helper/entities/Audit.entity';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'ads_container' })
export class AdsContainerEntity extends AuditEntity {
  @PrimaryColumn({ name: 'id' })
  id: string;
  @Column({ name: 'campaign_id' })
  campaignId: string;
  @Column({ name: 'platform_id' })
  platformId: string;
  @Column({ name: 'ads_name' })
  adsName: string;
  @Column({ name: 'sheet_id' })
  sheetId: string;
}
