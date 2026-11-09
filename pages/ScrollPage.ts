import { Page, expect } from '@playwright/test';

export class ScrollPage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto('https://the-internet.herokuapp.com/infinite_scroll');
  }

  async scrollElementIntoView() {
    const footer = this.page.locator('#page-footer');
    await footer.scrollIntoViewIfNeeded();
    await expect(footer).toBeVisible();
  }

  async scrollByMouseWheel(deltaY: number) {
    await this.page.mouse.wheel(0, deltaY);
  }

  async scrollToPageBottom() {
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  }
}
