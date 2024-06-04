import { test, expect } from '@playwright/test';
import { saveProgress, commonTest } from '../utils';
import { PAGES } from '../constants';

test.beforeEach(async ({ page }) => {
  await page.goto(PAGES.index);
});

test.describe('Home Page Footer Links', async () => {
  test('UI Header and Footer visiable', async ({ page }) => {
    await commonTest(page, PAGES.index);
  });

  test('In Home Page Footer: Order status link redirection success?', async ({ page }) => {
    const learnMoreElement = await page.locator('#footer-link-1-2');
    await learnMoreElement.click();
    await page.waitForURL(/.*apac\/order-history/);
    await expect(page).toHaveURL(/.*apac\/order-history/);
  });

  test('In Home Page Footer: Bulk Order link redirection success?', async ({ page }) => {
    const learnMoreElement = await page.locator('#footer-link-1-3');
    await learnMoreElement.click();
    await page.waitForURL(/.*apac\/custom-bulk/);
    await expect(page).toHaveURL(/.*apac\/custom-bulk/);
  });

  test('In Home Page Footer: Quick Order link redirection success?', async ({ page }) => {
    const learnMoreElement = await page.locator('#footer-link-1-4');
    await learnMoreElement.click();
    await page.waitForURL(/.*apac\/quick-order/);
    await expect(page).toHaveURL(/.*apac\/quick-order/);
  });

  test('In Home Page Footer: FAQs link redirection success?', async ({ page }) => {
    const learnMoreElement = await page.locator('#footer-link-2-1');
    const href = await learnMoreElement.getAttribute('href');
    // await learnMoreElement.click();
    // await page.waitForURL(/.*FAQs.pdf/);
    await expect(href).toMatch(/.*FAQs.pdf/);
  });

  test('In Home Page Footer: Contact Us link redirection success?', async ({ page }) => {
    const learnMoreElement = await page.locator('#footer-link-2-2');
    await learnMoreElement.click();
    await page.waitForURL(/.*support\/contact-us.html/);
    await expect(page).toHaveURL(/.*support\/contact-us.html/);
  });

  test('In Home Page Footer: Terms and Conditions link redirection success?', async ({ page }) => {
    const learnMoreElement = await page.locator('#footer-link-2-3');
    await learnMoreElement.click();
    await page.waitForURL(/.*support\/terms-and-conditions.html/);
    await expect(page).toHaveURL(/.*support\/terms-and-conditions.html/);
  });

  test('In Home Page Footer: Privacy Policy link redirection success?', async ({ page }) => {
    const learnMoreElement = await page.locator('#footer-link-2-4');
    await learnMoreElement.click();
    await page.waitForURL(/.*support\/privacy-policy.html/);
    await expect(page).toHaveURL(/.*support\/privacy-policy.html/);
  });

  test('In Home Page Footer: Documents Center link redirection success?', async ({ page }) => {
    const learnMoreElement = await page.locator('#footer-link-3-1');
    await learnMoreElement.click();
    await page.waitForURL(/.*apac\/document-search/);
    await expect(page).toHaveURL(/.*apac\/document-search/);
  });

  test('In Home Page Footer: Promotions link redirection success?', async ({ page }) => {
    const learnMoreElement = await page.locator('#footer-link-3-2');
    await learnMoreElement.click();
    await page.waitForURL(/.*chemicals\/promotions.html/);
    await expect(page).toHaveURL(/.*chemicals\/promotions.html/);
  });

  test('In Home Page Footer: Webinars link redirection success?', async ({ page }) => {
    const learnMoreElement = await page.locator('#footer-link-3-3');
    await learnMoreElement.click();
    await page.waitForURL(/.*\/home.html/);
    await expect(page).toHaveURL(/.*\/home.html/);
  });

  test('In Home Page Footer: About Us link redirection success?', async ({ page }) => {
    const learnMoreElement = await page.locator('#footer-link-4-1');
    // await learnMoreElement.click();
    const href = await learnMoreElement.getAttribute('href');
    await expect(href).toMatch(/.*\/about-us.html/);
  });

  test('In Home Page Footer: Careers link redirection success?', async ({ page }) => {
    const learnMoreElement = await page.locator('#footer-link-4-2');
    await learnMoreElement.click();
    await page.waitForURL('https://jobs.thermofisher.com/global/en');
    await expect(page).toHaveURL('https://jobs.thermofisher.com/global/en');
  });

  test('In Home Page Footer: Investors link redirection success?', async ({ page }) => {
    const learnMoreElement = await page.locator('#footer-link-4-3');
    await learnMoreElement.click();
    await page.waitForURL('https://ir.thermofisher.com/investors/overview/default.aspx');
    await expect(page).toHaveURL('https://ir.thermofisher.com/investors/overview/default.aspx');
  });

  test('In Home Page Footer: News link redirection success?', async ({ page }) => {
    const learnMoreElement = await page.locator('#footer-link-4-4');
    await learnMoreElement.click();
    await page.waitForURL('https://newsroom.thermofisher.com/newsroom/overview/default.aspx');
    await expect(page).toHaveURL('https://newsroom.thermofisher.com/newsroom/overview/default.aspx');
  });

  test('In Home Page Footer: Social Responsibility link redirection success?', async ({ page }) => {
    const learnMoreElement = await page.locator('#footer-link-4-5');
    await learnMoreElement.click();
    await page.waitForURL('https://corporate.thermofisher.com/us/en/index/corporate-social-responsibility.html');
    await expect(page).toHaveURL('https://corporate.thermofisher.com/us/en/index/corporate-social-responsibility.html');
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
  await saveProgress('Home Page Footer Links', status, testId);
});
