import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BcriptSchenario } from 'src/helper/common/bycript';
import { AuthModule } from '../auth/auth.module';
import { CompanyModule } from '../company/company.module';
import { TokenModule } from '../jwt/token.module';
import { UserEntity } from './database/entity/User.entity';
import { UserRepository } from './database/User.repository';
import { UserController } from './users.controller';
import { UserService } from './users.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    TokenModule,
    forwardRef(() => AuthModule),
    forwardRef(() => CompanyModule),
  ],
  controllers: [UserController],
  providers: [UserService, BcriptSchenario, UserRepository],
  exports: [UserService, UserRepository],
})
export class UserModule {}
