import { Page, expect } from '@playwright/test';

export class FramePage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto('https://the-internet.herokuapp.com/iframe');
  }

  async enterTextInsideFrame(text: string) {
    const iframe = this.page.frameLocator('#mce_0_ifr');
    const editorBody = iframe.locator('#tinymce');

    await editorBody.clear();
    await editorBody.fill(text);
    await expect(editorBody).toHaveText(text);
  }
}
