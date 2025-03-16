import { test, expect} from '../utils/fixtures';

//API call - login, create the article, and delete the article

test('Sign In form opened', async ({ signInPage }) => {
  await expect(signInPage.getEmailPlaceholder()).toHaveAttribute('placeholder', 'Email');
});

