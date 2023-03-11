import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Tokens } from '../auth/types/token.type';

@Injectable()
export class TokenService {
  jwtSecret = '';
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwtSecret = this.configService.get<string>('config.jwt.secret');
  }

  public getJwtSecret(): string {
    return this.jwtSecret;
  }

  async getToken(
    userId: string,
    email: string,
    access: string,
  ): Promise<Tokens> {
    try {
      const jwtPayload: any = {
        userId,
        email,
        access,
      };
      const [accessToken, refreshToken] = await Promise.all([
        await this.jwtService.signAsync(jwtPayload, {
          secret: this.jwtSecret,
          expiresIn: 60 * 15, // in second
        }),
        await this.jwtService.signAsync(jwtPayload, {
          secret: this.jwtSecret,
          expiresIn: 60 * 60 * 24 * 7, // in second
        }),
      ]);

      const response: Tokens = {
        accessToken,
        refreshToken,
      };
      return response;
    } catch (error) {
      console.error(
        `[UsersService][getToken] error when get token for userId ${userId}`,
        error,
      );
    }
  }
}
