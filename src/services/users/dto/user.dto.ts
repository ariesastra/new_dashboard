import { IsNotEmpty, IsString } from 'class-validator';

export class UserRequest {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsString()
  fullName: string;

  @IsString()
  gender: string;

  access: UserAccessEnum;
}

export enum UserAccessEnum {
  SUPER_ADMIN = 'SUPER ADMIN',
  ADMIN = 'ADMIN',
  SALES = 'SALES',
  CLIENT = 'CLIENT',
}
