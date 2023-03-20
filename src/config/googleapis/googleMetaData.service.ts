import { google } from 'googleapis';
import { GlobalResponse } from 'src/helper/common/globalResponse';

export class GoogleMetadataService {
  response = new GlobalResponse();

  async sheetsConnection() {
    try {
      const googleAuth = new google.auth.GoogleAuth({
        keyFile: 'GoogleCredentials.json',
        scopes: 'https://www.googleapis.com/auth/spreadsheets',
      });
      const client = await googleAuth.getClient();
      console.log(client);
    } catch (error) {
      console.error(
        `[GoogleMetadataService][sheetsConnection] error when connect to google apis`,
        error,
      );
      return this.response.error(error);
    }
  }
}
