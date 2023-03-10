import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AuthTokenRepository } from './database/AuthToken.repository';
import { AuthToken } from './database/entity/AuthToken.entity';
import { AuthRequest } from './dto/auth.dto';
import { Tokens } from './types/token.type';

@Injectable()
export class AuthService {
  constructor(private readonly authTokenRepository: AuthTokenRepository) {}

  async doLogin(request: AuthRequest): Promise<void> {
    try {
      console.log(request);
    } catch (error) {}
  }

  async doLogout(): Promise<void> {
    try {
    } catch (error) {}
  }

  async refreshToken(): Promise<void> {
    try {
    } catch (error) {}
  }

  async saveRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<boolean> {
    try {
      const authEntity: AuthToken = new AuthToken();
      authEntity.id = crypto.randomUUID();
      authEntity.userId = userId;
      authEntity.refreshToken = refreshToken;
      await this.authTokenRepository.save(authEntity);

      return true;
    } catch (error) {
      console.error(
        `[AuthService][saveRefreshToken] error when save refresh token for userId: ${userId}`,
        error,
      );
      return false;
    }
  }
}
