import {config} from './playwright.prod.config';
import {devices} from '@playwright/test';
import merge from 'deepmerge';

merge(config, {}, {clone: false});
config.timeout = 180 * 1000;
config.reporter = [['html', {open: 'never'}]];
config.projects = [
  {
    name: 'chromium',
    use: {
      /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
      trace: 'on',
      /* automatically capture a screenshot after a test failure */
      screenshot: 'on',
      /* automatically capture a video after a test failure */
      video: 'on',
      // Allows to develop locally with HTTP instead of HTTPS
      ignoreHTTPSErrors: true,
      /* Maximum navigated page event fire */
      navigationTimeout: 70 * 1000,
      headless: false,
      ...devices['Desktop Chrome'],
    },
  },
];
export default config;
