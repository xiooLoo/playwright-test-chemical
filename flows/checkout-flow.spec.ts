import { test, expect } from '@playwright/test';
import { PAGES, env } from '../constants';
import { saveProgress, commonTest } from '../utils';

test.beforeEach(async ({ page }) => {
  await page.goto(PAGES.cart);
});

test.describe.serial('Checkout Flow', async () => {
  test('UI Header and Footer visiable', async ({ page }) => {
    await commonTest(page, PAGES.cart);
  });

  test('In Cart Page: To add product success?', async ({ page }) => {
    await page.waitForSelector('input.catalog-number');
    const productInput = await page.locator('input.catalog-number');
    await productInput.fill(process.env[`${env}_SKU`] as string);
    const addBtn = await page.locator('.custom-add');
    await addBtn.click();
    await page.waitForSelector('.shopping-cart-item');
    const cartItemAfter = await page.locator('.shopping-cart-item');
    const cartItemCountAfter = await cartItemAfter.count();
    await expect(cartItemCountAfter).toBeGreaterThanOrEqual(1);
  });

  test('In Cart Page: Proceed to checkout success?', async ({ page }) => {
    await page.waitForSelector('.custom-proceed-btn');
    const checkoutButton = await page.locator('.custom-proceed-btn');
    await expect(checkoutButton).toBeEnabled();
    await checkoutButton.click();

    if (page.url().includes('/proxy.html')) {
      await page.waitForSelector('input.catalog-number');
      const productInput = await page.locator('input.catalog-number');
      await productInput.fill(process.env[`${env}_SKU`] as string);
      const addBtn = await page.locator('.custom-add');
      await addBtn.click();
      await page.waitForSelector('.shopping-cart-item');
      const cartItemAfter = await page.locator('.shopping-cart-item');
      const cartItemCountAfter = await cartItemAfter.count();
      await expect(cartItemCountAfter).toBeGreaterThanOrEqual(1);

      await checkoutButton.isEnabled();
      await checkoutButton.click();
      await page.waitForURL(/.*apac\/checkout.*/);
      await expect(page).toHaveURL(/.*apac\/checkout.*/);
    } else {
      await checkoutButton.isEnabled();
      await checkoutButton.click();
      await page.waitForURL(/.*apac\/checkout.*/);
      await expect(page).toHaveURL(/.*apac\/checkout.*/);
    }

    await page.waitForTimeout(1000);
    await page.waitForSelector('.custom-checkout-review');
    const nextButton = await page.locator('.custom-checkout-review');
    await nextButton.click();

    const poNumberInput = await page.locator('.purchase-order-number >> input[name=purchaseOrderNumber]');
    if (await poNumberInput.isVisible()) {
      await poNumberInput.fill('PO-TEST-123456');
    }
    const checkboxes = await page.locator('.c-checkmark');
    const checkboxCount = await checkboxes.count();
    for (let i = 0; i < checkboxCount; i++) {
      await checkboxes.nth(i).click();
    }
    const submitButton = await page.locator('.custom-checkout-review');
    await expect(submitButton).toBeVisible();
    await expect(submitButton).toBeEnabled();
    await submitButton.click();
    const cardBox = await page.locator('.rounded.border.border-stone-300.border-solid.px-7.py-5');
    const cardBoxCount = await cardBox.count();
    await expect(cardBoxCount).toBeGreaterThanOrEqual(4);
    await page.waitForTimeout(2000);
  });
});

let testId = '';
test.afterEach(async ({}, testInfo) => {
  if (testInfo.status !== 'passed') {
    testId = testInfo.testId;
  }
});

test.afterAll(async ({}, testInfo) => {
  let status = 'Success';
  if (testInfo.status === 'passed') {
    status = 'Success';
  } else {
    status = 'Failed';
  }
  await saveProgress('Checkout Flow', status, testId);
});
