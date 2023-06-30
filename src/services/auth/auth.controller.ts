import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GlobalResponseType } from 'src/helper/types/common.type';
import { AuthService } from './auth.service';
import { AuthRequest } from './dto/auth.dto';
import { JwtPayload } from './types/token.type';

@Controller('v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginRequest: AuthRequest): Promise<GlobalResponseType> {
    try {
      console.log(`[AuthController][login] do login for ${loginRequest.email}`);
      return await this.authService.doLogin(loginRequest);
    } catch (error) {
      console.error(
        `[AuthController][login] error when login with credentials ${loginRequest}`,
      );
      return error.response;
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Request() request: JwtPayload) {
    try {
      console.log(
        `[AuthContoller][logout] do logout for ${request.user.email}`,
      );
      const userId: string = request.user.userId;
      return await this.authService.doLogout(userId);
    } catch (error) {
      console.error(`[AuthController][logout] error when logout`);
      return error.response;
    }
  }

  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  async refreshToken(@Request() request: JwtPayload) {
    try {
      const jwtPayload: JwtPayload = request;
      const refreshToken: string = request.user.refreshToken;

      return await this.authService.refreshToken(jwtPayload, refreshToken);
    } catch (error) {
      console.error(`[AuthController][refreshToken] error when refresh token`);
      return error.response;
    }
  }
}
