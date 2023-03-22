import { GlobalAdsData } from '../dto/adsData.dto';

export class RegularDataAdapter {
  public sheetToInterface(sheetData: any[]): any {
    const globalAdsData: GlobalAdsData = new GlobalAdsData();
    globalAdsData.date = sheetData[0];
    globalAdsData.impression = parseInt(sheetData[1]);
    globalAdsData.clicks = parseInt(sheetData[2]);

    return globalAdsData;
  }
}
