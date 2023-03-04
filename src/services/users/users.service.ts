import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Users } from './database/entity/User.entity';
import { UserRepository } from './database/User.repository';
import { UserResponse, UserRegisterRequest } from './dto/user.dto';
import { BcriptSchenario } from 'src/helper/common/bycript';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hash: BcriptSchenario,
  ) {}

  async signUp(signUpReguest: UserRegisterRequest): Promise<UserResponse> {
    try {
      const userByEmail: Users = await this.userRepository.findUserByEmail(
        signUpReguest.email,
      );
      if (!userByEmail) return await this.createNewUser(signUpReguest);
      else return await this.updateUser(signUpReguest);
    } catch (error) {
      console.error(
        `[UserService][sugnUpRequest] error when sign up for email: ${signUpReguest.email}`,
      );
      throw new InternalServerErrorException('Error when save new users');
    }
  }

  async updateUser(signUpReguest: UserRegisterRequest): Promise<UserResponse> {
    try {
      // TOBE NOTED: this method is not to change email and password
      await this.userRepository.update(
        {
          email: signUpReguest.email,
        },
        {
          fullName: signUpReguest.fullName,
          gender: signUpReguest.gender,
          access: signUpReguest.access,
          lastUpdatedAt: new Date(),
        },
      );

      return {
        statusCode: 200,
        message: `${signUpReguest.email} has been updated!`,
      };
    } catch (error) {
      console.error(
        `[UserService][sugnUpRequest] error when update for email: ${signUpReguest.email}`,
      );
      throw new InternalServerErrorException('Error when update new users');
    }
  }

  async createNewUser(
    signUpRequest: UserRegisterRequest,
  ): Promise<UserResponse> {
    try {
      const userEntity: Users = new Users();
      userEntity.id = crypto.randomUUID();
      userEntity.email = signUpRequest.email;
      userEntity.password = await this.hash.hashSchenario(
        signUpRequest.password,
      );
      userEntity.fullName = signUpRequest.fullName;
      userEntity.gender = signUpRequest.gender;
      userEntity.access = signUpRequest.access;
      console.log(userEntity);
      await this.userRepository.save(userEntity);

      return {
        statusCode: 201,
        message: 'Success save users',
      };
    } catch (error) {
      console.error(
        `[UserService][sugnUpRequest] error when create new user for email: ${signUpRequest.email}`,
      );
      throw new InternalServerErrorException('Error when create new users');
    }
  }
}
