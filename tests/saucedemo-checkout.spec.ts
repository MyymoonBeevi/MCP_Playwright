import { expect, test } from '@playwright/test';

const products = [
  { name: 'Sauce Labs Backpack', priceCents: 2999 },
  { name: 'Sauce Labs Bike Light', priceCents: 999 },
];

function formatCents(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

test('complete a SauceDemo purchase', async ({ page }) => {
  await test.step('log in and add the requested products', async () => {
    await page.goto('https://www.saucedemo.com/');
    await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');
    await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(/\/inventory\.html$/);

    for (const product of products) {
      const productCard = page
        .locator('.inventory_item')
        .filter({ has: page.getByText(product.name, { exact: true }) });
      await expect(productCard.locator('.inventory_item_price')).toHaveText(
        formatCents(product.priceCents),
      );
      await productCard.getByRole('button', { name: 'Add to cart' }).click();
    }

    await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
  });

  await test.step('verify the cart contents', async () => {
    await page.locator('.shopping_cart_link').click();
    await expect(page).toHaveURL(/\/cart\.html$/);
    await expect(page.locator('.cart_item .inventory_item_name')).toHaveText([
      'Sauce Labs Backpack',
      'Sauce Labs Bike Light',
    ]);
    await page.getByRole('button', { name: 'Checkout' }).click();
  });

  await test.step('enter checkout information and verify totals', async () => {
    await expect(page).toHaveURL(/\/checkout-step-one\.html$/);
    await page.getByLabel('First Name').fill('John');
    await page.getByLabel('Last Name').fill('Doe');
    await page.getByLabel('Zip/Postal Code').fill('12345');
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page).toHaveURL(/\/checkout-step-two\.html$/);

    const itemTotalCents = products.reduce((sum, product) => sum + product.priceCents, 0);
    const taxCents = Math.round(itemTotalCents * 0.08);
    const totalCents = itemTotalCents + taxCents;

    await expect(page.locator('.summary_subtotal_label')).toHaveText(
      `Item total: ${formatCents(itemTotalCents)}`,
    );
    await expect(page.locator('.summary_tax_label')).toHaveText(`Tax: ${formatCents(taxCents)}`);
    await expect(page.locator('.summary_total_label')).toHaveText(`Total: ${formatCents(totalCents)}`);
    await page.getByRole('button', { name: 'Finish' }).click();
  });

  await test.step('verify order confirmation', async () => {
    await expect(page).toHaveURL(/\/checkout-complete\.html$/);
    await expect(page.getByRole('heading', { name: 'Thank you for your order!' })).toBeVisible();
    await expect(page.getByText(/Your order has been dispatched/)).toBeVisible();
  });
});