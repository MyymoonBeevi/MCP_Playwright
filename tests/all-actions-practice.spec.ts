import { expect, test } from '@playwright/test';

const practiceUrl = 'https://testautomationpractice.blogspot.com/p/playwrightpractice.html';

test.describe('Playwright practice page interactions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(practiceUrl);
  });

  test('uses role, text, label, and placeholder locators', async ({ page }) => {
    const roleSection = page.locator('#role-locators');
    await expect(roleSection.getByRole('button', { name: 'Primary Action' })).toBeVisible();
    await roleSection.getByRole('button', { name: 'Primary Action' }).click();
    await roleSection.getByRole('button', { name: 'Toggle Button' }).click();
    await roleSection.getByRole('button', { name: 'Div with button role' }).click();
    await roleSection.getByRole('textbox', { name: 'Username:' }).fill('test-user');
    await roleSection.getByRole('checkbox', { name: 'Accept terms' }).check();
    await expect(roleSection.getByRole('checkbox', { name: 'Accept terms' })).toBeChecked();
    await expect(roleSection.getByRole('alert')).toContainText('important alert message');

    const roleNavigation = roleSection.getByRole('navigation');
    await expect(roleNavigation.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '#');
    await expect(roleNavigation.getByRole('link', { name: 'Products' })).toHaveAttribute('href', '#');

    const textSection = page.locator('#text-locators');
    await expect(textSection.getByText('important', { exact: true })).toBeVisible();
    await expect(textSection.getByText('Special: Unique text identifier')).toBeVisible();
    await textSection.getByRole('button', { name: 'Submit Form' }).click();
    await expect(textSection.getByText('Click the button above to submit your information.')).toBeVisible();

    const labelSection = page.locator('#label-locators');
    await labelSection.getByLabel('Email Address:').fill('testuser@example.com');
    await labelSection.getByLabel('Password:').fill('SecurePass123!');
    await labelSection.getByLabel('Your Age:').fill('28');
    await labelSection.getByRole('radio', { name: 'Express' }).check();
    await expect(labelSection.getByRole('radio', { name: 'Express' })).toBeChecked();

    const placeholderSection = page.locator('#placeholder-locators');
    await placeholderSection.getByPlaceholder('Enter your full name').fill('Test User');
    await placeholderSection.getByPlaceholder('Phone number (xxx-xxx-xxxx)').fill('555-123-4567');
    await placeholderSection.getByPlaceholder('Type your message here...').fill('Playwright practice');
    const search = placeholderSection.getByPlaceholder('Search products...');
    await search.fill('Laptop');
    await placeholderSection.getByRole('button', { name: 'Search' }).click();
    await expect(search).toHaveValue('Laptop');

    for (const sectionId of ['section1', 'section2', 'section3']) {
      const formSection = page.locator(`#${sectionId}`);
      const input = formSection.locator('input[type="text"]');
      await input.fill(`Value for ${sectionId}`);
      await formSection.getByRole('button', { name: 'Submit' }).click();
      await expect(input).toHaveValue(`Value for ${sectionId}`);
    }
  });

  test('checks navigation, titles, profile actions, and hover menus', async ({ page }) => {
    const testIdNavigation = page.getByTestId('main-navigation');
    await expect(testIdNavigation.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '#');
    await expect(testIdNavigation.getByRole('link', { name: 'Products' })).toHaveAttribute('href', '#');

    const productGrid = page.getByTestId('product-grid');
    await expect(productGrid.getByTestId('product-card-1')).toContainText('Product A');
    await expect(productGrid.getByTestId('product-card-1')).toContainText('$19.99');
    await expect(page.getByTestId('profile-name')).toHaveText('John Doe');
    await expect(page.getByTestId('profile-email')).toHaveText('john.doe@example.com');
    await page.getByTestId('edit-profile-btn').click();
    await expect(page.getByTestId('profile-name')).toHaveText('John Doe');

    await expect(page.getByTitle('Home page link')).toHaveAttribute('title', 'Home page link');
    await page.getByTitle('Home page link').hover();
    await expect(page.getByTitle('HyperText Markup Language')).toBeVisible();
    await expect(page.getByTitle('Tooltip text')).toHaveText('This text has a tooltip');
    const saveButton = page.getByTitle('Click to save your changes');
    await saveButton.hover();
    await saveButton.click();
    await expect(saveButton).toBeVisible();

    const hoverWidget = page.getByRole('heading', { name: 'Mouse Hover' }).locator('..');
    await hoverWidget.getByRole('button', { name: 'Point Me' }).hover();
    await expect(hoverWidget.getByRole('link', { name: 'Mobiles' })).toBeVisible();
    await expect(hoverWidget.getByRole('link', { name: 'Laptops' })).toBeVisible();
  });

  test('performs drag and drop and verifies the drop result', async ({ page }) => {
    const draggable = page.locator('#draggable');
    const dropTarget = page.locator('#droppable');

    await draggable.dragTo(dropTarget);
    await expect(dropTarget).toContainText('Dropped!');
  });

  test('reads static and dynamic tables and selects products across pages', async ({ page }) => {
    const staticTable = page
      .getByRole('heading', { name: 'Static Web Table' })
      .locator('..')
      .getByRole('table');
    await expect(staticTable.getByRole('row').nth(1)).toContainText([
      'Learn Selenium',
      'Amit',
      'Selenium',
      '300',
    ].join(' '));

    const taskTable = page.locator('#taskTable');
    const headers = await taskTable.locator('thead th').allTextContents();
    const cpuColumnIndex = headers.indexOf('CPU (%)');
    const memoryColumnIndex = headers.indexOf('Memory (MB)');
    expect(cpuColumnIndex).toBeGreaterThan(-1);
    expect(memoryColumnIndex).toBeGreaterThan(-1);

    const chromeRow = taskTable.getByRole('row', { name: /Chrome/ });
    const firefoxRow = taskTable.getByRole('row', { name: /Firefox/ });
    await expect(chromeRow.getByRole('cell').nth(cpuColumnIndex)).toHaveText(/^\d+(?:\.\d+)?%$/);
    await expect(chromeRow.getByRole('cell').nth(memoryColumnIndex)).toHaveText(/^\d+(?:\.\d+)? MB$/);
    await expect(firefoxRow.getByRole('cell').nth(cpuColumnIndex)).toHaveText(/^\d+(?:\.\d+)?%$/);
    await expect(firefoxRow.getByRole('cell').nth(memoryColumnIndex)).toHaveText(/^\d+(?:\.\d+)? MB$/);

    const expectedFirstIds = new Map([
      ['1', '1'],
      ['2', '6'],
      ['3', '11'],
      ['4', '16'],
    ]);
    for (const [pageNumber, firstId] of expectedFirstIds) {
      await page.locator('#pagination').getByRole('link', { name: pageNumber, exact: true }).click();
      const firstRow = page.locator('#productTable tbody tr').first();
      await expect(firstRow.locator('td').first()).toHaveText(firstId);
      const checkbox = firstRow.getByRole('checkbox');
      await checkbox.check();
      await expect(checkbox).toBeChecked();
    }
  });

  test('interacts with inputs and file controls inside open shadow roots', async ({ page }) => {
    const shadowHost = page.locator('#shadow_host');
    await expect(shadowHost.getByText('Mobiles', { exact: true })).toBeVisible();
    await expect(shadowHost.getByText('Laptops', { exact: true })).toBeVisible();

    const textInput = shadowHost.locator('input[type="text"]');
    await textInput.fill('Shadow DOM input');
    await expect(textInput).toHaveValue('Shadow DOM input');

    const checkbox = shadowHost.locator('input[type="checkbox"]');
    await checkbox.check();
    await expect(checkbox).toBeChecked();

    const fileInput = shadowHost.locator('input[type="file"]');
    await fileInput.setInputFiles({
      name: 'shadow-upload.txt',
      mimeType: 'text/plain',
      buffer: Buffer.from('Playwright shadow DOM upload'),
    });
    await expect(fileInput).toHaveJSProperty('files.length', 1);
    await expect
      .poll(() => fileInput.evaluate((input) => (input as HTMLInputElement).files?.[0]?.name))
      .toBe('shadow-upload.txt');
  });
});