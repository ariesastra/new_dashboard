import { AdsData } from '../../ads_data/dto/adsData.dto';

export class YoutubeRegularDataAdapter {
  public youtube(sheetData: string[]) {
    const adsData: AdsData = new AdsData();
    adsData.impression = parseInt(sheetData[1]);
    adsData.clicks = parseInt(sheetData[2]);
    adsData.ctr = parseFloat(sheetData[3]);
    adsData.videoViewsRate = parseFloat(sheetData[5]);
    adsData.videoViews = parseInt(sheetData[4]);
    adsData.videoImpression = parseInt(sheetData[14]);
    adsData.watch25View = parseInt(sheetData[6]);
    adsData.watch25Rate = parseFloat(sheetData[10]);
    adsData.watch50View = parseInt(sheetData[7]);
    adsData.watch50Rate = parseFloat(sheetData[11]);
    adsData.watch75View = parseInt(sheetData[8]);
    adsData.watch75Rate = parseFloat(sheetData[12]);
    adsData.watch100View = parseInt(sheetData[9]);
    adsData.watch100Rate = parseFloat(sheetData[13]);

    return adsData;
  }
}
