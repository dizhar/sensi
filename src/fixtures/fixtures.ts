import {Page, test as base} from '@playwright/test';

interface fixtureType {
  page: Page;
}

const fixture = base.extend<fixtureType>({
  page: async ({page}, use) => {
    await page.goto('/');
    await use(page);
  },
});
export default fixture;
export const expect = fixture.expect;
