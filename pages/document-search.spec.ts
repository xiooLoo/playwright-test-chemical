import { test, expect } from '@playwright/test';
import { PAGES_SEARCH_PDP } from '../constants';
import { saveProgress, commonTest } from '../utils';

test.beforeEach(async ({ page }) => {
  await page.goto(PAGES_SEARCH_PDP.documentSearch);
});

test.describe.serial('Document Search Page', async () => {
  test('UI Header and Footer visiable', async ({ page }) => {
    await commonTest(page, PAGES_SEARCH_PDP.documentSearch);
  });

  test('In Document Search Page: Main dom visible?', async ({ page }) => {
    const searchBtn = await page.locator('.MuiButton-root.c-btn.c-btn--outline.c-btn--medium');
    await expect(searchBtn).toBeVisible();
    const searchInput = await page.locator('.MuiInput-input.c-input');
    await expect(searchInput).toBeVisible();
    await page.getByRole('button', { name: 'Search' }).first().isVisible();
    expect(await page.getByRole('button', { name: 'Search' }).count()).toBeGreaterThanOrEqual(1);
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
  await saveProgress('Document Search Page', status, testId);
});
