import { test, expect} from '../../utils/fixtures';
import tags from '../../test-data/tags.json'

//mocking API request - intercept API request and provide our own response - new tags
test.beforeEach(async ({page}) => {
  await page.route('**/api/tags', async route => {
    console.log('✅ Mocking API response:', route.request().url());
    
    await route.fulfill({
          contentType: 'application/json',
          headers: {
            'Cache-Control': 'no-cache',  // ✅ Force fresh response
          },
          body: JSON.stringify(tags)
        })
  })
})

test('has new tags', async ({ homePageAnonimus }) => {//
  await expect(homePageAnonimus.getSidebar()).toHaveText('Popular Tags');
});
