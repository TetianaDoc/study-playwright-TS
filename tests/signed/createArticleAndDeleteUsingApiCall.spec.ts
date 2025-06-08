import { expect, test } from "../../utils/fixtures";
import { HomePageSignedIn } from "../../page-objects/homePageSignedIn";
import { SignInPage } from "../../page-objects/signInPage";

// API call: login, create the article using UI, delete it using API
test('article is deleted using API', async ({ page, homePageSignedIn, signInPage, request }) => {
  // Log in through UI
  await signInPage.login();

  // Create unique article content
  const timestamp = Date.now();
  const title = `article title ${timestamp}`;
  const description = `article description ${timestamp}`;
  const body = `article body ${timestamp}`;

  // Create article via UI
  await homePageSignedIn.createArticle(title, description, body);
  await homePageSignedIn.verifyArticleCreatedHasTitle(title);

  // ✅ Wait for navigation to article page and extract slug
  await page.waitForURL('**/article/**'); // ensure navigation finished
  const articleUrl = page.url(); // e.g., https://conduit.bondaracademy.com/articles/article-title-123abc
  const slug = articleUrl.split('/').pop();

  if (!slug) {
    throw new Error('Failed to extract slug from article URL');
  }

  // ✅ Delete article via API
  const deleteResponse = await request.delete(`https://conduit-api.bondaracademy.com/api/articles/${slug}`);
  expect(deleteResponse.status()).toBe(204);

  // ✅ Optional: verify the article is no longer accessible
  const getResponse = await request.get(`https://conduit-api.bondaracademy.com/api/articles/${slug}`);
  expect(getResponse.status()).toBe(404);
});
