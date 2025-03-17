import { test, expect} from '../utils/fixtures';

//modify API request - intercept API request and provide modified title and description for the article
test.beforeEach(async ({page}) => {
  await page.route('**/api/articles**', async route => {
    const response= await route.fetch()
    const responseBody = await response.json()
    responseBody.articles[0].title = "this is test title"
    responseBody.articles[0].description = "this is description"

    await route.fulfill({
      body: JSON.stringify(responseBody)
    })
  })
})

test('article has title and description modified', async ({ homePageAnonimus }) => {
  await expect(homePageAnonimus.getTitle()).toContainText('this is test title');
  await expect(homePageAnonimus.getDescription()).toContainText('this is description');
});
