import { test, expect } from '@playwright/test';

test.describe('Automation Practice - Keyboard Actions', () => {

  test.beforeEach(async ({ page }) => {
    // Navigate to the practice page
    await page.goto('https://testautomationpractice.blogspot.com/');
  });

  test('1. Standard Typing and Enter Key Submission', async ({ page }) => {
    // Locate the Wikipedia Search input field
    const searchInput = page.locator('#Wikipedia1_wikipedia-search-input');
    
    // Type query using keyboard simulation
    await searchInput.click();
    await searchInput.pressSequentially('Playwright Automation', { delay: 100 });

    
    // Press 'Enter' or click the search button
    await searchInput.press('Enter');

    // Verify search results container appears
    const searchResults = page.locator('#Wikipedia1_wikipedia-search-results');
    await expect(searchResults).toBeVisible();
  });

  test('2. Form Navigation using Tab Key', async ({ page }) => {
    // Scroll down to the Data Entry Form section
    const nameField = page.locator('#name');
    await nameField.scrollIntoViewIfNeeded();

    // Click name field and use Tab to navigate through inputs sequentially
    await nameField.fill('John Doe');
    
    // Press Tab to move to Email field
    await page.keyboard.press('Tab');
    await page.keyboard.type('johndoe@example.com');

    // Press Tab to move to Phone field
    await page.keyboard.press('Tab');
    await page.keyboard.type('1234567890');

    // Assert values filled correctly via keyboard navigation
    await expect(page.locator('#email')).toHaveValue('johndoe@example.com');
    await expect(page.locator('#phone')).toHaveValue('1234567890');
  });

  test('3. Keyboard Shortcuts (Select All, Copy, and Paste)', async ({ page }) => {
  const nameField = page.locator('#name');
  await nameField.scrollIntoViewIfNeeded();
  await nameField.fill('Original Text');

  await nameField.click();

  // Detect OS: Use 'Meta' for macOS, 'Control' for Windows/Linux
  const modifier = process.platform === 'darwin' ? 'Meta' : 'Control';

  // Select All -> Copy
  await page.keyboard.press(`${modifier}+A`);
  await page.keyboard.press(`${modifier}+C`);

  // Move to Email field and Paste
  const emailField = page.locator('#email');
  await emailField.click();
  await page.keyboard.press(`${modifier}+V`);

  // Assert expected copied value
  await expect(emailField).toHaveValue('Original Text');
});

});