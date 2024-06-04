import { chromium, test as setup, expect, type Page } from '@playwright/test';
import { SignPage } from './login.setup';
import { STORAGE_STATE } from '../playwright.config';

async function globalSetup() {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  const sign = new SignPage(page);
  await sign.login(context);
}
export default globalSetup;
