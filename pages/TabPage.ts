import { Page, BrowserContext, expect } from '@playwright/test';

export class TabPage {
  constructor(private page: Page, private context: BrowserContext) {}

  async navigate() {
    await this.page.goto('https://the-internet.herokuapp.com/windows');
  }

  async openAndVerifyNewTab() {
    const pagePromise = this.context.waitForEvent('page');
    await this.page.getByRole('link', { name: 'Click Here' }).click();
    const newPage = await pagePromise;

    await newPage.waitForLoadState();
    await expect(newPage).toHaveURL('https://the-internet.herokuapp.com/windows/new');
    await expect(newPage.getByRole('heading')).toHaveText('New Window');
    return newPage;
  }
}
