import { Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AdsDataEntity } from './entity/adsData.entity';

export class AdsDataRepository extends Repository<AdsDataEntity> {
  constructor(
    @Inject(AdsDataEntity)
    private readonly adsDataRepository: Repository<AdsDataEntity>,
  ) {
    super(
      adsDataRepository.target,
      adsDataRepository.manager,
      adsDataRepository.queryRunner,
    );
  }
}
