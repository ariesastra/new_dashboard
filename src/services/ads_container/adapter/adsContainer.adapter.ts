import { AdsContainerEntity } from '../database/entity/adsContainer.entity';

export class AdsContainerEntityAdapter {
  public entityToResponse(
    adsContainerEntity: AdsContainerEntity,
  ): AdsContainerEntity {
    const response: AdsContainerEntity = new AdsContainerEntity();
    response.id = adsContainerEntity.id;
    response.campaignId = adsContainerEntity.campaignId;
    response.platformId = adsContainerEntity.platformId;
    response.adsName = adsContainerEntity.adsName;

    return response;
  }
}
