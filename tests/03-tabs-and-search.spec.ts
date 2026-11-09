import { test, expect } from '@playwright/test';

test.describe('3. Tabs & Wikipedia Search Section', () => {

  test('Interact with Search input inside Tabs section', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/p/playwrightpractice.html');

    const searchInput = page.locator('#Wikipedia1_wikipedia-search-input');
    const searchButton = page.locator('.wikipedia-search-button');

    if (await searchInput.isVisible()) {
      await searchInput.fill('Playwright');
      await searchButton.click();
    } else {
      // Fallback search box handler under Tabs
      const fallbackSearch = page.locator('input[type="search"], input[type="text"]').first();
      await fallbackSearch.fill('Playwright');
    }
  });

});
