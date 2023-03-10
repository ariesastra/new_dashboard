import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { GlobalResponse } from 'src/helper/types/common.type';
import { UserRequest } from './dto/user.dto';
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
  async signUp(@Body() signUpRequest: UserRequest): Promise<GlobalResponse> {
    try {
      return await this.userService.signUp(signUpRequest);
    } catch (error) {
      console.error(
        `[UserController][signUp] error when sign up for ${signUpRequest.email}`,
      );
    }
  }

  @Post('/profile')
  async profile(): Promise<any> {
    try {
    } catch (error) {
      console.error();
    }
  }

  @Put('/update')
  async updateUsers(
    @Body() updateRequest: UserRequest,
  ): Promise<GlobalResponse> {
    try {
      return await this.userService.updateUser(updateRequest);
    } catch (error) {
      console.error(
        `[UserController][updateUsers] error when update user ${updateRequest.email}`,
      );
    }
  }
}
