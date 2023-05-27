import * as dotenv from 'dotenv';
import {Page} from '@playwright/test';

dotenv.config();

const URL = process.env.BUCKET_URL as string;

interface LoginType {
  xytePage: Page;
  username: string;
  password: string;
}

export const xyteSignIn = async ({xytePage, username, password}: LoginType) => {
  // Go to XYTE home page
  await xytePage.goto(URL);

  // Click on the login button
  await xytePage.getByRole('link', {name: /^Login$/i}).click();

  // Click on the sign in button
  const [xyteLoginPage] = await Promise.all([
    xytePage.context().waitForEvent('page'),
    xytePage
      .getByRole('heading', {name: /^Xyte Partner Portal$/i})
      .locator('..')
      .getByRole('link', {name: /^sign in/i})
      .click(),
  ]);

  // Type in user
  await xyteLoginPage.getByRole('textbox', {name: 'email'}).fill(username);

  // Type in password
  await xyteLoginPage.getByRole('textbox', {name: 'password'}).fill(password);

  await Promise.all([
    xyteLoginPage.waitForLoadState('networkidle'),
    xyteLoginPage.getByRole('button', {name: /^Sign In$/i}).click(),
  ]);

  // Wait for auth item to appear in the browser localStorage
  await xyteLoginPage.waitForFunction(
    () => window.localStorage.getItem('auth') !== null,
    {timeout: 60000}
  );
};
