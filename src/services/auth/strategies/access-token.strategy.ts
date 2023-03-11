import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { TokenService } from 'src/services/jwt/token.service';
import { JwtPayload } from '../types/token.type';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly tokenService: TokenService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: tokenService.getJwtSecret(),
    });
  }

  public validate(payload: JwtPayload) {
    if (payload) {
      return payload;
    } else return new UnauthorizedException();
  }
}
