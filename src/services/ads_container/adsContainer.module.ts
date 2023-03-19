import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessTokenStrategy } from '../auth/strategies/access-token.strategy';
import { TokenModule } from '../jwt/token.module';
import { AdsContainerEntityAdapter } from './adapter/adsContainer.adapter';
import { AdsContainerController } from './adsContainer.controller';
import { AdsContainerService } from './adsContainer.service';
import { AdsContainerRepository } from './database/adsContainer.repository';
import { AdsContainerEntity } from './database/entity/adsContainer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AdsContainerEntity]), TokenModule],
  controllers: [AdsContainerController],
  providers: [
    AdsContainerRepository,
    AdsContainerService,
    AccessTokenStrategy,
    AdsContainerEntityAdapter,
  ],
  exports: [AdsContainerService],
})
export class AdsContainerModule {}
