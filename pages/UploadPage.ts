import { Page, expect } from '@playwright/test';

export class UploadPage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto('https://the-internet.herokuapp.com/upload');
  }

  async uploadFile(filePath: string, fileName: string) {
    await this.page.locator('#file-upload').setInputFiles(filePath);
    await this.page.locator('#file-submit').click();
    await expect(this.page.locator('#uploaded-files')).toContainText(fileName);
  }
}
