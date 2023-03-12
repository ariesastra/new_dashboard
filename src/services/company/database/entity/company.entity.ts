import { AuditEntity } from 'src/helper/entities/Audit.entity';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'company' })
export class CompanyEntity extends AuditEntity {
  @PrimaryColumn({ name: 'id' })
  id: string;
  @Column({ name: 'company_name' })
  companyName: string;
  @Column({ name: 'company_img', type: 'jsonb' })
  companyImg: unknown;
}
