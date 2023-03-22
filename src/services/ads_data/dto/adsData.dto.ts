export const sheetsRange = ['regular', 'gender', 'device', 'age', 'location'];

export class AdsDataRequest {
  containerId: string;
}

export enum GenderData {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export enum DeviceData {
  DESKTOP = 'DESKTOP',
  MOBILE = 'MOBILE',
  TABLET = 'TABLET',
  CONNECTED_TV = 'CONNECTED_TV',
}

export class GlobalAdsData {
  date: Date;
  impression: number;
  clicks: number;
  gender: GenderData;
  device: DeviceData;
  age_range: string;
  regiion: string;
}
