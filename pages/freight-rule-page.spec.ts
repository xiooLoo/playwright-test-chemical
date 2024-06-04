import { test, expect } from '@playwright/test';
import { PAGES } from '../constants';
import { saveProgress, commonTest } from '../utils';

test.beforeEach(async ({ page }) => {
  await page.goto(PAGES.chinaFreightRule);
});

test.describe.serial('Freight Rule Page', async () => {
  test('UI Header and Footer visiable', async ({ page }) => {
    await commonTest(page, PAGES.chinaFreightRule);
  });

  test('In Freight Rule Page: Main dom visible?', async ({ page }) => {
    await page.waitForSelector('.freight-rule');
    await expect(await page.locator('.freight-rule')).toBeVisible();
    const tbody = await page.locator('tbody');
    await expect(await tbody.count()).toBe(1);

    const trElements = await tbody.locator('tr');
    const count = await trElements.count();
    await expect(count).toBeGreaterThanOrEqual(31);
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
  await saveProgress('Freight Rule Page', status, testId);
});
