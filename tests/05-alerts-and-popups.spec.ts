import { test, expect } from '@playwright/test';

test.describe('5. Alerts & Popups Handling', () => {

  test('Handle Simple Alert dialog', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/p/playwrightpractice.html');

    page.once('dialog', async (dialog) => {
      expect(dialog.type()).toBe('alert');
      await dialog.accept();
    });

    const simpleAlertBtn = page.getByRole('button', { name: 'Simple Alert' });
    if (await simpleAlertBtn.isVisible()) {
      await simpleAlertBtn.click();
    }
  });

  test('Handle Confirmation Alert dialog', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/p/playwrightpractice.html');

    page.once('dialog', async (dialog) => {
      expect(dialog.type()).toBe('confirm');
      await dialog.accept();
    });

    const confirmAlertBtn = page.getByRole('button', { name: 'Confirmation Alert' });
    if (await confirmAlertBtn.isVisible()) {
      await confirmAlertBtn.click();
    }
  });

  test('Handle Prompt Alert dialog with text entry', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/p/playwrightpractice.html');

    page.once('dialog', async (dialog) => {
      expect(dialog.type()).toBe('prompt');
      await dialog.accept('Playwright Tester');
    });

    const promptAlertBtn = page.getByRole('button', { name: 'Prompt Alert' });
    if (await promptAlertBtn.isVisible()) {
      await promptAlertBtn.click();
    }
  });

});
