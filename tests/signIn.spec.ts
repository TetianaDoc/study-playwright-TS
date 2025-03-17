import { SignInPage } from '../page-objects/signInPage';
import { test, expect} from '../utils/fixtures';

//API call - login, create the article, and delete the article

test('Sign In form opened', async ({ signInPage }) => {
  await expect(signInPage.getEmailPlaceholder()).toHaveAttribute('placeholder', 'Email');
});

test('user logged in', async({page, signInPage}) => {
    await signInPage.login()
    await page.waitForURL('https://conduit.bondaracademy.com/')
    await expect(page.locator('a.nav-link', {hasText: 'Tanya-sol'})).toBeVisible()
})