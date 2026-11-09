import { Page, expect } from '@playwright/test';
import * as path from 'path';
import *  as fs from 'fs';

export class ScreenshotPage {
  private outputDir = path.join(__dirname, '../screenshots');

  constructor(private page: Page) {
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }
  }

  async navigate() {
    await this.page.goto('https://the-internet.herokuapp.com/');
  }

  async captureFullPage(fileName: string) {
    const filePath = path.join(this.outputDir, fileName);
    await this.page.screenshot({ path: filePath, fullPage: true });
    expect(fs.existsSync(filePath)).toBeTruthy();
  }

  async captureElement(fileName: string) {
    const filePath = path.join(this.outputDir, fileName);
    const heading = this.page.getByRole('heading', { name: 'Welcome to the-internet' });
    await heading.screenshot({ path: filePath });
    expect(fs.existsSync(filePath)).toBeTruthy();
  }
}
