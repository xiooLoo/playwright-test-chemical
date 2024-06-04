import { test, expect } from '@playwright/test';
import { PAGES } from '../constants';
import { saveProgress, commonTest } from '../utils';

test.beforeEach(async ({ page }) => {
  await page.goto(PAGES.contactUs);
});

test.describe('Contact Us Page', async () => {
  test('UI Header and Footer visiable', async ({ page }) => {
    await commonTest(page, PAGES.contactUs);
  });

  test('In Category Search Page: Sidebar Visible', async ({ page }) => {
    const mainTitle = await page.locator('.cmp-pageheading__text');
    await expect(mainTitle).toBeVisible();

    const blocks = await page.locator('.cmp-p-sectioncontainer');
    const blocksCount = await blocks.count();
    await expect(blocksCount).toBeGreaterThanOrEqual(4);
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
  await saveProgress('Contact Us Page', status, testId);
});
