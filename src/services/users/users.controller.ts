import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserRegisterRequest } from './dto/user.dto';
import { UserService } from './users.service';

@Controller('v1/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  async getUsers(): Promise<any> {
    try {
    } catch (error) {
      console.error();
    }
  }

  @Post('/sign-up')
  async signUp(@Body() signUpReguest: UserRegisterRequest): Promise<any> {
    try {
      return await this.userService.signUp(signUpReguest);
    } catch (error) {
      console.error();
    }
  }

  @Post('/profile')
  async profile(): Promise<any> {
    try {
    } catch (error) {
      console.error();
    }
  }
}
