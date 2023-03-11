import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
} from '@nestjs/common';
import { GlobalResponse } from 'src/helper/types/common.type';
import { UserRequest } from './dto/user.dto';
import { UserService } from './users.service';

@Controller('v1/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  @HttpCode(HttpStatus.OK)
  async getUsers(): Promise<any> {
    try {
    } catch (error) {
      console.error();
    }
  }

  @Post('/sign-up')
  @HttpCode(HttpStatus.CREATED)
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
  @HttpCode(HttpStatus.OK)
  async profile(): Promise<any> {
    try {
    } catch (error) {
      console.error();
    }
  }

  @Put('/update')
  @HttpCode(HttpStatus.OK)
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
