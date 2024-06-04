import { test, expect } from '@playwright/test';
import { PAGES } from '../constants';
import { saveProgress, commonTest } from '../utils';

test.beforeEach(async ({ page }) => {
  await page.goto(PAGES.quickOrder);
});

test.describe.serial('Quick order Page', async () => {
  test('UI Header and Footer visiable', async ({ page }) => {
    await commonTest(page, PAGES.quickOrder);
  });

  test('In Quick Order Page: Main dom visible?', async ({ page }) => {
    const inputElements = await page.locator('input');
    const count = await inputElements.count();
    await expect(count).toBeGreaterThanOrEqual(6);

    const primaryBtnCount = await page.locator('.MuiButton-root.c-btn.c-btn--outline.c-btn--medium').count();
    await expect(primaryBtnCount).toBeGreaterThanOrEqual(1);
    const addToCartBtn = await page.locator('.MuiButton-root.Mui-disabled.c-btn.c-btn--primary');
    await expect(addToCartBtn).toBeVisible();
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
  await saveProgress('Quick order Page', status, testId);
});
