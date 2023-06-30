import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { BcriptSchenario } from 'src/helper/common/bycript';
import { GlobalResponse } from 'src/helper/common/globalResponse';
import { GlobalResponseType } from 'src/helper/types/common.type';
import { TokenService } from '../jwt/token.service';
import { UserEntity } from '../users/database/entity/User.entity';
import { UserService } from '../users/users.service';
import { AuthTokenRepository } from './database/AuthToken.repository';
import { AuthTokenEntity } from './database/entity/AuthToken.entity';
import { AuthRequest } from './dto/auth.dto';
import { JwtPayload, Tokens } from './types/token.type';

@Injectable()
export class AuthService {
  response: GlobalResponse = new GlobalResponse();
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly authTokenRepository: AuthTokenRepository,
    private readonly bcrypt: BcriptSchenario,
    private readonly tokenService: TokenService,
  ) {}

  async doLogin(request: AuthRequest): Promise<GlobalResponseType> {
    try {
      const userEntity: UserEntity = await this.userService.findUserByEmail(
        request.email,
      );
      if (!userEntity) {
        throw new BadRequestException('Invalid email or password!');
      }
      const validPassword: any = await this.bcrypt.compareSchenario(
        request.password,
        userEntity.password,
      );
      if (!validPassword) {
        throw new BadRequestException('Invalid email or password!');
      }

      // do login logic
      const generateToken: Tokens = await this.tokenService.getToken(
        userEntity.id,
        userEntity.email,
        userEntity.access,
      );
      await this.saveRefreshToken(userEntity.id, generateToken.refreshToken);

      return this.response.successResponse(200, 'login successful', {
        refreshToken: generateToken.refreshToken,
        accessToken: generateToken.accessToken,
      });
    } catch (error) {
      console.error(
        `[AuthService][doLogin] error when login for ${request.email}`,
        error,
      );
      return this.response.errorResponse(
        400,
        'invalid email or password!',
        error.response ? error.response.error : error.detail,
      );
    }
  }

  async doLogout(userId: string): Promise<GlobalResponseType> {
    try {
      const authTokenByUserId: AuthTokenEntity =
        await this.authTokenRepository.findTokenByUserId(userId);

      if (authTokenByUserId) {
        await this.authTokenRepository.delete(authTokenByUserId.id);
        return this.response.successResponse(200, 'logout successful');
      }

      throw new NotFoundException('user not have any token!');
    } catch (error) {
      console.log(
        `[AuthService][doLogout] error when logout for user id ${userId}`,
      );
      return this.response.errorResponse(
        500,
        'internal server error',
        error.response ? error.response.error : error.detail,
      );
    }
  }

  async refreshToken(
    jwtPayload: JwtPayload,
    refreshToken: string,
  ): Promise<GlobalResponseType> {
    try {
      console.log(
        `[AuthService][refreshToken] do refresh token for ${jwtPayload.user.email}`,
      );

      const findRefreshToken: AuthTokenEntity =
        await this.authTokenRepository.findRefreshToken(refreshToken);
      if (!findRefreshToken) {
        // await this.doLogout(jwtPayload.user.userId);
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

      return this.response.successResponse(
        200,
        'new token generated!',
        newToken,
      );
    } catch (error) {
      console.error(
        `[AuthService][refreshToken] error when do refresh token for ${jwtPayload.user.userId}`,
      );
      return this.response.errorResponse(
        500,
        'internal server error',
        error.response ? error.response : error.detail,
      );
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
