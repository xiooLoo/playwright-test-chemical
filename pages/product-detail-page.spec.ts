import { test, expect } from '@playwright/test';
import { PAGES, env } from '../constants';
import { saveProgress, commonTest } from '../utils';

test.beforeEach(async ({ page }) => {
  await page.goto(PAGES.product + '/' + process.env[`${env}_SKU`]);
});

test.describe.serial('Product Detail Page', async () => {
  test('UI Header and Footer visiable', async ({ page }) => {
    await commonTest(page, PAGES.product + '/' + process.env[`${env}_SKU`]);
  });

  test('In Product Detail Page: Breadcrumb visible?', async ({ page }) => {
    await page.waitForSelector('.pdp-breadcrumb');
    const breadcrumb = await page.locator('.pdp-breadcrumb');
    await expect(breadcrumb).toBeVisible();
  });

  test('In Product Detail Page: Element search visible', async ({ page }) => {
    await page.waitForSelector('.pdp-element-search');
    const elementSearch = await page.locator('.pdp-element-search');
    await expect(elementSearch).toBeVisible();
  });

  test('In Product Detail Page: Structure search visible', async ({ page }) => {
    await page.waitForSelector('.pdp-structure-search');
    const elementSearch = await page.locator('.pdp-structure-search');
    await expect(elementSearch).toBeVisible();
  });

  test('In Product Detail Page: Document download visible', async ({ page }) => {
    await page.waitForSelector('#pdp_documents_downloads');
    const elementSearch = await page.locator('#pdp_documents_downloads');
    await expect(elementSearch).toBeVisible();
  });

  test('In Product Detail Page: Product specifications visible', async ({ page }) => {
    await page.waitForSelector('.product-specifications');
    const elementSearch = await page.locator('.product-specifications');
    await expect(elementSearch).toBeVisible();
  });

  test('In Product Detail Page: Product title visible', async ({ page }) => {
    await page.waitForSelector('.product-title');
    const elementSearch = await page.locator('.product-title');
    await expect(elementSearch).toBeVisible();
  });

  test('In Product Detail Page: Product image visible', async ({ page }) => {
    await page.waitForSelector('.product-image');
    const elementSearch = await page.locator('.product-image');
    await expect(elementSearch).toBeVisible();
  });

  test('In Product Detail Page: Chemical identifiers & specifications visible', async ({ page }) => {
    await page.waitForSelector('.product-attributes');
    const elementSearch = await page.locator('.product-attributes');
    await expect(elementSearch).toBeVisible();
  });

  test('In Product Detail Page: Product description visible', async ({ page }) => {
    await page.waitForSelector('.product-description');
    const elementSearch = await page.locator('.product-description');
    await expect(elementSearch).toBeVisible();
  });

  // test("Recommend Products Visible", async () => {
  //   await page.waitForSelector(".recommend-products", { state: "visible" });
  //   const elementSearch = await page.locator(".recommend-products");
  //   await expect(elementSearch).toBeVisible();
  // });
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
  await saveProgress('Product Detail Page', status, testId);
});
