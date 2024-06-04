import { test, expect } from '@playwright/test';
import { PAGES, env } from '../constants';
import { saveProgress, commonTest } from '../utils';

test.beforeEach(async ({ page }) => {
  await page.goto(PAGES.home);
});

test.describe.serial('Search Catelog Number Flow', async () => {
  test('UI Header and Footer visiable', async ({ page }) => {
    await commonTest(page, PAGES.home);
  });

  test('In Home Page: Search catelog number success?', async ({ page }) => {
    await page.waitForSelector('.data-hj-whitelist');
    const skuInput = page.locator('.data-hj-whitelist');
    await skuInput.fill(process.env[`${env}_SKU`] as string);
    await page.waitForSelector('#searchButton.search-button');
    await page.locator('#searchButton.search-button').click();
    await page.waitForURL(/.*apac\/product\/.*/);
    await expect(page).toHaveURL(/.*apac\/product\/.*/);
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
  await saveProgress('Search Catelog Number Flow', status, testId);
});
