import { Page, expect } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';

export class DownloadPage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto('https://the-internet.herokuapp.com/download');
  }

  async downloadFirstFile(): Promise<string> {
    const downloadPromise = this.page.waitForEvent('download');
    await this.page.locator('a[href*="download/"]').first().click();
    const download = await downloadPromise;

    const targetDir = path.join(__dirname, '../downloads');
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    const downloadPath = path.join(targetDir, download.suggestedFilename());
    await download.saveAs(downloadPath);

    expect(fs.existsSync(downloadPath)).toBeTruthy();
    return downloadPath;
  }
}
