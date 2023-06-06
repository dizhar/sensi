import {PageNames} from '../../support/types/enums';
import {Page} from '@playwright/test';

interface navigationByPageNameType {
  pageName: PageNames;
  page: Page;
}

export const navigationByPageName = async ({
  pageName,
  page,
}: navigationByPageNameType) => {
  const navigationByPageName: Record<PageNames, () => void> = {
    [PageNames.ModelsSupportedCommands]: async () => {
      await page.getByRole('link', {name: /^Models$/i}).click();
    },
  };
  return navigationByPageName[pageName]();
};
