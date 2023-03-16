import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UserEntity } from './database/entity/User.entity';
import { UserRepository } from './database/User.repository';
import { UserRequest } from './dto/user.dto';
import { BcriptSchenario } from 'src/helper/common/bycript';
import { GlobalResponseType } from 'src/helper/types/common.type';
import { Tokens } from '../auth/types/token.type';
import { TokenService } from '../jwt/token.service';
import { AuthService } from '../auth/auth.service';
import { GlobalResponse } from 'src/helper/common/globalResponse';
import { AssignCompanyRequest } from '../company/dto/company.dto';
import { CompanyService } from '../company/company.service';

@Injectable()
export class UserService {
  response: GlobalResponse = new GlobalResponse();
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hash: BcriptSchenario,
    private readonly tokenService: TokenService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    @Inject(forwardRef(() => CompanyService))
    private readonly companyService: CompanyService,
  ) {}

  async signUp(signUpRequest: UserRequest): Promise<GlobalResponseType> {
    try {
      const userByEmail: UserEntity = await this.findUserByEmail(
        signUpRequest.email,
      );
      if (!userByEmail) {
        const userEntity: UserEntity = await this.createNewUser(signUpRequest);
        const accessAndRefreshToken: Tokens = await this.tokenService.getToken(
          userEntity.id,
          userEntity.email,
          userEntity.access,
        );
        await this.authService.saveRefreshToken(
          userEntity.id,
          accessAndRefreshToken.refreshToken,
        );

        return this.response.successResponse(201, `User has been created!`, {
          accessToken: accessAndRefreshToken.accessToken,
          refreshToken: accessAndRefreshToken.refreshToken,
        });
      } else {
        throw new BadRequestException('User Already Exists!');
      }
    } catch (error) {
      console.error(
        `[UserService][sugnUpRequest] error when sign up for email: ${signUpRequest.email}`,
        error,
      );
      return this.response.errorResponse(
        error.response.statusCode ?? 500,
        error.message ?? 'internal server error',
        error.response ? error.response : error.detail,
      );
    }
  }

  async findUserByEmail(email: string): Promise<UserEntity> {
    try {
      const userByEmail: UserEntity = await this.userRepository.findUserByEmail(
        email,
      );

      return userByEmail;
    } catch (error) {
      console.error(
        `[UserService][findUserByEmail] error when find user for ${email}`,
        email,
      );
      return this.response.errorResponse(
        error.response.statusCode ?? 500,
        error.message ?? 'internal server error',
        error.response ? error.response : error.detail,
      );
    }
  }

  // TOBE NOTED: this method is not to change email and password
  async updateUser(updateRequest: UserRequest): Promise<GlobalResponseType> {
    try {
      const isUserExists: UserEntity =
        await this.userRepository.findUserByEmail(updateRequest.email);
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
      return this.response.errorResponse(
        error.response.statusCode ?? 500,
        error.message ?? 'internal server error',
        error.response ? error.response : error.detail,
      );
    }
  }

  async createNewUser(signUpRequest: UserRequest): Promise<UserEntity> {
    try {
      const userEntity: UserEntity = new UserEntity();
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
      return this.response.errorResponse(
        error.response.statusCode ?? 500,
        error.message ?? 'internal server error',
        error.response ? error.response : error.detail,
      );
    }
  }

  async assignCompanyToUser(
    request: AssignCompanyRequest,
  ): Promise<GlobalResponse> {
    try {
      const validUser: UserEntity = await this.userRepository.findOneBy({
        id: request.userId,
      });
      const validCompany: GlobalResponse =
        await this.companyService.getCompanyById(request.companyId);
      if (!validUser || !validCompany?.data) {
        throw new NotFoundException('user or company is not valid!');
      }

      const assignToUser = await this.userRepository.update(
        {
          id: request.userId,
        },
        {
          companyId: request.companyId,
        },
      );

      if (assignToUser.affected != 1) {
        throw new InternalServerErrorException('update failed!');
      }

      return this.response.successResponse(
        200,
        `success add company for ${validUser.email} to ${validCompany?.data.companyName}`,
        assignToUser,
      );
    } catch (error) {
      console.error(
        `[UserService][getCompanyByUserId] error when assign company by userId for ${request.userId}`,
        error,
      );
      return this.response.errorResponse(
        error.response?.statusCode ?? 500,
        error?.message ?? 'internal server error',
        error.response ? error.response : error.detail,
      );
    }
  }

  async getCompanyIdByUserId(userId: string): Promise<UserEntity> {
    try {
      const userEntity: UserEntity = await this.userRepository.findOneBy({
        id: userId,
      });
      if (!userEntity) throw new NotFoundException('user id not found!');

      return userEntity;
    } catch (error) {
      console.error(
        `[UserService][getCompanyByUserId] error when get company by userId ${userId}`,
        error,
      );
      return this.response.errorResponse(
        error.response?.statusCode ?? 500,
        error?.message ?? 'internal server error',
        error.response ? error.response : error.detail,
      );
    }
  }
}
