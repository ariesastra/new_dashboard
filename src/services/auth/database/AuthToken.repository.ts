import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { AuthToken } from './entity/AuthToken.entity';

@Injectable()
export class AuthTokenRepository extends Repository<AuthToken> {
  constructor(private datasource: DataSource) {
    super(AuthToken, datasource.createEntityManager());
  }
}
