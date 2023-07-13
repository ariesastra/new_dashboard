import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlatformEntity } from './database/entity/platform.entity';
import { PlatformRepository } from './database/platform.repository';
import { PlatformController } from './platform.controller';
import { PlatformService } from './platform.service';
import { PlatformAdapter } from './adapter/platform.adapter';

@Module({
  imports: [TypeOrmModule.forFeature([PlatformEntity])],
  controllers: [PlatformController],
  providers: [PlatformService, PlatformRepository, PlatformAdapter],
  exports: [PlatformService],
})
export class PlatformModule {}
