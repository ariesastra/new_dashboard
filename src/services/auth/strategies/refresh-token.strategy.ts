import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { TokenService } from 'src/services/jwt/token.service';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(private readonly tokenService: TokenService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: tokenService.getJwtSecret(),
      passReqToCallback: true,
    });
  }

  public validate(request: Request, payload: any) {
    const refreshToken = request
      .get('authorization')
      .replace('Bearer', '')
      .trim();

    return {
      ...payload,
      refreshToken,
    };
  }
}
