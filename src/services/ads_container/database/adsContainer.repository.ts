import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdsContainerEntity } from './entity/adsContainer.entity';

@Injectable()
export class AdsContainerRepository extends Repository<AdsContainerEntity> {
  constructor(
    @InjectRepository(AdsContainerEntity)
    private readonly adsContainerRepository: Repository<AdsContainerEntity>,
  ) {
    super(
      adsContainerRepository.target,
      adsContainerRepository.manager,
      adsContainerRepository.queryRunner,
    );
  }
}
