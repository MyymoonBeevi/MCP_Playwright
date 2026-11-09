import { test, expect } from '@playwright/test';

test('Login with Admin username in OrangeHRM', async ({ page }) => {
  // Navigate to OrangeHRM login page
  await page.goto('https://opensource-demo.orangehrmlive.com/');

  // Locate the username input using placeholder and fill with 'Admin'
  await page.locator('input[placeholder="Username"]').fill('Admin');

  // Optional: check that the value was entered correctly
  await expect(page.locator('input[placeholder="Username"]')).toHaveValue('Admin');
});
