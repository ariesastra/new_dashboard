export enum SHEET_RANGE {
  REGULAR = 'REGULAR',
  GENDER = 'GENDER',
  DEVICE = 'DEVICE',
  AGE = 'AGE',
  LOCATION = 'LOCATION',
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
  cotainerId: string;
  adsRange: string;
  adsData: unknown;
}

export class AdsData {
  impression: number;
  clicks: number;
  gender: GenderData;
  device: DeviceData;
  ageRange: string;
  location: string;
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
