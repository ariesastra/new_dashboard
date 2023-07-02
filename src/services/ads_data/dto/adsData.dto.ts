export enum SHEET_RANGE {
  GENERAL = 'GENERAL',
  GENDER = 'GENDER',
  DEVICE = 'DEVICE',
  AGE = 'AGE',
  REGION = 'REGION',
}

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
  containerId: string;
  adsRange: string;
  adsData: unknown;
}

export class AdsData {
  impression: number;
  clicks: number;
  gender: GenderData;
  device: DeviceData;
  ageRange: string;
  region: string;
  reach: number;
  ctr: number;
  linkClicks: number;
  videoViewsRate: number;
  videoViews: number;
  videoImpression: number;
  watch25View: number;
  watch25Rate: number;
  watch50View: number;
  watch50Rate: number;
  watch75View: number;
  watch75Rate: number;
  watch100View: number;
  watch100Rate: number;
}

export class ObjectResponse {
  adsName: string;
  regular: string;
  gender: string;
  device: string;
  age: string;
  location: string;
}
