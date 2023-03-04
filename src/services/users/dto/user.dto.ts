export class UserRequest {
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
