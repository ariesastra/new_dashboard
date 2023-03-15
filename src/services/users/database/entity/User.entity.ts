import { Entity, Column, PrimaryColumn } from 'typeorm';
import { AuditEntity } from 'src/helper/entities/Audit.entity';

@Entity({ name: 'users' })
export class UserEntity extends AuditEntity {
  @PrimaryColumn({ name: 'id' })
  id: string;
  @Column({ name: 'email', unique: true })
  email: string;
  @Column({ name: 'password' })
  password: string;
  @Column({ name: 'full_name' })
  fullName: string;
  @Column({ name: 'gender' })
  gender: string;
  @Column({ name: 'access' })
  access: string;
  @Column({ name: 'company_id' })
  companyId: string;
}
