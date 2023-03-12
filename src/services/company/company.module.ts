import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessTokenStrategy } from '../auth/strategies/access-token.strategy';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { CompanyEntity } from './database/entity/company.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyEntity])],
  controllers: [CompanyController],
  providers: [AccessTokenStrategy, CompanyService],
  exports: [CompanyService],
})
export class CompanyModule {}
