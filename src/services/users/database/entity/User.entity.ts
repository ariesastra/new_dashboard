import { Entity, Column, PrimaryColumn } from 'typeorm';
import { AuditEntity } from 'src/helper/entities/Audit.entity';

@Entity({ name: 'users' })
export class Users extends AuditEntity {
  @PrimaryColumn({ name: 'id' })
  id: string;
  @Column({ name: 'email' })
  email: string;
  @Column({ name: 'password' })
  password: string;
  @Column({ name: 'full_name' })
  fullName: string;
  @Column({ name: 'gender' })
  gender: string;
  @Column({ name: 'access' })
  access: string;
}
