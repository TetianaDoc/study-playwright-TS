import { test as base } from '@playwright/test';
import { HomePage } from '../page-objects/homePage';
import { SignInPage } from '../page-objects/signInPage';

export const test = base.extend<{
    homePage: HomePage;
    signInPage: SignInPage;
}>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await homePage.open();
    await use(homePage);
  },

  signInPage: async ({ page }, use) => {
    const signInPage = new SignInPage(page);
    await signInPage.open();
    await use(signInPage);
  },
});

export { expect } from '@playwright/test';
