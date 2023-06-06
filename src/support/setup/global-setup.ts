import {FullConfig} from '@playwright/test';

import {accountSetup} from './accountSetup';

const globalSetup = async (config: FullConfig) => {
  // Setup sensi account storage state
  await accountSetup(config);
};

export default globalSetup;
