import { HomePageSignedIn } from "../page-objects/homePageSignedIn";
import { SignInPage } from "../page-objects/signInPage";
import { expect, test } from "../utils/fixtures";

//API call: login, create the article, and delete the article using API call

test('artical created', async({page, homePageSignedIn, signInPage, request}) => {
await signInPage.login()
const title = `article title ${Date()}`
const description = `article description ${Date()}`
const body = `article body ${Date()}`
await homePageSignedIn.createArticle(title, description, body)
await homePageSignedIn.verifyArticleCreatedHasTitle(title)
})
