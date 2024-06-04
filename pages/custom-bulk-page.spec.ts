import { test, expect } from '@playwright/test';
import { PAGES_SEARCH_PDP } from '../constants';
import { saveProgress, commonTest } from '../utils';

test.beforeEach(async ({ page }) => {
  await page.goto(PAGES_SEARCH_PDP.customBulk);
});

test.describe('Custom Bulk Page', () => {
  test('UI Header and Footer visiable', async ({ page }) => {
    await commonTest(page, PAGES_SEARCH_PDP.customBulk);
  });

  test('In Custom Bulk Page: Button and button count correct?', async ({ page }) => {
    const clearAllButtons = await page.locator('.clear-all');
    const clearCount = await clearAllButtons.count();
    await expect(clearCount).toBeGreaterThan(0);
    for (let i = 0; i < clearCount; i++) {
      const button = clearAllButtons.nth(i);
      expect(await button.isVisible()).toBe(true);
    }
    const tipLabel = await page.locator('.c-input-label.text-lg.font-medium');
    await expect(tipLabel).toBeVisible();
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
  await saveProgress('Custom Bulk Page', status, testId);
});
