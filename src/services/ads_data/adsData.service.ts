import { Injectable } from '@nestjs/common';
import { GoogleMetadataService } from 'src/config/googleapis/googleMetaData.service';
import { GlobalResponse } from 'src/helper/common/globalResponse';
import { AdsContainerService } from '../ads_container/adsContainer.service';
import { AdsContainerEntity } from '../ads_container/database/entity/adsContainer.entity';
import { RegularDataAdapter } from './adapter/regularData.adapter';
import { YoutubeAdapter } from './adapter/youtubeData.adapter';
import { AdsDataRepository } from './database/adsData.repository';
import { AdsDataEntity } from './database/entity/adsData.entity';
import { AdsData, SHEET_RANGE } from './dto/adsData.dto';

@Injectable()
export class AdsDataService {
  response = new GlobalResponse();
  constructor(
    private readonly adsDataRepository: AdsDataRepository,
    private readonly googleService: GoogleMetadataService,
    private readonly regularDataAdapter: RegularDataAdapter,
    private readonly youtubeAdapter: YoutubeAdapter,
    private readonly adsContainerService: AdsContainerService,
  ) {}

  async createNewAdsData(containerEntity: AdsContainerEntity): Promise<any> {
    try {
      const sheetRange = Object.keys(SHEET_RANGE);
      for (const range of sheetRange) {
        const sheetData = await this.googleService.sheetsConnection(
          range.toLowerCase(),
          containerEntity.sheetId,
        );

        const adsDataEntity: AdsDataEntity = new AdsDataEntity();
        adsDataEntity.containerId = containerEntity.id;

        if (range === SHEET_RANGE.REGULAR) {
          await this.regularRangeAssignment(
            sheetData,
            containerEntity,
            adsDataEntity,
          );
        }
        if (range === SHEET_RANGE.GENDER) {
          await this.genderRangeAssignment(
            sheetData,
            containerEntity,
            adsDataEntity,
          );
        }
        if (range === SHEET_RANGE.DEVICE) {
          await this.deviceDataAssignment(
            sheetData,
            containerEntity,
            adsDataEntity,
          );
        }
        if (range === SHEET_RANGE.AGE) {
          await this.ageDataAssignment(
            sheetData,
            containerEntity,
            adsDataEntity,
          );
        }
        if (range === SHEET_RANGE.LOCATION) {
          await this.locationDataAssignment(
            sheetData,
            containerEntity,
            adsDataEntity,
          );
        }
      }
    } catch (error) {
      console.error(
        `[AdsDataService][createNewAdsData] error when create new ads data`,
        error,
      );
      throw error;
    }
  }

  async regularRangeAssignment(
    regularSheetData: any[],
    adsContainer: AdsContainerEntity,
    adsDataEntity: AdsDataEntity,
  ): Promise<any> {
    try {
      const [first, ...restOfRegularData] = regularSheetData;
      for (const regularData of restOfRegularData) {
        const adsData: AdsData = this.regularDataAdapter.youtube(regularData);
        adsDataEntity.date = regularData[0];
        adsDataEntity.adsRange = SHEET_RANGE.REGULAR;
        adsDataEntity.adsData = adsData;

        await this.adsDataRepository
          .upsert(adsDataEntity, ['date', 'containerId', 'adsRange'])
          .catch((error) => console.log(error));
      }
    } catch (error) {
      console.error(
        `[AdsDataService][createNewAdsData] error when create new ${SHEET_RANGE.REGULAR} ads data for ${adsContainer.adsName}`,
        error,
      );
      throw error;
    } finally {
      console.log(
        `[AdsDataService][regularRangeAssignment] success save data ${SHEET_RANGE.REGULAR} for ${adsContainer.adsName}`,
      );
    }
  }

  async genderRangeAssignment(
    genderSheetData: any[],
    adsContainer: AdsContainerEntity,
    adsDataEntity: AdsDataEntity,
  ): Promise<void> {
    try {
      const [first, ...restOfGenderData] = genderSheetData;
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
      const [first, ...restOfDeviceData] = deviceSheetData;
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
      const [first, ...restOfAgeData] = ageSheetData;
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
      const [first, ...restOfLocationData] = locationSheetData;
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
}
