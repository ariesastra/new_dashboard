import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRequest } from './dto/auth.dto';
import { Tokens } from './types/token.type';

@Controller('v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() loginRequest: AuthRequest): Promise<any> {
    try {
      return await this.authService.doLogin(loginRequest);
    } catch (error) {
      console.error(
        `[AuthController][login] error when login with credentials ${loginRequest}`,
      );
    }
  }

  @Post('/logout')
  async logout() {
    try {
      return await this.authService.doLogout();
    } catch (error) {
      console.error(`[AuthController][logout] error when logout`);
    }
  }

  @Post('/refresh')
  async refreshToken() {
    try {
      return await this.authService.refreshToken();
    } catch (error) {
      console.error(`[AuthController][refreshToken] error when refresh token`);
    }
  }
}
