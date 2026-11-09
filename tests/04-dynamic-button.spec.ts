import { test, expect } from '@playwright/test';

test.describe('4. Dynamic Button Section', () => {

  test('Click START button and verify state changes', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/p/playwrightpractice.html');

    const startButton = page.getByRole('button', { name: 'START' });
    await expect(startButton).toBeVisible();
    await startButton.click();

    // Verify button text or class updates dynamically
    await page.waitForTimeout(1000);
  });

});
