import { google } from 'googleapis';
import { GlobalResponse } from 'src/helper/common/globalResponse';

export class GoogleMetadataService {
  response = new GlobalResponse();

  async sheetsConnection(range, spreadsheetsId) {
    try {
      const googleAuth = new google.auth.GoogleAuth({
        keyFile: './src/config/googleapis/GoogleCredentials.json',
        scopes: 'https://www.googleapis.com/auth/spreadsheets',
      });
      const client = await googleAuth.getClient();
      const googleSheets = await google.sheets({ version: 'v4', auth: client });
      const rowData = await googleSheets.spreadsheets.values.get({
        auth: googleAuth,
        range: range,
        spreadsheetId: spreadsheetsId,
      });

      return rowData.data.values;
    } catch (error) {
      console.error(
        `[GoogleMetadataService][sheetsConnection] error when connect to google apis`,
        error,
      );
      return this.response.error(error);
    }
  }
}
