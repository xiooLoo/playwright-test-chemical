import { test, expect } from '@playwright/test';
import { PAGES } from '../constants';
import { saveProgress, commonTest } from '../utils';

test.beforeEach(async ({ page }) => {
  await page.goto(PAGES.periodicTableElements);
});

test.describe.serial('Periodic Table Elements Page', async () => {
  test('UI Header and Footer visiable', async ({ page }) => {
    await commonTest(page, PAGES.periodicTableElements);
  });

  test('In Periodic Table Elements Page: Main dom visible?', async ({ page }) => {
    await page.waitForSelector('.pt-table-filters');
    const ptTable = await page.locator('.pt-table');
    await expect(await ptTable.count()).toBe(1);

    const ptElements = await ptTable.locator('section.pt-element');
    const count = await ptElements.count();
    await expect(count).toBeGreaterThan(0);
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
  await saveProgress('Periodic Table Elements Page', status, testId);
});
