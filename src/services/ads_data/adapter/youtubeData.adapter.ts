import { AdsData, SHEET_RANGE } from '../dto/adsData.dto';

export class YoutubeAdapter {
  public youtubeDataAdapter(sheetData: any[], range: string) {
    const adsData: AdsData = new AdsData();

    if (range === SHEET_RANGE.DEVICE) adsData.device = sheetData[1];
    if (range === SHEET_RANGE.GENDER) adsData.gender = sheetData[1];
    if (range === SHEET_RANGE.AGE) adsData.ageRange = sheetData[1];
    if (range === SHEET_RANGE.LOCATION) adsData.location = sheetData[1];

    adsData.impression = parseInt(sheetData[2]);
    adsData.clicks = parseInt(sheetData[3]);
    adsData.ctr = parseInt(sheetData[4]);
    adsData.videoViews = parseInt(sheetData[5]);

    if (range !== SHEET_RANGE.LOCATION) {
      adsData.videoViewsRate = sheetData[6] ? parseFloat(sheetData[6]) : 0;
      adsData.watch25View = sheetData[7] ? parseInt(sheetData[7]) : 0;
      adsData.watch75View = sheetData[8] ? parseInt(sheetData[8]) : 0;
      adsData.watch75View = sheetData[9] ? parseInt(sheetData[9]) : 0;
      adsData.watch100View = sheetData[10] ? parseInt(sheetData[10]) : 0;
      adsData.watch25Rate = sheetData[11] ? parseFloat(sheetData[11]) : 0;
      adsData.watch50Rate = sheetData[12] ? parseFloat(sheetData[12]) : 0;
      adsData.watch75Rate = sheetData[13] ? parseFloat(sheetData[13]) : 0;
      adsData.watch100Rate = sheetData[14] ? parseFloat(sheetData[14]) : 0;
      adsData.videoImpression = sheetData[15] ? parseInt(sheetData[15]) : 0;
    }

    return adsData;
  }
}
