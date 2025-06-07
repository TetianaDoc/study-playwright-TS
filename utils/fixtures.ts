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
    // ✅ Intercept BEFORE navigation
    await page.route('**/api/articles**', async route => {
      console.log('[INTERCEPT] Modifying /api/articles response');
      const response = await route.fetch();
      const body = await response.json();
      body.articles[0].title = 'this is test title';
      body.articles[0].description = 'this is description';
      await route.fulfill({ body: JSON.stringify(body) });
    });

    // ✅ THEN navigate using page object
    const homePageAnonimus = new HomePageAnonimus(page);
    await homePageAnonimus.open();

    // ✅ Provide the fixture to the test
    await use(homePageAnonimus);
  },

  homePageSignedIn: async ({ page }, use) => {
    const homePageSignedIn = new HomePageSignedIn(page);
    await use(homePageSignedIn);
  },

  signInPage: async ({ page }, use) => {
    const signInPage = new SignInPage(page);
    await signInPage.open();
    await use(signInPage);
  },
});

export { expect } from '@playwright/test';
