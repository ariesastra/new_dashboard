import { Column } from 'typeorm';

export class AuditEntity {
  @Column({ name: 'created_at' })
  createdAt: Date;
  @Column({ name: 'created_by' })
  createdBy: string;
  @Column({ name: 'last_updated_at' })
  lastUpdatedAt: Date;
  @Column({ name: 'last_updated_by' })
  lastUpdatedBy: string;
}
