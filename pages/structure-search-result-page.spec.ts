import { test, expect } from '@playwright/test';
import { PAGES_SEARCH_PDP } from '../constants';
import { saveProgress, commonTest } from '../utils';

test.beforeEach(async ({ page }) => {
  await page.goto(PAGES_SEARCH_PDP.searchResultStructure);
});

test.describe.serial('Structure Search Result Page', async () => {
  test('UI Header and Footer visiable', async ({ page }) => {
    await commonTest(page, PAGES_SEARCH_PDP.searchResultStructure);
  });

  test('In Structure Search Result Page: Main dom visible?', async ({ page }) => {
    await page.waitForSelector('.flex.flex-col.gap-y-8');
    const domBox = await page.locator('.flex.flex-col.gap-y-8');
    await expect(domBox).toBeVisible();
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
  await saveProgress('Structure Search Result Page', status, testId);
});
