import { AuditEntity } from 'src/helper/entities/Audit.entity';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'platform' })
export class PlatformEntity extends AuditEntity {
  @PrimaryColumn({ name: 'id' })
  id: string;
  @Column({ name: 'platform_name' })
  platformName: string;
}
