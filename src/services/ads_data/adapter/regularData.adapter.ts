import { GlobalAdsData, ReguralAdsData } from '../dto/adsData.dto';
import { YoutubeAdsData } from '../dto/youtubeAds.dto';

export class RegularDataAdapter {
  public regularDataInterface(globalAdsData, regularAdsData, platformAdsData) {
    console.log(globalAdsData, regularAdsData, platformAdsData);
  }

  public youtubeInterface(sheetData: any[]) {
    /**
     * NEXT DEVELOPMENT
      jadi nanti next nya, ga usah di pisah pisah per dto gini, langsung aja
      di adapter assign data yang dibutuhin untuk tiap interface, dan langsung 
      return hasilnya.
     */
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

    this.regularDataInterface(globalAdsData, regularAdsData, youtubeAdsData);
  }
}
