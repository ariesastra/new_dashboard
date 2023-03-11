import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BcriptSchenario } from 'src/helper/common/bycript';
import { TokenModule } from '../jwt/token.module';
import { UserModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthTokenRepository } from './database/AuthToken.repository';
import { AuthToken } from './database/entity/AuthToken.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthToken]),
    forwardRef(() => UserModule),
    TokenModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthTokenRepository, BcriptSchenario],
  exports: [AuthService],
})
export class AuthModule {}
