import { Injectable } from '@nestjs/common';
import { GoogleMetadataService } from 'src/config/googleapis/googleMetaData.service';
import { GlobalResponse } from 'src/helper/common/globalResponse';
import { AdsContainerEntity } from '../ads_container/database/entity/adsContainer.entity';
import { YoutubeAdapter } from './adapter/youtubeData.adapter';
import { AdsDataRepository } from './database/adsData.repository';
import { AdsDataEntity } from './database/entity/adsData.entity';
import { AdsData, GlobalAdsData, ObjectResponse, SHEET_RANGE } from './dto/adsData.dto';
import { PlatformService } from '../platform/platform.service';
import { Platform, PlatformName } from '../platform/dto/platform.dto';
import { YoutubeAdsService } from '../youtube/youtube.service';
@Injectable()
export class AdsDataService {
  response = new GlobalResponse();
  constructor(
    private readonly adsDataRepository: AdsDataRepository,
    private readonly googleService: GoogleMetadataService,
    private readonly youtubeAdapter: YoutubeAdapter,
    private readonly platformService: PlatformService,
    private readonly youtubeService: YoutubeAdsService,
  ) {}

  async fetchAdsData(containerEntity: AdsContainerEntity): Promise<void> {
    try {
      const sheetRange = Object.keys(SHEET_RANGE);
      const objResponse: ObjectResponse = new ObjectResponse();
      objResponse.adsName = containerEntity.adsName;
      for (const range of sheetRange) {
        const sheetData = await this.googleService.sheetsConnection(
          range.toLowerCase(),
          containerEntity.sheetId,
        );

        const adsData: GlobalAdsData = new GlobalAdsData();
        adsData.containerId = containerEntity.id;

        if (range === SHEET_RANGE.GENERAL) {
          await this.generalRangeAssignment(sheetData, containerEntity, adsData)
            .then(() => {
              objResponse.regular = 'SUCCESS';
            })
            .catch(() => {
              objResponse.regular = 'FAIL';
            });
        }
        // if (range === SHEET_RANGE.GENDER) {
        //   await this.genderRangeAssignment(
        //     sheetData,
        //     containerEntity,
        //     adsDataEntity,
        //   )
        //     .then(() => {
        //       objResponse.gender = 'SUCCESS';
        //     })
        //     .catch(() => {
        //       objResponse.gender = 'FAIL';
        //     });
        // }
        // if (range === SHEET_RANGE.DEVICE) {
        //   await this.deviceDataAssignment(
        //     sheetData,
        //     containerEntity,
        //     adsDataEntity,
        //   )
        //     .then(() => {
        //       objResponse.device = 'SUCCESS';
        //     })
        //     .catch(() => {
        //       objResponse.device = 'FAIL';
        //     });
        // }
        // if (range === SHEET_RANGE.AGE) {
        //   await this.ageDataAssignment(
        //     sheetData,
        //     containerEntity,
        //     adsDataEntity,
        //   )
        //     .then(() => {
        //       objResponse.age = 'SUCCESS';
        //     })
        //     .catch(() => {
        //       objResponse.age = 'FAIL';
        //     });
        // }
        // if (range === SHEET_RANGE.LOCATION) {
        //   await this.locationDataAssignment(
        //     sheetData,
        //     containerEntity,
        //     adsDataEntity,
        //   )
        //     .then(() => {
        //       objResponse.location = 'SUCCESS';
        //     })
        //     .catch(() => {
        //       objResponse.location = 'FAIL';
        //     });
        // }
      }

      return this.response.successResponse(200, 'SUCCESS', objResponse);
    } catch (error) {
      console.error(
        `[AdsDataService][createNewAdsData] error when create new ads data`,
        error,
      );
      throw error;
    }
  }

  async generalRangeAssignment(
    generalSheetData: Array<string[]>,
    adsContainer: AdsContainerEntity,
    adsData: GlobalAdsData,
  ): Promise<void> {
    try {
      console.log('GENERAL SHEETS DATA: ', generalSheetData[0]);
      console.log('ADS CONTAINER: ', adsContainer);
      console.log('ADS ENTITY: ', adsData);
      // exclude first array object
      const [, ...restOfGeneralData] = generalSheetData;

      // get a platform
      const platform: Platform = await this.platformService.getPlatformById(
        adsContainer.platformId,
      );
      // conditon base on platform
      if (platform.platformName === PlatformName.YOUTUBE) {
        await this.
      }

    } catch (error) {
      console.error(
        `[AdsDataService][createNewAdsData] error when create new ${SHEET_RANGE.GENERAL} ads data for ${adsContainer.adsName}`,
        error,
      );
      throw error;
    }
  }

