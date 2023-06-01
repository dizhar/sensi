import * as dotenv from 'dotenv';
import type {PlaywrightTestConfig} from '@playwright/test';
import {devices} from '@playwright/test';
import {Environments} from '../support/types/enums';
import * as path from 'path';
dotenv.config({});
const ENV = process.env.NODE_ENV as Environments;
const URL = process.env.URL as string;

/**
 * See https://playwright.dev/docs/test-configuration.
 */

// JUnit reporter config for Xray
const xrayOptions = {
  // Whether to add <properties> with all annotations; default is false
  embedAnnotationsAsProperties: true,

  // By default, annotation is reported as <property name='' value=''>.
  // These annotations are reported as <property name=''>value</property>.
  textContentAnnotations: ['test_description'],

  // This will create a "testrun_evidence" property that contains all attachments. Each attachment is added as an inner <item> element.
  // Disables [[ATTACHMENT|path]] in the <system-out>.
  embedAttachmentsAsProperty: 'testrun_evidence',

  // Where to put the report.
  outputFile: path.resolve(__dirname, '../../test-results/junit-results.xml'),
};

if (
  !ENV ||
  ![Environments.local, Environments.dev, Environments.prod].includes(ENV)
) {
  console.error(
    'Please pass the correct NODE_ENV values: NODE_ENV=local|dev|stage|prod'
  );
  process.exit();
}

if (!URL) {
  console.error('Please pass the URL address');
  process.exit();
}

export const config: PlaywrightTestConfig = {
  testDir: path.resolve(__dirname, './../tests'),
  /* Maximum time one test can run for. */
  timeout: 120 * 1000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 30000,
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 1 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 5 : 5,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['html', {open: 'always'}], ['junit', xrayOptions], ['list']],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  /* Authenticate once  */
  globalSetup: path.resolve(__dirname, './../support/setup/global-setup'),
  use: {
    /* Store authentication cookies in JSON format */
    storageState: 'storage-state/storageState.json',
    /* Run browsers in headless mode */
    headless: true,
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 0,
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: URL,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on',
    /* Maximum navigated page event fire */
    navigationTimeout: 30000,
    /* Gives permission for the automation to copy, write and read clipboard */
    contextOptions: {
      permissions: ['clipboard-read', 'clipboard-write'],
    },
    /* Custom attribute to be used in page.getByTestId(data-test-id) */
    testIdAttribute: 'data-testid',
    /* automatically capture a screenshot after a test failure */
    screenshot: 'on',
    /* automatically capture a video after a test failure */
    video: 'on',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  outputDir: path.resolve(__dirname, '../../test-report/'),
};

export default config;
