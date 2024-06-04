import { test, expect } from '@playwright/test';
import { PAGES_SEARCH_PDP } from '../constants';
import { saveProgress, commonTest } from '../utils';

test.beforeEach(async ({ page }) => {
  await page.goto(PAGES_SEARCH_PDP.category);
});

test.describe.serial('Category Search Page', async () => {
  test('UI Header and Footer visiable', async ({ page }) => {
    await commonTest(page, PAGES_SEARCH_PDP.category);
  });

  test('In Category Search Page: Main dom visible?', async ({ page }) => {
    const liCount = await page.locator('li').count();
    await expect(liCount).toBeGreaterThanOrEqual(4);
    await page.waitForTimeout(1000);
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
  await saveProgress('Category Search Page', status, testId);
});
