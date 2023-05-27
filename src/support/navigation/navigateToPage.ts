import {PageNames} from '../../support/types/enums';
import {Page} from '@playwright/test';

interface navigationByPageNameType {
  pageName: PageNames;
  xyte: Page;
}

export const navigationByPageName = async ({
  pageName,
  xyte,
}: navigationByPageNameType) => {
  const navigationByPageName: Record<PageNames, () => void> = {
    [PageNames.ModelsSupportedCommands]: async () => {
      await xyte.getByRole('link', {name: /^Models$/i}).click();
    },
  };
  return navigationByPageName[pageName]();
};
