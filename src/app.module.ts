import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbConfigService } from './config/database/db-config.service';
import databaseConfig from './config/database/database-config';
import { AuthModule } from './services/auth/auth.module';
import { UserModule } from './services/users/users.module';
import configuration from './config/configuration';
import { TokenModule } from './services/jwt/token.module';
import { PlatformModule } from './services/platform/platform.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration, databaseConfig],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: DbConfigService,
      inject: [DbConfigService],
    }),
    AuthModule,
    UserModule,
    TokenModule,
    PlatformModule,
  ],
  controllers: [],
  providers: [DbConfigService],
})
export class AppModule {}
