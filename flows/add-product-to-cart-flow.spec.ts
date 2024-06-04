import { test, expect } from '@playwright/test';
import { PAGES, env } from '../constants';
import { saveProgress, commonTest } from '../utils';

test.describe.serial('Add Product To Cart Flow', async () => {
  test('UI Header and Footer visiable', async ({ page }) => {
    await page.goto(PAGES.home);
    await commonTest(page, PAGES.home);
  });

  test('In Home Page: Search catelog number success?', async ({ page }) => {
    await page.goto(PAGES.home);
    await page.waitForSelector('.data-hj-whitelist');
    const skuInput = page.locator('.data-hj-whitelist');
    await skuInput.fill(process.env[`${env}_SKU`] as string);
    await page.waitForSelector('#searchButton.search-button');
    await page.locator('#searchButton.search-button').click();
    await page.waitForURL(/.*apac\/product\/.*/);
    await expect(page).toHaveURL(/.*apac\/product\/.*/);
  });

  test('In Product Detail Page: Add product to cart and checkout success?', async ({ page }) => {
    await page.goto(`${PAGES.product}/${process.env[`${env}_SKU`]}`);
    await page.waitForURL(`${PAGES.product}/${process.env[`${env}_SKU`]}`);
    await page.waitForSelector('.custom-counter-add');
    const shoppingItems = await page.locator('.custom-counter-add');
    const items = await shoppingItems.count();
    if (items > 0) {
      const inputElement: any = await page.$(
        '(//button[contains(@class, "custom-counter-add")]/preceding-sibling::input[1])[2]'
      );
      await inputElement.isEnabled();
      await inputElement.fill('1');
      await page.waitForSelector('.add-to-cart');
      const addToCartButton = page.locator('.add-to-cart');
      await addToCartButton.click();
      await page.waitForSelector('.cart-dd.pragma-toggle-component');
      await expect(page.locator('.cart-dd.pragma-toggle-component')).toBeVisible();

      await page.waitForTimeout(1000);
      await page.goto(`${PAGES.cart}`);
      await page.waitForURL(PAGES.cart);
      await expect(page).toHaveURL(/.*apac\/cart/);
    }
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
  await saveProgress('Search Catelog Number And Add Product To Cart', status, testId);
});