  async genderRangeAssignment(
    genderSheetData: any[],
    adsContainer: AdsContainerEntity,
    adsDataEntity: AdsDataEntity,
  ): Promise<void> {
    try {
      const [, ...restOfGenderData] = genderSheetData;
      for (const genderData of restOfGenderData) {
        const adsData: AdsData = await this.youtubeAdapter.youtubeDataAdapter(
          genderData,
          SHEET_RANGE.GENDER,
        );
        adsDataEntity.date = genderData[0];
        adsDataEntity.adsRange = SHEET_RANGE.GENDER + '.' + genderData[1];
        adsDataEntity.adsData = adsData;

        await this.adsDataRepository
          .upsert(adsDataEntity, ['date', 'containerId', 'adsRange'])
          .catch((error) => console.error(error));
      }
    } catch (error) {
      console.error(
        `[AdsDataService][genderRangeAssignment] error when create new ${SHEET_RANGE.GENDER} ads data for ${adsContainer.adsName}`,
        error,
      );
      throw error;
    } finally {
      console.log(
        `[AdsDataService][genderRangeAssignment] success save data ${SHEET_RANGE.GENDER} for ${adsContainer.adsName}`,
      );
    }
  }

  async deviceDataAssignment(
    deviceSheetData: any[],
    adsContainer: AdsContainerEntity,
    adsDataEntity: AdsDataEntity,
  ): Promise<void> {
    try {
      const [, ...restOfDeviceData] = deviceSheetData;
      for (const deviceData of restOfDeviceData) {
        const adsData: AdsData = await this.youtubeAdapter.youtubeDataAdapter(
          deviceData,
          SHEET_RANGE.DEVICE,
        );
        adsDataEntity.date = deviceData[0];
        adsDataEntity.adsRange = SHEET_RANGE.DEVICE + '.' + deviceData[1];
        adsDataEntity.adsData = adsData;

        await this.adsDataRepository
          .upsert(adsDataEntity, ['date', 'containerId', 'adsRange'])
          .catch((error) => console.error(error));
      }
    } catch (error) {
      console.error(
        `[AdsDataService][deviceDataAssignment] error when create new ${SHEET_RANGE.DEVICE} ads data for ${adsContainer.adsName}`,
        error,
      );
      throw error;
    } finally {
      console.log(
        `[AdsDataService][deviceDataAssignment] success save data ${SHEET_RANGE.DEVICE} for ${adsContainer.adsName}`,
      );
    }
  }

  async ageDataAssignment(
    ageSheetData: any[],
    adsContainer: AdsContainerEntity,
    adsDataEntity: AdsDataEntity,
  ): Promise<void> {
    try {
      const [, ...restOfAgeData] = ageSheetData;
      for (const ageData of restOfAgeData) {
        const adsData: AdsData = await this.youtubeAdapter.youtubeDataAdapter(
          ageData,
          SHEET_RANGE.AGE,
        );
        adsDataEntity.date = ageData[0];
        adsDataEntity.adsRange = SHEET_RANGE.AGE + '.' + ageData[1];
        adsDataEntity.adsData = adsData;

        await this.adsDataRepository
          .upsert(adsDataEntity, ['date', 'containerId', 'adsRange'])
          .catch((error) => console.error(error));
      }
    } catch (error) {
      console.error(
        `[AdsDataService][ageDateAssignment] error when create new ${SHEET_RANGE.AGE} ads data for ${adsContainer.adsName}`,
        error,
      );
      throw error;
    } finally {
      console.log(
        `[AdsDataService][ageDateAssignment] success save data ${SHEET_RANGE.AGE} for ${adsContainer.adsName}`,
      );
    }
  }

  async locationDataAssignment(
    locationSheetData: any[],
    adsContainer: AdsContainerEntity,
    adsDataEntity: AdsDataEntity,
  ): Promise<void> {
    try {
      const [, ...restOfLocationData] = locationSheetData;
      for (const locationData of restOfLocationData) {
        const adsData: AdsData = await this.youtubeAdapter.youtubeDataAdapter(
          locationData,
          SHEET_RANGE.LOCATION,
        );
        adsDataEntity.date = locationData[0];
        adsDataEntity.adsRange =
          SHEET_RANGE.LOCATION + '.' + locationData[1].replace(/ /g, '_');
        adsDataEntity.adsData = adsData;

        await this.adsDataRepository
          .upsert(adsDataEntity, ['date', 'containerId', 'adsRange'])
          .catch((error) => console.error(error));
      }
    } catch (error) {
      console.error(
        `[AdsDataService][ageDateAssignment] error when create new ${SHEET_RANGE.LOCATION} ads data for ${adsContainer.adsName}`,
        error,
      );
      throw error;
    } finally {
      console.log(
        `[AdsDataService][ageDateAssignment] success save data ${SHEET_RANGE.LOCATION} for ${adsContainer.adsName}`,
      );
    }
  }

  async getDataByContainerId(adsContainer: AdsContainerEntity): Promise<void> {
    try {
      console.log(adsContainer);
    } catch (error) {
      console.error(
        `[AdsDataService][ageDateAssignment] error when get ads data by container id for ${adsContainer.id}`,
        error,
      );
      throw error;
    }
  }
}
