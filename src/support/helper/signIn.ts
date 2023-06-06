import * as dotenv from 'dotenv';
import {Page} from '@playwright/test';

dotenv.config();

const URL = process.env.URL as string;

interface LoginType {
  page: Page
  username: string;
  password: string;
}

export const signIn = async ({page, username, password}: LoginType) => {
  // Go to XYTE home page
  await page.goto(URL);

  // Click on the login button
  await page.getByRole('link', {name: /^Login$/i}).click();

  // Click on the sign in button
  const [loginPage] = await Promise.all([
    page.context().waitForEvent('page'),
    page
      .getByRole('heading', {name: /^Xyte Partner Portal$/i})
      .locator('..')
      .getByRole('link', {name: /^sign in/i})
      .click(),
  ]);

  // Type in user
  await loginPage.getByRole('textbox', {name: 'email'}).fill(username);

  // Type in password
  await loginPage.getByRole('textbox', {name: 'password'}).fill(password);

  await Promise.all([
    loginPage.waitForLoadState('networkidle'),
    loginPage.getByRole('button', {name: /^Sign In$/i}).click(),
  ]);

  // Wait for auth item to appear in the browser localStorage
  await loginPage.waitForFunction(
    () => window.localStorage.getItem('auth') !== null,
    {timeout: 60000}
  );
};
