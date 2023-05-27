import {FullConfig} from '@playwright/test';

import {xyteAccountSetup} from './xyteAccountSetup';

const globalSetup = async (config: FullConfig) => {
  // Setup xyte account storage state
  await xyteAccountSetup(config);
};

export default globalSetup;
