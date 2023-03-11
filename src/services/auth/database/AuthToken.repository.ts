import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthTokenEntity } from './entity/AuthToken.entity';

export class AuthTokenRepository extends Repository<AuthTokenEntity> {
  constructor(
    @InjectRepository(AuthTokenEntity)
    private authTokenRepository: Repository<AuthTokenEntity>,
  ) {
    super(
      authTokenRepository.target,
      authTokenRepository.manager,
      authTokenRepository.queryRunner,
    );
  }

  async findTokenByUserId(userId: string): Promise<AuthTokenEntity> {
    return this.findOneBy({ userId: userId });
  }

  async findRefreshToken(refreshToken: string): Promise<AuthTokenEntity> {
    return this.findOneBy({ refreshToken: refreshToken });
  }
}
