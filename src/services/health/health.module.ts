import { Module } from '@nestjs/common';
import { HelathController } from './health.controller';

@Module({
  controllers: [HelathController],
})
export class HealthModule {}
