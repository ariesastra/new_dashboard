import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbConfigService } from './config/database/db-config.service';
import databaseConfig from './config/database/database-config';
import { UserModule } from './services/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [databaseConfig], isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useClass: DbConfigService,
      inject: [DbConfigService],
    }),
    UserModule,
  ],
  controllers: [],
  providers: [DbConfigService],
})
export class AppModule {}
