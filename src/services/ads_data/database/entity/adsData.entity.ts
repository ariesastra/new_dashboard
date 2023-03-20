import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'ads_data' })
export class AdsDataEntity {
  @PrimaryColumn({ name: '' })
  id: string;
  @Column({ name: 'date' })
  date: Date;
  @Column({ name: 'container_id' })
  containerId: string;
  @Column({ name: 'ads_data' })
  adsData: JSON;
}
