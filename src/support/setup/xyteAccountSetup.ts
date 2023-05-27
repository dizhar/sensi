import * as dotenv from 'dotenv';
import {Usernames} from '../types/enums';
import {xyteSignIn} from '../helper';
import {chromium, FullConfig} from '@playwright/test';

dotenv.config();
const ENV = process.env.NODE_ENV as string;
const password = process.env.SECRET_PASSWORD as string;

export const xyteAccountSetup = async (config: FullConfig<{}, {}>) => {
  const {storageState} = config.projects[0].use;
  const browser = await chromium.launch({
    timeout: config.globalTimeout,
    headless: true,
  });
  const page = await browser.newPage({ignoreHTTPSErrors: true});
  await xyteSignIn({
    xytePage: page,
    username: Usernames[ENV],
    password,
  });
  await page.context().storageState({path: storageState as string});
  await browser.close();
};
