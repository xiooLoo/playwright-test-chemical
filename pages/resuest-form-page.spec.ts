import { test, expect } from '@playwright/test';
import { PAGES_SEARCH_PDP } from '../constants';
import { saveProgress, commonTest } from '../utils';

test.beforeEach(async ({ page }) => {
  await page.goto(PAGES_SEARCH_PDP.requestForm);
});

test.describe.serial('Request Form Page', async () => {
  test('UI Header and Footer visiable', async ({ page }) => {
    await commonTest(page, PAGES_SEARCH_PDP.requestForm);
  });

  test('In Request Form Page: Main dom visible?', async ({ page }) => {
    const inputElements = page.locator('input');
    const count = await inputElements.count();
    expect(count).toBeGreaterThanOrEqual(9);

    const primaryBtn = await page.locator('.MuiButton-root.c-btn.c-btn--outline.c-btn--medium');
    await expect(primaryBtn).toBeVisible();

    const submitBtn = await page.locator('.MuiButton-root.Mui-disabled.c-btn');
    await expect(submitBtn).toBeVisible();
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
  await saveProgress('Request Form Page', status, testId);
});
