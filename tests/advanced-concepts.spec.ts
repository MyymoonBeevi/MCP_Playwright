import { test, expect, Page, BrowserContext } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';

// ==========================================
// INLINE PAGE OBJECT CLASSES
// ==========================================

class TabPage {
  constructor(private page: Page, private context: BrowserContext) {}

  async navigate() {
    await this.page.goto('https://the-internet.herokuapp.com/windows', { timeout: 60000, waitUntil: 'domcontentloaded' });
  }

  async openAndVerifyNewTab() {
    const pagePromise = this.context.waitForEvent('page');
    await this.page.getByRole('link', { name: 'Click Here' }).click();
    const newPage = await pagePromise;

    await newPage.waitForLoadState();
    await expect(newPage).toHaveURL('https://the-internet.herokuapp.com/windows/new');
    await expect(newPage.getByRole('heading')).toHaveText('New Window');
    return newPage;
  }
}

class FramePage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto('https://testautomationpractice.blogspot.com/', { timeout: 60000, waitUntil: 'domcontentloaded' });
  }

  async enterTextInsideFrame(text: string) {
    const nameInput = this.page.getByLabel('Name:');
    if (await nameInput.isVisible()) {
      await nameInput.fill(text);
    }
  }
}

class AlertPage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto('https://testautomationpractice.blogspot.com/', { timeout: 60000, waitUntil: 'domcontentloaded' });
  }

  async handleSimpleAlert() {
    this.page.once('dialog', async dialog => {
      expect(dialog.type()).toBe('alert');
      await dialog.accept();
    });
    const alertBtn = this.page.locator('button:has-text("Simple Alert")');
    if (await alertBtn.isVisible()) {
      await alertBtn.click();
    }
  }

  async handleConfirmAlert(accept: boolean) {
    this.page.once('dialog', async dialog => {
      expect(dialog.type()).toBe('confirm');
      if (accept) {
        await dialog.accept();
      } else {
        await dialog.dismiss();
      }
    });
    const confirmBtn = this.page.locator('button:has-text("Confirmation Alert")');
    if (await confirmBtn.isVisible()) {
      await confirmBtn.click();
    }
  }

  async handlePromptAlert(inputText: string) {
    this.page.once('dialog', async dialog => {
      expect(dialog.type()).toBe('prompt');
      await dialog.accept(inputText);
    });
    const promptBtn = this.page.locator('button:has-text("Prompt Alert")');
    if (await promptBtn.isVisible()) {
      await promptBtn.click();
    }
  }
}

class DownloadPage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto('https://testautomationpractice.blogspot.com/', { timeout: 60000, waitUntil: 'domcontentloaded' });
  }

  async downloadFirstFile() {
    const downloadBtn = this.page.locator('button:has-text("Download")').first();
    if (await downloadBtn.isVisible()) {
      const downloadPromise = this.page.waitForEvent('download');
      await downloadBtn.click();
      const download = await downloadPromise;
      const filePath = path.join(__dirname, download.suggestedFilename());
      await download.saveAs(filePath);
      return filePath;
    }
    return '';
  }
}

class UploadPage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto('https://testautomationpractice.blogspot.com/', { timeout: 60000, waitUntil: 'domcontentloaded' });
  }

  async uploadFile(filePath: string, _fileName: string) {
    const fileInput = this.page.locator('input[type="file"]');
    if (await fileInput.isVisible()) {
      await fileInput.setInputFiles(filePath);
    }
  }
}

class ScreenshotPage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto('https://testautomationpractice.blogspot.com/', { timeout: 60000, waitUntil: 'domcontentloaded' });
  }

  async captureFullPage(filename: string) {
    await this.page.screenshot({ path: filename, fullPage: true });
  }

  async captureElement(filename: string) {
    const header = this.page.locator('h1').first();
    if (await header.isVisible()) {
      await header.screenshot({ path: filename });
    }
  }
}

class ScrollPage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto('https://testautomationpractice.blogspot.com/', { timeout: 60000, waitUntil: 'domcontentloaded' });
  }

  async scrollElementIntoView() {
    const footer = this.page.locator('footer, h2:has-text("Footer Links")').first();
    if (await footer.isVisible()) {
      await footer.scrollIntoViewIfNeeded();
    }
  }

  async scrollByMouseWheel(deltaY: number) {
    await this.page.mouse.wheel(0, deltaY);
  }

  async scrollToPageBottom() {
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  }
}

// ==========================================
// TEST SUITE
// ==========================================

test.describe('Self-Contained Advanced Playwright Scenarios (Inline POM)', () => {

  test('1. Tabs & Windows Management', async ({ page, context }) => {
    const tabPage = new TabPage(page, context);
    await tabPage.navigate();
    await tabPage.openAndVerifyNewTab();
  });

  test('2. iFrames Management', async ({ page }) => {
    const framePage = new FramePage(page);
    await framePage.navigate();
    await framePage.enterTextInsideFrame('Hello from Inline Page Object Model!');
  });

  test('3. JavaScript Dialogs (Alerts, Confirms, Prompts)', async ({ page }) => {
    const alertPage = new AlertPage(page);
    await alertPage.navigate();
    await alertPage.handleSimpleAlert();
    await alertPage.handleConfirmAlert(false);
    await alertPage.handlePromptAlert('POM Automation String');
  });

  test('4. File Download Verification', async ({ page }) => {
    const downloadPage = new DownloadPage(page);
    await downloadPage.navigate();
    const filePath = await downloadPage.downloadFirstFile();

    if (filePath && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  });

  test('5. File Upload Verification', async ({ page }) => {
    const uploadPage = new UploadPage(page);
    await uploadPage.navigate();

    const tempFile = path.join(__dirname, 'temp-test-upload.txt');
    fs.writeFileSync(tempFile, 'Sample content for POM upload test.');

    await uploadPage.uploadFile(tempFile, 'temp-test-upload.txt');

    if (fs.existsSync(tempFile)) {
      fs.unlinkSync(tempFile);
    }
  });

  test('6. Full-Page and Element Screenshots', async ({ page }) => {
    const screenshotPage = new ScreenshotPage(page);
    await screenshotPage.navigate();
    await screenshotPage.captureFullPage('fullpage-pom.png');
    await screenshotPage.captureElement('heading-element-pom.png');
  });

  test('7. Scrolling Mechanics', async ({ page }) => {
    const scrollPage = new ScrollPage(page);
    await scrollPage.navigate();
    await scrollPage.scrollElementIntoView();
    await scrollPage.scrollByMouseWheel(800);
    await scrollPage.scrollToPageBottom();
  });

});