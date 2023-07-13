import { AuditEntity } from 'src/helper/entities/Audit.entity';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'ads_data' })
export class AdsDataEntity extends AuditEntity {
  @PrimaryColumn({ name: 'date' })
  date: Date;
  @PrimaryColumn({ name: 'container_id' })
  containerId: string;
  @PrimaryColumn({ name: 'ads_range' })
  adsRange: string;
  @Column({ name: 'ads_data', type: 'jsonb' })
  adsData: unknown;
}
