import { chromium, test as setup, expect, type Page } from '@playwright/test';
import { DOMAIN, PAGES, domain, env } from '../constants';
import { STORAGE_STATE } from '../playwright.config';
import { saveProgress } from '../utils';

export class SignPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
  async login(context) {
    await context.clearCookies();
    const { page } = this;
    // await page.goto(`${DOMAIN.BETA_CN}/account-center/signin-identifier.html`);
    await page.goto(`${DOMAIN.INDEX}/auth/login`);
    await expect(page).toHaveURL(`${DOMAIN.INDEX}/identity/phone-login/mobile-signin`);

    await page.waitForSelector('.have_trouble');
    const emailLogin = await page.locator('.have_trouble');
    await emailLogin.click();
    await expect(page).toHaveURL(`${DOMAIN.INDEX}/account-center/signin-identifier.html`);

    await page.waitForSelector('#truste-consent-button');
    const acceptCookies = await page.locator('#truste-consent-button');
    const acceptCookiesShow = await acceptCookies.isVisible();
    if (await acceptCookiesShow) {
      await acceptCookies.click();
    } else {
      console.log('Accept all cookies button has not appeared.');
    }
    await page.waitForSelector('#username-field');
    await page.locator('#username-field').fill(process.env[`${env}_USERNAME`] as string);
    await page.locator('#next-button').click();
    await page.waitForSelector('#password-field');
    const passwordInputs = await page.locator('#password-field');
    for (let i = 0; i < (await passwordInputs.count()); ++i) {
      const input = passwordInputs.nth(i);
      if (await input.isVisible()) {
        await input.fill(process.env[`${env}_PASSWORD`] as string);
        await input.press('Enter');
        break;
      }
    }
    await page.waitForSelector('.main-header-container');
    await context.storageState({ path: STORAGE_STATE });
  }
}

/**
 * setup don't use
setup('Do Login', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  // await context.clearCookies();
  const page = await context.newPage();
  await page.goto(`${DOMAIN.INDEX}/account-center/signin-identifier.html`);
  await page.waitForTimeout(3000);

  const acceptCookies = await page.locator('#truste-consent-button');
  const acceptCookiesShow = await acceptCookies.isVisible();
  if (await acceptCookiesShow) {
    await acceptCookies.click();
  } else {
    console.log('Accept all cookies button has not appeared.');
  }
  await page.waitForSelector('#username-field');
  await page.locator('#username-field').fill('china_ba-0002@yopmail.com');
  await page.locator('#next-button').click();
  await page.waitForSelector('#password-field');
  const passwordInputs = await page.locator('#password-field');
  for (let i = 0; i < (await passwordInputs.count()); ++i) {
    const input = passwordInputs.nth(i);
    if (await input.isVisible()) {
      await input.fill('@2023Chemical');
      await input.press('Enter');
      break;
    }
  }
  await page.waitForSelector('.main-header-container');

  await context.storageState({ path: STORAGE_STATE });
  await browser.close();
});

let testId = '';
setup.afterEach(async ({}, testInfo) => {
  if (testInfo.status !== 'passed') {

    testId = testInfo.testId;
    process.exit(1);
  }
});

setup.afterAll(async ({}, testInfo) => {
  let status = 'Success';
  if (testInfo.status === 'passed') {
    status = 'Success';
  } else {
    status = 'Failed';
  }
  saveProgress('Welcome Page Flow', status, testId);
});*/
