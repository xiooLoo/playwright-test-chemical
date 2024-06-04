import { test, expect } from '@playwright/test';
import { PAGES_USER_ACCOUNT } from '../constants';
import { saveProgress, commonTest } from '../utils';

test.beforeEach(async ({ page }) => {
  await page.goto(PAGES_USER_ACCOUNT.orderHistoryList);
});

test.describe.serial('Order History Page', async () => {
  test('UI Header and Footer visiable', async ({ page }) => {
    await commonTest(page, PAGES_USER_ACCOUNT.orderHistoryList);
  });

  test('In Order History Page: Main dom visible?', async ({ page }) => {
    const inputElements = await page.locator('input');
    const count = await inputElements.count();
    await expect(count).toBeGreaterThanOrEqual(3);
    await page.waitForSelector('.c-segmented-control__item');
    const tabElements = await page.locator('.c-segmented-control__item');
    const tabCount = await tabElements.count();
    await expect(tabCount).toBe(2);
    // await page.waitForSelector('.order-list-table');
    // await expect(await page.locator('.order-list-table')).toBeVisible();
    await page.waitForSelector('.MuiTablePagination-root');
    await expect(await page.locator('.MuiTablePagination-root')).toBeVisible();
  });

  test('In Order History Page: Order list table visible?', async ({ page }) => {
    await page.waitForSelector('.order-list-table');
    await expect(await page.locator('.order-list-table')).toBeVisible();
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
  await saveProgress('Order History Page', status, testId);
});
