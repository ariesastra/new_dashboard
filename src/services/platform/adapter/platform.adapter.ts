import { PlatformEntity } from '../database/entity/platform.entity';
import { Platform } from '../dto/platform.dto';

export class PlatformAdapter {
  entityToReponse(platformEntity: PlatformEntity): Platform {
    const platform: Platform = new Platform();
    platform.platformName = platformEntity.platformName;

    return platform;
  }
}
