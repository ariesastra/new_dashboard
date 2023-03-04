import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Users } from './database/entity/User.entity';
import { UserRepository } from './database/User.repository';
import { UserRegisterRequest } from './dto/user.dto';
import { BcriptSchenario } from 'src/helper/common/bycript';
@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hash: BcriptSchenario,
  ) {}

  async signUp(signUpRequest: UserRegisterRequest): Promise<any> {
    try {
      const userEntity: Users = new Users();
      userEntity.email = signUpRequest.email;
      userEntity.password = await this.hash.hashSchenario(
        signUpRequest.password,
      );
      userEntity.fullName = signUpRequest.fullName;
      userEntity.gender = signUpRequest.gender;
      userEntity.access = signUpRequest.access;
      await this.userRepository.save(userEntity);

      return {
        status: 200,
        message: 'Success save users',
      };
    } catch (error) {
      console.error(
        `[UserService][sugnUpRequest] error when sign up for email: ${signUpRequest.email}`,
      );
      throw new InternalServerErrorException('Error when save new users');
    }
  }
}
