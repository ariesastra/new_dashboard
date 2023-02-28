import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthToken } from '../auth/database/entity/AuthToken.entity';
import { Users } from './database/entity/User.entity';
import { UserController } from './users.controller';
import { UserService } from './users.service';
@Module({
  imports: [TypeOrmModule.forFeature([Users, AuthToken])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
