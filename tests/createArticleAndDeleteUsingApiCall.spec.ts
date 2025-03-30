import { HomePageSignedIn } from "../page-objects/homePageSignedIn";
import { SignInPage } from "../page-objects/signInPage";
import { expect, test } from "../utils/fixtures";

//API call: login, create the article, and delete the article using API call

test('artical deleted', async({page, homePageSignedIn, signInPage, request}) => {
await signInPage.login()
const title = `article title ${Date()}`
const description = `article description ${Date()}`
const body = `article body ${Date()}`

// Create article using UI
await homePageSignedIn.createArticle(title, description, body)
await homePageSignedIn.verifyArticleCreatedHasTitle(title)

// Find the slug by navigating to the article page and extracting it from the URL
const articleUrl = page.url(); // Example: https://conduit.bondaracademy.com/articles/article-title-123abc
const slugId = articleUrl.split('/').pop(); // Extract the slug from the URL

    if (!slugId) {
        throw new Error('Failed to extract slug from article URL');
    }

// Get authentication token
const response = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
    data: {
        "user": {"email":"tanya_sol@test.com", "password":"userway"}
    }
})

const responseBody = await response.json()
const accessToken = responseBody.user.token

// Delete the article using API
const deleteArticleResponse = await request.delete(`https://conduit-api.bondaracademy.com/api/articles/${slugId}`, {
    headers: {
        authorization: `Token ${accessToken}`
    }
})
expect(deleteArticleResponse.status()).toEqual(204)
})
