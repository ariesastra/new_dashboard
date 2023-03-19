import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdsContainerController } from './adsContainer.controller';
import { AdsContainerService } from './adsContainer.service';

@Module({
  imports: [TypeOrmModule.forFeature([])],
  controllers: [AdsContainerController],
  providers: [AdsContainerService],
  exports: [AdsContainerService],
})
export class AdsContainerModule {}
