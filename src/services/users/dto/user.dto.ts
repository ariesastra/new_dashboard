export class UserRegisterRequest {
  email: string;
  password: string;
  fullName: string;
  gender: string;
  access: UserAccessEnum;
}

export enum UserAccessEnum {
  SUPER_ADMIN = 'SUPER ADMIN',
  ADMIN = 'ADMIN',
  SALES = 'SALES',
  CLIENT = 'CLIENT',
}

export class UserResponse {
  statusCode: number;
  message: string;
  error?: string;
}
