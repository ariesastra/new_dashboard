import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './database/entity/User.entity';
import { UserRepository } from './database/User.repository';
import { UserController } from './users.controller';
import { UserService } from './users.service';
@Module({
  imports: [TypeOrmModule.forFeature([Users, UserRepository])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
