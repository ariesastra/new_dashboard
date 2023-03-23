import { GlobalAdsData, ReguralAdsData } from '../dto/adsData.dto';
import { YoutubeAdsData } from '../dto/youtubeAds.dto';

export class RegularDataAdapter {
  public youtubeInterface(
    sheetData: any[],
  ): [GlobalAdsData, ReguralAdsData, YoutubeAdsData] {
    const globalAdsData: GlobalAdsData = new GlobalAdsData();
    globalAdsData.date = sheetData[0];

    const regularAdsData: ReguralAdsData = new ReguralAdsData();
    regularAdsData.impression = parseInt(sheetData[1]);
    regularAdsData.clicks = parseInt(sheetData[2]);

    const youtubeAdsData: YoutubeAdsData = new YoutubeAdsData();
    youtubeAdsData.ctr = parseFloat(sheetData[3]);
    youtubeAdsData.videoViewsRate = parseInt(sheetData[5]);
    youtubeAdsData.videoViews = parseInt(sheetData[4]);
    youtubeAdsData.videoImpression = parseInt(sheetData[14]);
    youtubeAdsData.watch25view = parseInt(sheetData[6]);
    youtubeAdsData.watch25rate = parseFloat(sheetData[10]);
    youtubeAdsData.watch50view = parseInt(sheetData[7]);
    youtubeAdsData.watch50rate = parseFloat(sheetData[11]);
    youtubeAdsData.watch75view = parseInt(sheetData[8]);
    youtubeAdsData.watch75rate = parseFloat(sheetData[12]);
    youtubeAdsData.watch100view = parseInt(sheetData[9]);
    youtubeAdsData.watch100rate = parseFloat(sheetData[13]);

    return [globalAdsData, regularAdsData, youtubeAdsData];
  }
}
