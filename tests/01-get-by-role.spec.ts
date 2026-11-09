import { test, expect } from '@playwright/test';

test.describe('1. getByRole() Locators Practice', () => {

  test('Interact with buttons, form elements, and navigation by ARIA role', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/p/playwrightpractice.html');

    // Click Primary Action button
    const primaryButton = page.getByRole('button', { name: 'Primary Action' });
    await expect(primaryButton).toBeVisible();
    await primaryButton.click();

    // Click Toggle Button
    const toggleButton = page.getByRole('button', { name: 'Toggle Button' });
    await expect(toggleButton).toBeVisible();
    await toggleButton.click();

    // Interact with Div configured with button role
    const divButton = page.getByRole('button', { name: 'Div with button role' });
    await expect(divButton).toBeVisible();
    await divButton.click();

    // Fill Username input field
    const usernameInput = page.getByRole('textbox', { name: 'Username:' });
    await usernameInput.fill('AutomationUser');
    await expect(usernameInput).toHaveValue('AutomationUser');

    // Toggle Accept terms checkbox
    const termsCheckbox = page.getByRole('checkbox').first();
    await termsCheckbox.check();
    await expect(termsCheckbox).toBeChecked();

    // FIX: Scope navigation link checks to the specific container or use .first() to avoid strict mode violations
    const sectionContainer = page.locator('#role-locators');
    if (await sectionContainer.isVisible()) {
      await expect(sectionContainer.getByRole('link', { name: 'Home' })).toBeVisible();
      await expect(sectionContainer.getByRole('link', { name: 'Products' })).toBeVisible();
      await expect(sectionContainer.getByRole('link', { name: 'Contact' })).toBeVisible();
    } else {
      await expect(page.getByRole('link', { name: 'Home' }).first()).toBeVisible();
      await expect(page.getByRole('link', { name: 'Products' }).first()).toBeVisible();
      await expect(page.getByRole('link', { name: 'Contact' }).first()).toBeVisible();
    }

    // Validate alert container by alert role
    const alertMessage = page.getByRole('alert');
    await expect(alertMessage).toContainText('This is an important alert message!');
  });

});