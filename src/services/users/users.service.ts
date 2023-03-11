import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Users } from './database/entity/User.entity';
import { UserRepository } from './database/User.repository';
import { UserRequest } from './dto/user.dto';
import { BcriptSchenario } from 'src/helper/common/bycript';
import { GlobalResponse } from 'src/helper/types/common.type';
import { Tokens } from '../auth/types/token.type';
import { TokenService } from '../jwt/token.service';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hash: BcriptSchenario,
    private readonly tokenService: TokenService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  async signUp(signUpRequest: UserRequest): Promise<GlobalResponse> {
    try {
      const userByEmail: Users = await this.findUserByEmail(
        signUpRequest.email,
      );
      if (!userByEmail) {
        const userEntity: Users = await this.createNewUser(signUpRequest);
        const accessAndRefreshToken: Tokens = await this.tokenService.getToken(
          userEntity.id,
          userEntity.email,
          userEntity.access,
        );
        await this.authService.saveRefreshToken(
          userEntity.id,
          accessAndRefreshToken.refreshToken,
        );

        return {
          statusCode: 201,
          message: `User has been created!`,
          data: {
            accessToken: accessAndRefreshToken.accessToken,
            refreshToken: accessAndRefreshToken.refreshToken,
          },
        };
      } else {
        throw new NotFoundException('User Already Exists!');
      }
    } catch (error) {
      console.error(
        `[UserService][sugnUpRequest] error when sign up for email: ${signUpRequest.email}`,
        error,
      );
      return error.response;
    }
  }

  async findUserByEmail(email: string): Promise<Users> {
    try {
      const userByEmail: Users = await this.userRepository.findUserByEmail(
        email,
      );

      return userByEmail;
    } catch (error) {
      console.error(
        `[UserService][findUserByEmail] error when find user for ${email}`,
        email,
      );
      return error.response;
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

      throw new NotFoundException('User not found!');
    } catch (error) {
      console.error(
        `[UserService][sugnUpRequest] error when update for email: ${updateRequest.email}`,
        error,
      );
      return error.response;
    }
  }

  async createNewUser(signUpRequest: UserRequest): Promise<Users> {
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
      await this.userRepository.save(userEntity);

      return userEntity;
    } catch (error) {
      console.error(
        `[UserService][sugnUpRequest] error when create new user for email: ${signUpRequest.email}`,
        error,
      );
      return error.response;
    }
  }
}
