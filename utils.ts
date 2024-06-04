import { Page, expect } from '@playwright/test';
import { DOMAIN, domain } from './constants';

export const getCookieDomain = (domain: string) => {
  const parsedDomain = new URL(domain);
  const netloc = parsedDomain.hostname;

  if (netloc.includes('localhost') || netloc.replace('.', '').match(/\d+/)) {
    return netloc;
  }

  const parts = netloc.split('.');

  if (parts.length > 2) {
    return parts.slice(-2).join('.');
  }

  return netloc;
};

export async function saveProgress(process_name: string, process_status: string, process_case_id?: string) {
  const url = 'http://10.83.4.210/jira/api/save/progress/';
  const data = {
    process_name,
    process_status,
    process_case_id,
  };
  await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

export const DevLogin = async (page: Page) => {
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

export const commonTest = async (page: Page, pageUrl: string) => {
  // await page.goto(pageUrl);
  await expect(page.url()).toContain(pageUrl);
  // await expect(page.url()).toBe(pageUrl);
  await page.waitForSelector('.main-header-container');
  await expect(await page.locator('.main-header-container')).toBeVisible();
  await page.waitForSelector('.footer');
  await expect(await page.locator('.footer')).toBeVisible();
};
