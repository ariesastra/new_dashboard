import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { BcriptSchenario } from 'src/helper/common/bycript';
import { GlobalResponse } from 'src/helper/types/common.type';
import { TokenService } from '../jwt/token.service';
import { Users } from '../users/database/entity/User.entity';
import { UserService } from '../users/users.service';
import { AuthTokenRepository } from './database/AuthToken.repository';
import { AuthTokenEntity } from './database/entity/AuthToken.entity';
import { AuthRequest } from './dto/auth.dto';
import { JwtPayload, Tokens } from './types/token.type';

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

  async doLogout(userId: string): Promise<GlobalResponse> {
    try {
      const authTokenByUserId: AuthTokenEntity =
        await this.authTokenRepository.findTokenByUserId(userId);

      if (authTokenByUserId) {
        await this.authTokenRepository.delete(authTokenByUserId.id);
        return {
          statusCode: 200,
          message: 'logout successful',
        };
      }

      throw new NotFoundException('user not have any token!');
    } catch (error) {
      console.log(
        `[AuthService][doLogout] error when logout for user id ${userId}`,
      );
      return error.response;
    }
  }

  async refreshToken(
    jwtPayload: JwtPayload,
    refreshToken: string,
  ): Promise<GlobalResponse> {
    try {
      const findRefreshToken: AuthTokenEntity =
        await this.authTokenRepository.findRefreshToken(refreshToken);
      if (!findRefreshToken) {
        await this.doLogout(jwtPayload.user.userId);
        throw new UnauthorizedException('invalid refresh token');
      }

      const newToken: Tokens = await this.tokenService.getToken(
        jwtPayload.user.userId,
        jwtPayload.user.email,
        jwtPayload.user.access,
      );
      if (newToken) {
        await this.updateRefreshToken(
          jwtPayload.user.userId,
          newToken.refreshToken,
        );
      }

      return {
        statusCode: 200,
        message: 'new token generated!',
        data: newToken,
      };
    } catch (error) {
      console.error(
        `[AuthService][refreshToken] error when do refresh token for ${jwtPayload.user.userId}`,
      );
      return error.response;
    }
  }

  async saveRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<boolean> {
    try {
      const authTokenByUserId: AuthTokenEntity =
        await this.authTokenRepository.findTokenByUserId(userId);
      if (!authTokenByUserId) {
        const authEntity: AuthTokenEntity = new AuthTokenEntity();
        authEntity.id = crypto.randomUUID();
        authEntity.userId = userId;
        authEntity.refreshToken = refreshToken;
        await this.authTokenRepository.save(authEntity);

        return true;
      }

      await this.updateRefreshToken(userId, refreshToken);
    } catch (error) {
      console.error(
        `[AuthService][saveRefreshToken] error when save refresh token for userId: ${userId}`,
        error,
      );
      return false;
    }
  }

  async updateRefreshToken(
    userId: string,
    newRefreshToken: string,
  ): Promise<boolean> {
    try {
      await this.authTokenRepository.update(
        {
          userId: userId,
        },
        {
          refreshToken: newRefreshToken,
          lastUpdatedAt: new Date(),
        },
      );

      return true;
    } catch (error) {
      console.error(
        `[AuthService][updateRefreshToken] error when update refresh token for userId: ${userId}`,
        error,
      );
      return false;
    }
  }
}
