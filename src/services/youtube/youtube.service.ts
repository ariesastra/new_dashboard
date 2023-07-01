import { Injectable } from '@nestjs/common';
import { AdsData, SHEET_RANGE } from '../ads_data/dto/adsData.dto';
import { AdsContainerEntity } from '../ads_container/database/entity/adsContainer.entity';
import { AdsDataEntity } from '../ads_data/database/entity/adsData.entity';
import { AdsDataRepository } from '../ads_data/database/adsData.repository';
import { YoutubeRegularDataAdapter } from './adapter/youtubeData.adapter';

@Injectable()
export class YoutubeAdsService {
  constructor(
    private readonly adsDataRepository: AdsDataRepository,
    private readonly youtubeReguralDataAdapter: YoutubeRegularDataAdapter,
  ) {}

  async youtubeGeneralAssignemnt(
    sheetData: Array<string[]>,
    adsContainer: AdsContainerEntity,
    adsData: AdsDataEntity,
  ): Promise<void> {
    try {
      for (const generalData of sheetData) {
        const adsDataResponse: AdsData =
          this.youtubeReguralDataAdapter.youtube(generalData);
        adsData.date = new Date(generalData[0]);
        adsData.adsRange = SHEET_RANGE.GENERAL;
        adsData.adsData = adsDataResponse;

        await this.adsDataRepository
          .upsert(adsData, ['date', 'containerId', 'adsRange'])
          .catch((error) => {
            throw new error();
          });
      }
    } catch (error) {
      console.error(
        `[AdsDataService][createNewAdsData] error when create new ${SHEET_RANGE.GENERAL} ads data for ${adsContainer.adsName}`,
        error,
      );
      throw error;
    } finally {
      console.log(
        `[AdsDataService][regularRangeAssignment] success save data ${SHEET_RANGE.GENERAL} for ${adsContainer.adsName}`,
      );
    }
  }
}
