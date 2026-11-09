import { test, expect } from '@playwright/test';

test('Login Functionality Verification', async ({ page }) => {
  // 1. Navigate to OrangeHRM login page
  await page.goto('https://opensource-demo.orangehrmlive.com/');

  // 2. Enter 'Admin' into Username field
  await page.locator('input[placeholder="Username"]').fill('Admin');

  // 3. Enter 'admin123' into Password field
  await page.locator('input[placeholder="Password"]').fill('admin123');

  // 4. Click the Login button
  await page.locator('button[type="submit"]').click();

  // 5. Validate navigation to Dashboard page
  await expect(page).toHaveURL(/dashboard/);

  // Optional: verify Dashboard header is visible
  await expect(page.locator('h6')).toHaveText('Dashboard');

 

  // const option = page.getByRole('option', { name: 'Admin' });
  // await expect(option).toBeVisible(); // Auto-waits for dynamic list rendering
  // await option.click();

});
