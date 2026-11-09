import { Page, expect } from '@playwright/test';

export class AlertPage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto('https://the-internet.herokuapp.com/javascript_alerts');
  }

  async handleSimpleAlert() {
    this.page.once('dialog', async (dialog) => {
      expect(dialog.type()).toBe('alert');
      expect(dialog.message()).toBe('I am a JS Alert');
      await dialog.accept();
    });
    await this.page.getByRole('button', { name: 'Click for JS Alert' }).click();
    await expect(this.page.locator('#result')).toHaveText('You successfully clicked an alert');
  }

  async handleConfirmAlert(accept: boolean) {
    this.page.once('dialog', async (dialog) => {
      expect(dialog.type()).toBe('confirm');
      accept ? await dialog.accept() : await dialog.dismiss();
    });
    await this.page.getByRole('button', { name: 'Click for JS Confirm' }).click();
    await expect(this.page.locator('#result')).toHaveText(
      accept ? 'You clicked: Ok' : 'You clicked: Cancel'
    );
  }

  async handlePromptAlert(inputText: string) {
    this.page.once('dialog', async (dialog) => {
      expect(dialog.type()).toBe('prompt');
      await dialog.accept(inputText);
    });
    await this.page.getByRole('button', { name: 'Click for JS Prompt' }).click();
    await expect(this.page.locator('#result')).toHaveText(`You entered: ${inputText}`);
  }
}
