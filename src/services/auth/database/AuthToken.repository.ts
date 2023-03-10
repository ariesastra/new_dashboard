import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthToken } from './entity/AuthToken.entity';

export class AuthTokenRepository extends Repository<AuthToken> {
  constructor(
    @InjectRepository(AuthToken)
    private authTokenRepository: Repository<AuthToken>,
  ) {
    super(
      authTokenRepository.target,
      authTokenRepository.manager,
      authTokenRepository.queryRunner,
    );
  }
}
