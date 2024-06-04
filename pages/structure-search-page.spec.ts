import { test, expect } from '@playwright/test';
import { PAGES_SEARCH_PDP } from '../constants';
import { saveProgress, commonTest } from '../utils';

test.beforeEach(async ({ page }) => {
  await page.goto(PAGES_SEARCH_PDP.structureSearch);
});

test.describe.serial('Structure Search Page', async () => {
  test('UI Header and Footer visiable', async ({ page }) => {
    await commonTest(page, PAGES_SEARCH_PDP.structureSearch);
  });

  test('In Structure Search Page: Marvinjs Visible?', async ({ page }) => {
    await page.locator('#sketch');
    const frame = page.frames()[0];
    await frame.locator('#sketch');
  });

  test('In Structure Search Page: ToolBlock visible?', async ({ page }) => {
    await page.waitForSelector('.structure-sketch-container.border.border-solid.border-gray-450');
    const toolBlock = await page.locator('.structure-sketch-container.border.border-solid.border-gray-450');
    await expect(toolBlock).toBeVisible();

    const liCount = await page.locator('li').count();
    await expect(liCount).toBeGreaterThanOrEqual(3);
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
  await saveProgress('Structure Search Page', status, testId);
});
