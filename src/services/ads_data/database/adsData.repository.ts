import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdsDataEntity } from './entity/adsData.entity';

export class AdsDataRepository extends Repository<AdsDataEntity> {
  constructor(
    @InjectRepository(AdsDataEntity)
    private readonly adsDataRepository: Repository<AdsDataEntity>,
  ) {
    super(
      adsDataRepository.target,
      adsDataRepository.manager,
      adsDataRepository.queryRunner,
    );
  }
}
