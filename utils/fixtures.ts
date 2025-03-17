import { test as base } from '@playwright/test';
import { HomePageAnonimus } from '../page-objects/homePageAnonimus';
import { SignInPage } from '../page-objects/signInPage';
import { HomePageSignedIn } from '../page-objects/homePageSignedIn';

export const test = base.extend<{
    homePageAnonimus: HomePageAnonimus;
    homePageSignedIn: HomePageSignedIn;
    signInPage: SignInPage;
}>({
  homePageAnonimus: async ({ page }, use) => {
    const homePageAnonimus = new HomePageAnonimus(page);
    await homePageAnonimus.open();
    await use(homePageAnonimus);
  },

  homePageSignedIn: async ({ page }, use) => {
    const homePageSignedIn = new HomePageSignedIn(page);
    //await homePageSignedIn.open();
    await use(homePageSignedIn);
  },

  signInPage: async ({ page }, use) => {
    const signInPage = new SignInPage(page);
    await signInPage.open();
    await use(signInPage);
  },
});

export { expect } from '@playwright/test';
