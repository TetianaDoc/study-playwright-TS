import { test as setupUI } from '@playwright/test';

const authFile='.auth/user.json'

setupUI('authentification', async({page}) => {
    //Auth through UI - for presentation only
    //This Playwright setup script logs in a user and saves the authentication state to a file (.auth/user.json). 
    // This can be reused in other tests to avoid logging in each time. 
    //that stores the login session — which you can reuse in other tests

    await page.goto('https://conduit.bondaracademy.com/login');
    await page.locator('[formcontrolname="email"]').fill('tanya_sol@test.com');
    await page.locator('[formcontrolname="password"]').fill('userway');
    await page.getByRole('button').click();
    await page.waitForResponse('https://conduit-api.bondaracademy.com/api/tags')
    await page.context().storageState({path: authFile})
    
})
