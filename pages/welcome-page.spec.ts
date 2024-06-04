import { test, expect } from '@playwright/test';
import { PAGES } from '../constants';
import { saveProgress } from '../utils';

test.beforeEach(async ({ page }) => {
  await page.goto(PAGES.welcome);
});

test.describe.serial('Welcome Page', async () => {
  test('header and footer not visible', async ({ page }) => {
    await expect(await page.locator('header')).not.toBeVisible();
    await expect(await page.locator('footer')).not.toBeVisible();
  });

  test('In Welcome Page: Registration link is visible?', async ({ page }) => {
    await page.waitForSelector('.welcome-organization-btn');
    const registrationButton = await page.locator('.welcome-organization-btn');
    await expect(registrationButton).toBeVisible();
    // await registrationButton.click();
    // await expect(page).toHaveURL(PAGES.registration);
  });

  test('In Welcome Page: Back to home link is visible?', async ({ page }) => {
    await page.waitForSelector('.welcome-home-btn');
    const backHomeButton = await page.locator('.welcome-home-btn');
    await expect(backHomeButton).toBeVisible();
    // await backHomeButton.click();
    // await expect(page).toHaveURL(PAGES.home);
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
  await saveProgress('Welcome Page', status, testId);
});
