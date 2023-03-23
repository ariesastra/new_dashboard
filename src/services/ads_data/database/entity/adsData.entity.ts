import { AuditEntity } from 'src/helper/entities/Audit.entity';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'ads_data' })
export class AdsDataEntity extends AuditEntity {
  @PrimaryColumn({ name: '' })
  id: string;
  @Column({ name: 'date' })
  date: Date;
  @Column({ name: 'container_id' })
  containerId: string;
  @Column({ name: 'ads_data', type: 'jsonb' })
  adsData: unknown;
}
