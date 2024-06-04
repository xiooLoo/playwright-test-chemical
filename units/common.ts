import { test, Page, expect } from '@playwright/test';
import { domain } from '../constants';

import { getCookieDomain } from '../utils';
export const addCookies = async (page: Page) => {
  const cookieDomain = getCookieDomain(domain);

  await page.context().addCookies([
    {
      name: 'x_kong_user_id',
      value: '3602258505',
      domain: cookieDomain,
      path: '/',
    },
    {
      name: 'x_kong_country',
      value: 'CN',
      domain: cookieDomain,
      path: '/',
    },
  ]);
};

export const checkHeaderVisible = async () => {
  test('Header Visible', async ({ page }) => {
    await expect(await page.locator('.main-header-container')).toBeVisible();
  });
};

export const checkFooterVisible = async () => {
  test('Footer Visible', async ({ page }) => {
    await expect(await page.locator('.footer')).toBeVisible();
  });
};
