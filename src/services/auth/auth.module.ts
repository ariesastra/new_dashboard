import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BcriptSchenario } from 'src/helper/common/bycript';
import { TokenModule } from '../jwt/token.module';
import { UserModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthTokenRepository } from './database/AuthToken.repository';
import { AuthTokenEntity } from './database/entity/AuthToken.entity';
import { AccessTokenStrategy } from './strategies/access-token.strategy';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthTokenEntity]),
    forwardRef(() => UserModule),
    TokenModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthTokenRepository,
    BcriptSchenario,
    AccessTokenStrategy,
    RefreshTokenStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
