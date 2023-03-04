import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Users } from './database/entity/User.entity';
import { UserRepository } from './database/User.repository';
import { UserRequest } from './dto/user.dto';
import { BcriptSchenario } from 'src/helper/common/bycript';
import { GlobalResponse } from 'src/helper/common/common';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hash: BcriptSchenario,
  ) {}

  async signUp(signUpRequest: UserRequest): Promise<GlobalResponse> {
    try {
      const userByEmail: Users = await this.userRepository.findUserByEmail(
        signUpRequest.email,
      );
      if (!userByEmail) return await this.createNewUser(signUpRequest);
      else {
        const badRequest: BadRequestException = new BadRequestException();
        return {
          statusCode: badRequest.getStatus(),
          error: badRequest.message,
          message: 'User Already Exists!',
        };
      }
    } catch (error) {
      console.error(
        `[UserService][sugnUpRequest] error when sign up for email: ${signUpRequest.email}`,
      );
      throw new InternalServerErrorException('Error when save new users');
    }
  }

  // TOBE NOTED: this method is not to change email and password
  async updateUser(updateRequest: UserRequest): Promise<GlobalResponse> {
    try {
      const isUserExists: Users = await this.userRepository.findUserByEmail(
        updateRequest.email,
      );
      if (isUserExists) {
        await this.userRepository.update(
          {
            email: updateRequest.email,
          },
          {
            fullName: updateRequest.fullName,
            gender: updateRequest.gender,
            access: updateRequest.access,
            lastUpdatedAt: new Date(),
          },
        );

        return {
          statusCode: 200,
          message: `${updateRequest.email} has been updated!`,
        };
      }

      const notFound: NotFoundException = new NotFoundException();
      return {
        statusCode: notFound.getStatus(),
        error: notFound.message,
        message: 'User Not Found!',
      };
    } catch (error) {
      console.error(
        `[UserService][sugnUpRequest] error when update for email: ${updateRequest.email}`,
      );
      throw new InternalServerErrorException('Error when update new users');
    }
  }

  async createNewUser(signUpRequest: UserRequest): Promise<GlobalResponse> {
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
