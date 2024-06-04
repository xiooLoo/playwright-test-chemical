import { test, expect } from '@playwright/test';
import { PAGES_USER_ACCOUNT } from '../constants';
import { saveProgress, commonTest } from '../utils';

test.beforeEach(async ({ page }) => {
  await page.goto(PAGES_USER_ACCOUNT.orderHistoryDetail);
});

test.describe.serial('Order History Detail Page', async () => {
  test('UI Header and Footer visiable', async ({ page }) => {
    await commonTest(page, PAGES_USER_ACCOUNT.orderHistoryDetail);
  });

  test('In Order History Detail Page: Main dom visible?', async ({ page }) => {
    await page.waitForSelector('.font-medium.flex-1');
    const detailTip = await page.locator('.font-medium.flex-1');
    await expect(detailTip).toBeVisible();
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
  await saveProgress('Order History Detail Page', status, testId);
});
