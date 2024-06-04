import { defineConfig, devices } from '@playwright/test';
import path from 'path';
require('dotenv').config();
import { domain } from './constants';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

export const STORAGE_STATE = path.join(__dirname, 'playwright/.auth/user.json');

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  timeout: 60000,
  globalTimeout: 600000,
  testDir: './',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: 3,
  /* Opt out of parallel tests on CI. */
  workers: '100%',
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['list'],
    [
      'html',
      {
        outputFolder: 'report/playwright-report',
      },
    ],

    // [
    //   "./prometheus/index.ts",
    //   {
    //     serverUrl: "http://10.83.5.172/apac/prometheus/api/v1/write",
    //   },
    // ],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',
    baseURL: domain,
    storageState: STORAGE_STATE,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    // trace: 'on-first-retry',
    trace: 'on-first-retry',
    video: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    // {
    //   name: 'setup',
    //   testMatch: '**/*.setup.ts',
    // },
    {
      name: 'chromium',
      testMatch: '**/*.spec.ts',
      // dependencies: ['setup'],
      use: {
        ...devices['Desktop Chrome'],
        storageState: STORAGE_STATE,
      },
    },
    // {
    //   name: 'firefox',
    //   testMatch: '**/*.spec.ts',
    //   // dependencies: ['setup'],
    //   use: {
    //     ...devices['Desktop Firefox'],
    //     storageState: STORAGE_STATE,
    //   },
    // },
    // {
    //   name: 'webkit',
    //   testMatch: '**/*.spec.ts',
    //   // dependencies: ['setup'],
    //   use: {
    //     ...devices['Desktop Safari'],
    //     storageState: STORAGE_STATE,
    //   },
    // },
    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
    // {
    //   name: 'setup',
    //   testMatch: /login\.setup\.ts/,
    // },
    // {
    //   name: 'cleanup',
    //   testMatch: /global\.teardown\.ts/,
    // },
    // {
    //   name: 'chromium',
    //   use: { ...devices['Desktop Chrome'] },
    //   dependencies: ['setup'],
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
  outputDir: 'test-results',
  // globalSetup: path.join(__dirname, 'units', 'login.setup.ts'),
  globalSetup: require.resolve('./units/global-setup.ts'),
});
