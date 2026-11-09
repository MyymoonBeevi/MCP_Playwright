import { test, expect } from '@playwright/test';

test.describe('2. getByText() Locators Practice', () => {

  test('Locate elements by direct text content', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/p/playwrightpractice.html');

    // Exact text match
    const heading = page.getByText('Automation Testing Practice', { exact: true });
    await expect(heading).toBeVisible();

    // Substring text match
    const subtitle = page.getByText('Selenium, Cypress & Playwright');
    await expect(subtitle).toBeVisible();

    // Verify section headings using getByText
    await expect(page.getByText('1. getByRole() Locators')).toBeVisible();
    await expect(page.getByText('2. getByText() Locators')).toBeVisible();
  });

});
