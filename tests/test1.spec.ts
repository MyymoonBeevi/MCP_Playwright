import { test, expect } from '@playwright/test';

test('Module 5: Dynamic Dropdown & Web-First Assertions', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  // Page Title Assertion
  await expect(page).toHaveTitle(/OrangeHRM/);

  // Login Flow
  await page.getByPlaceholder('Username').fill('Admin');
  await page.getByPlaceholder('Password').fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();

  // Element Visibility & Text Assertions
  const dashboardHeading = page.getByRole('heading', { name: 'Dashboard' });
  await expect(dashboardHeading).toBeVisible();
  await expect(dashboardHeading).toHaveText('Dashboard');

  // Dynamic Dropdown Interaction (Auto-Wait in action)
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers');
  await page.locator("//div[text()='-- Select --']").first().click(); // Open User Role dropdown
  
  const option = page.getByRole('option', { name: 'ESS' });
  await expect(option).toBeVisible(); // Auto-waits for dynamic list rendering
  await option.click();
});