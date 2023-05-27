import {Page, test as base} from '@playwright/test';

interface fixtureType {
  xyte: Page;
}

const fixture = base.extend<fixtureType>({
  xyte: async ({page}, use) => {
    await page.goto('https://partners.xyte.io/');
    await use(page);
  },
});
export default fixture;
export const expect = fixture.expect;
