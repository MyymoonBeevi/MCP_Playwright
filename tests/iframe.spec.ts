import { test, expect } from '@playwright/test';

test.describe('VinothQA Academy - Standalone iFrame Tests', () => {

  test('1. Interact with Registration Form inside iFrame', async ({ page }) => {
    await page.goto('https://vinothqaacademy.com/iframe/');

    // Target the specific Registration Form frame using its src attribute
    const regFrame = page.frameLocator('iframe[name="employeetable"]');

    // Fill the First Name field inside the frame
    const firstNameInput = regFrame.locator("//input[@id='nameInput']");
    await firstNameInput.waitFor({ state: 'visible', timeout: 10000 });
    await firstNameInput.fill('John');

    await expect(firstNameInput).toHaveValue('John');
  });

  test('2. Handle Form Fields Across Multiple iFrames', async ({ page }) => {
    await page.goto('https://vinothqaacademy.com/iframe/');

    // Target the frame containing the Registration Form
  const regFrame = page.frameLocator('iframe[name="registeruser"]');

    // Fill the Last Name field inside the frame
    const lastNameInput = regFrame.locator("//input[@id='vfb-7']");

    await lastNameInput.waitFor({ state: 'visible', timeout: 10000 });
    await lastNameInput.fill('Doe');

    await expect(lastNameInput).toHaveValue('Doe');
  });

});