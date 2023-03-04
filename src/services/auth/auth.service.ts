import { Injectable } from '@nestjs/common';
import { AuthRequest } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor() {}

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
}
