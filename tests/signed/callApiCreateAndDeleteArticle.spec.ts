import { test, expect} from '../../utils/fixtures';

//API call - login, create the article, and delete the article

test('article is deleted', async({page, signInPage, homePageSignedIn, request}) =>{
  const response = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
    data: {
      user: 
      {email: "tanya_sol@test.com", password: "userway"}
    }
  })
  const responseBody = await response.json()
  const accessToken = responseBody.user.token
  //console.log(responseBody.user.token)

  const  title = `article title ${Date()}`
  const articleResponse = await request.post('https://conduit-api.bondaracademy.com/api/articles/', {
    data:{
      article: 
      {title: title, description: "about me", body: "it is my life", tagList: []}
    },
    headers:{
      authorization: `Token ${accessToken}`
    }
  })
  expect(articleResponse.status()).toEqual(201)
  
  await signInPage.login()
  
  await page.getByText(title).click()
  await homePageSignedIn.deleteArticle()
  await homePageSignedIn.verifyArticleListTitleDoesNotContain(title)
})
