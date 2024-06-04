import { test, expect } from '@playwright/test';
import { PAGES_USER_ACCOUNT } from '../constants';
import { saveProgress, commonTest } from '../utils';

test.beforeEach(async ({ page }) => {
  await page.goto(PAGES_USER_ACCOUNT.paymentList);
});

test.describe.serial('Payment History Page', async () => {
  test('UI Header and Footer visiable', async ({ page }) => {
    await commonTest(page, PAGES_USER_ACCOUNT.paymentList);
  });

  test('In Payment History Page: Main dom visible?', async ({ page }) => {
    const inputElements = await page.locator('input');
    const inputCount = await inputElements.count();
    await expect(inputCount).toBeGreaterThanOrEqual(3);

    await page.waitForSelector('.MuiButton-root');
    const btnElements = await page.locator('.MuiButton-root');
    const btnCount = await btnElements.count();
    await expect(btnCount).toBeGreaterThanOrEqual(1);

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
  await saveProgress('Payment History Page', status, testId);
});
