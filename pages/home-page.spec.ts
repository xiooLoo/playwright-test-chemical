import { test, expect } from '@playwright/test';
import { saveProgress, commonTest } from '../utils';
import { PAGES } from '../constants';

test.beforeEach(async ({ page }) => {
  await page.goto(PAGES.index);
});

test.describe('Home Page Learn More Links', async () => {
  test('UI Header and Footer visiable', async ({ page }) => {
    await commonTest(page, PAGES.index);
  });

  test('In Home Page: Learn more link count display normal?', async ({ page }) => {
    await page.waitForSelector('.cmp-textimage.cta-container');
    const textImageElements = await page.locator('.cmp-textimage.cta-container');
    const textImageElementsCount = await textImageElements.count();
    await expect(textImageElementsCount).toBe(14);
  });

  test('In Home Page: Learn more link(Organic Synthesis Reagents) can click and redirection?', async ({ page }) => {
    const learnMoreElement = await page.locator('.cmp-ctaitem__text:has-text("Learn more")').nth(0);
    await learnMoreElement.click();
    await page.waitForURL(/.*chemicals\/organic-chemistry\/organic-synthesis-reagents.html/);
    await expect(page).toHaveURL(/.*chemicals\/organic-chemistry\/organic-synthesis-reagents.html/);
  });

  test('In Home Page: Learn more link(Chemical Probes) can click and redirection?', async ({ page }) => {
    const learnMoreElement = await page.locator('.cmp-ctaitem__text:has-text("Learn more")').nth(1);
    await learnMoreElement.click();
    await page.waitForURL(/.*chemicals\/applications\/chemical-probes.html/);
    await expect(page).toHaveURL(/.*chemicals\/applications\/chemical-probes.html/);
  });

  test('In Home Page: Learn more link(Quick order) can click and redirection?', async ({ page }) => {
    const learnMoreElement = await page.locator('.cmp-ctaitem__text:has-text("Learn more")').nth(2);
    await learnMoreElement.click();
    await page.waitForURL(/.*apac\/quick-order/);
    await expect(page).toHaveURL(/.*apac\/quick-order/);
  });

  test('In Home Page: Learn more link(Contact us) can click and redirection?', async ({ page }) => {
    const learnMoreElement = await page.locator('.cmp-ctaitem__text:has-text("Learn more")').nth(3);
    await learnMoreElement.click();
    await page.waitForURL(/.*home\/support\/contact-us.html/);
    await expect(page).toHaveURL(/.*home\/support\/contact-us.html/);
  });

  test('In Home Page: Learn more link(Structure search tool) can click and redirection?', async ({ page }) => {
    const learnMoreElement = await page.locator('.cmp-ctaitem__text:has-text("Learn more")').nth(4);
    await learnMoreElement.click();
    await page.waitForURL(/.*apac\/search\/structure/);
    await expect(page).toHaveURL(/.*apac\/search\/structure/);
  });

  test('In Home Page: Learn more link(Chemdex search tool) can click and redirection?', async ({ page }) => {
    const learnMoreElement = await page.locator('.cmp-ctaitem__text:has-text("Learn more")').nth(5);
    await learnMoreElement.click();
    await page.waitForURL(/.*order\/dex/);
    await expect(page).toHaveURL(/.*order\/dex/);
  });

  test('In Home Page: Learn more link(Element search tool) can click and redirection?', async ({ page }) => {
    const learnMoreElement = await page.locator('.cmp-ctaitem__text:has-text("Learn more")').nth(6);
    await learnMoreElement.click();
    await page.waitForURL(/.*chemicals\/interactive-periodic-table-elements.html/);
    await expect(page).toHaveURL(/.*chemicals\/interactive-periodic-table-elements.html/);
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
  await saveProgress('Home Page Learn More Links', status, testId);
});
