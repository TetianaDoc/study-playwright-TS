import { Locator, Page } from '@playwright/test';

export class HomePageAnonimus {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /** Navigates to the home page */
  async open(): Promise<void> {
    await this.page.goto('https://conduit.bondaracademy.com/');
  }

  /** Clicks on the "Sign in" link */
  async openSignInForm(): Promise<void> {
    await this.page.getByRole('link', { name: 'Sign in' }).click();
  }

  /** Returns the sidebar locator (tags list) */
  getSidebar(): Locator {
    return this.page.locator('.sidebar p');
  }

  /** Returns the article title element */
  getTitle(): Locator {
    return this.page.locator('app-article-list h1').first();
  }

  /** Returns the article description element */
  getDescription(): Locator {
    return this.page.locator('app-article-list p').first();
  }
}
