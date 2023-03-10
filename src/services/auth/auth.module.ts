import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthTokenRepository } from './database/AuthToken.repository';
import { AuthToken } from './database/entity/AuthToken.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AuthToken])],
  controllers: [AuthController],
  providers: [AuthService, AuthTokenRepository],
  exports: [AuthService],
})
export class AuthModule {}
