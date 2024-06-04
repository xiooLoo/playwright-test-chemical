import { test, expect } from '@playwright/test';
import { saveProgress, commonTest } from '../utils';
import { PAGES } from '../constants';

test.beforeEach(async ({ page }) => {
  await page.goto(PAGES.cart);
});

test.describe.serial('Shopping Cart Page', async () => {
  test('UI Header and Footer visiable', async ({ page }) => {
    await commonTest(page, PAGES.cart);
  });

  // test("Promotion Part Visible", async () => {
  //   await expect(await page.locator(".shopping-cart-promotion")).toBeVisible();
  // });

  test('In Cart Page: Cart summary part visible', async ({ page }) => {
    await page.waitForSelector('.cart-summary');
    const domBox = await page.locator('.cart-summary');
    await expect(domBox).toBeVisible();
  });

  test('In Cart Page: Product List Part Visible', async ({ page }) => {
    await page.waitForSelector('#cart-container');
    const domBox = await page.locator('#cart-container');
    await expect(domBox).toBeVisible();
  });

  //   test('Empty Cart', async () => {
  //     await page.waitForTimeout(4000);
  //     const shoppingItems = await page.locator('.shopping-cart-item');
  //     const emptyCartButton = await page.locator('.empty-cart-button');
  //     const items = await shoppingItems.count();
  //     if (items > 0) {
  //       await emptyCartButton.click();
  //       await expect(await page.locator(".c-modal__window")).toBeVisible();
  //       console.log("empty cart modal is visible");
  //       await page.locator(".c-modal__window >> text=Yes").click();
  //       await expect(await page.locator(".c-modal__window")).not.toBeVisible();
  //     }
  //     await page.waitForTimeout(2000);
  //     await expect(await page.locator(".shopping-cart-item")).toHaveCount(0);
  //   });
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
  await saveProgress('Shopping Cart Page', status, testId);
});
