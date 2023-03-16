import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessTokenStrategy } from '../auth/strategies/access-token.strategy';
import { UserModule } from '../users/users.module';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { CompanyRepository } from './database/company.repository';
import { CompanyEntity } from './database/entity/company.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CompanyEntity]),
    forwardRef(() => UserModule),
  ],
  controllers: [CompanyController],
  providers: [CompanyService, CompanyRepository, AccessTokenStrategy],
  exports: [CompanyService],
})
export class CompanyModule {}
