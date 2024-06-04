import { test, expect } from '@playwright/test';
import { PAGES_USER_ACCOUNT } from '../constants';
import { saveProgress, commonTest } from '../utils';

test.beforeEach(async ({ page }) => {
  await page.goto(PAGES_USER_ACCOUNT.myFavorites);
});

test.describe.serial('My Favorites Page', async () => {
  test('UI Header and Footer visiable', async ({ page }) => {
    await commonTest(page, PAGES_USER_ACCOUNT.myFavorites);
  });

  test('In My Favorites Page: Main dom visible?', async ({ page }) => {
    await page.waitForSelector('.custom-favorite');
    const customFavorite = await page.locator('.custom-favorite');
    await expect(customFavorite).toBeVisible();

    const inputElements = await page.locator('input');
    const count = await inputElements.count();
    await expect(count).toBeGreaterThanOrEqual(1);
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
  await saveProgress('My Favorites Page', status, testId);
});
