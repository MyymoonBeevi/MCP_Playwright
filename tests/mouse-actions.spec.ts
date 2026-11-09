import { test, expect } from '@playwright/test';

test.describe('Automation Practice - Mouse Actions', () => {

  test.beforeEach(async ({ page }) => {
    // Navigate to the test automation practice page
    await page.goto('https://testautomationpractice.blogspot.com/');
  });

  test('1. Mouse Hover Action', async ({ page }) => {
    // Locate the "Point Me" hover button
    const hoverBtn = page.locator("//button[text()='Point Me']");
    
    // Perform hover action
    await hoverBtn.hover();

    // Click on the revealed dropdown option (e.g., "Mobiles")
    const mobileOption = page.locator("//a[text()='Mobiles']");
    await expect(mobileOption).toBeVisible();
    await mobileOption.click();
  });

  test('2. Double Click Action', async ({ page }) => {
    // Fill Field 1 with sample text
    const field1 = page.locator("//input[@id='field1']");
    await field1.clear();
    await field1.fill('Hello Playwright MCP');

    // Locate the "Copy Text" button that requires a double click
    const copyBtn = page.locator("//button[text()='Copy Text']");
    await copyBtn.dblclick();

    // Verify that Field 2 receives the copied text
    const field2 = page.locator('#field2');
    await expect(field2).toHaveValue('Hello Playwright MCP');
  });

  test('3. Drag and Drop Action', async ({ page }) => {
    // Locate source element (Drag me to my target) and target box
    const firstDrag = page.locator("//p[text()='Drag me to my target']");
    const target = page.locator('#droppable');

    // Perform drag and drop
    await firstDrag.dragTo(target);

    // Verify target text changes to "Dropped!"
    await expect(target.locator('p')).toHaveText('Dropped!');
  });



});