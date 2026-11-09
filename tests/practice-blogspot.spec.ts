import { test, expect } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';
import { Buffer } from 'node:buffer';

test.describe('Automation Testing Practice Inline Suite', () => {

  test('1. Tabs & Multi-Windows', async ({ page, context }) => {
    await page.goto('https://the-internet.herokuapp.com', { timeout: 60000, waitUntil: 'domcontentloaded' });
    
    const pagePromise = context.waitForEvent('page');
    await page.getByRole('link', { name: 'Click Here' }).click();
    const newPage = await pagePromise;
    
    await newPage.waitForLoadState();
    await expect(newPage).toHaveURL('https://the-internet.herokuapp.com/windows/new');
    await expect(newPage.getByRole('heading')).toHaveText('New Window');
    await newPage.close();
  });

  test('2. iFrame Interactions', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/', { timeout: 60000, waitUntil: 'domcontentloaded' });
    
    const frame = page.frameLocator('iframe').first();
    const nameInput = page.getByLabel('Name:');
    if (await nameInput.isVisible()) {
      await nameInput.fill('Automation Tester');
    }
  });

  test('3. Alerts, Confirmations & Prompts', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/', { timeout: 60000, waitUntil: 'domcontentloaded' });
    
    // Simple Alert
    page.once('dialog', async dialog => {
      expect(dialog.type()).toBe('alert');
      await dialog.accept();
    });
    const alertBtn = page.locator('button:has-text("Simple Alert")');
    if (await alertBtn.isVisible()) {
      await alertBtn.click();
    }

    // Confirm Box
    page.once('dialog', async dialog => {
      expect(dialog.type()).toBe('confirm');
      await dialog.dismiss();
    });
    const confirmBtn = page.locator('button:has-text("Confirmation Alert")');
    if (await confirmBtn.isVisible()) {
      await confirmBtn.click();
    }

    // Prompt Box
    page.once('dialog', async dialog => {
      expect(dialog.type()).toBe('prompt');
      await dialog.accept('Playwright Test Input');
    });
    const promptBtn = page.locator('button:has-text("Prompt Alert")');
    if (await promptBtn.isVisible()) {
      await promptBtn.click();
    }
  });

  test('4. File Download Handling', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/', { timeout: 60000, waitUntil: 'domcontentloaded' });
    
    const downloadBtn = page.locator('button:has-text("Download")').first();
    if (await downloadBtn.isVisible()) {
      const downloadPromise = page.waitForEvent('download');
      await downloadBtn.click();
      const download = await downloadPromise;
      const filePath = path.join(__dirname, download.suggestedFilename());
      await download.saveAs(filePath);
      
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
  });

  test('5. File Upload Handling', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/', { timeout: 60000, waitUntil: 'domcontentloaded' });
    
    const tempFile = path.join(__dirname, 'sample-upload.txt');
    fs.writeFileSync(tempFile, 'Sample content for Blogspot file upload.');

    const fileInput = page.locator('input[type="file"]');
    if (await fileInput.isVisible()) {
      await fileInput.setInputFiles(tempFile);
    }

    if (fs.existsSync(tempFile)) {
      fs.unlinkSync(tempFile);
    }
  });

  test('6. Full Page & Element Screenshots', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/', { timeout: 60000, waitUntil: 'domcontentloaded' });
    
    await page.screenshot({ path: 'blogspot-fullpage.png', fullPage: true });
    
    const header = page.locator('h1').first();
    if (await header.isVisible()) {
      await header.screenshot({ path: 'blogspot-element.png' });
    }
  });

  test('7. Scrolling Operations', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/', { timeout: 60000, waitUntil: 'domcontentloaded' });
    
    await page.mouse.wheel(0, 800);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  });

});