import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlatformEntity } from './entity/platform.entity';

export class PlatformRepository extends Repository<PlatformEntity> {
  constructor(
    @InjectRepository(PlatformEntity)
    private readonly platformRepository: Repository<PlatformEntity>,
  ) {
    super(
      platformRepository.target,
      platformRepository.manager,
      platformRepository.queryRunner,
    );
  }

  async findPlatformByName(platformName: string): Promise<PlatformEntity> {
    return await this.findOneBy({
      platformName: platformName,
    });
  }
}
