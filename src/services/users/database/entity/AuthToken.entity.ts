import { Entity, PrimaryColumn, Column } from 'typeorm';
import { AuditEntity } from 'src/helper/entities/Audit.entity';

@Entity({ name: 'auth_token' })
export class AuthToken extends AuditEntity {
  @PrimaryColumn({ name: 'id' })
  id: string;
  @Column({ name: 'user_id' })
  userId: string;
  @Column({ name: 'source_id' })
  sourceId: string;
  @Column({ name: 'source' })
  source: string;
  @Column({ name: 'refresh_token' })
  refreshToken: string;
}
