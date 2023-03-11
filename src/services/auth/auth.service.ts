import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { BcriptSchenario } from 'src/helper/common/bycript';
import { GlobalResponse } from 'src/helper/types/common.type';
import { TokenService } from '../jwt/token.service';
import { Users } from '../users/database/entity/User.entity';
import { UserService } from '../users/users.service';
import { AuthTokenRepository } from './database/AuthToken.repository';
import { AuthToken } from './database/entity/AuthToken.entity';
import { AuthRequest } from './dto/auth.dto';
import { Tokens } from './types/token.type';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly authTokenRepository: AuthTokenRepository,
    private readonly bcrypt: BcriptSchenario,
    private readonly tokenService: TokenService,
  ) {}

  async doLogin(request: AuthRequest): Promise<GlobalResponse> {
    try {
      const userEntity: Users = await this.userService.findUserByEmail(
        request.email,
      );
      const validPassword: any = await this.bcrypt.compareSchenario(
        request.password,
        userEntity.password,
      );
      if (!userEntity || !validPassword) {
        throw new BadRequestException('Invalid User or Password!');
      }

      // do login logic
      const generateToken: Tokens = await this.tokenService.getToken(
        userEntity.id,
        userEntity.email,
        userEntity.access,
      );
      await this.saveRefreshToken(userEntity.id, generateToken.refreshToken);

      return {
        statusCode: 200,
        message: 'Login Successful',
        data: {
          accessToken: generateToken.accessToken,
          refreshToken: generateToken.refreshToken,
        },
      };
    } catch (error) {
      console.error(
        `[AuthService][doLogin] error when login for ${request.email}`,
        error,
      );
      return error.response;
    }
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
