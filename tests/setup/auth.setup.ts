import { test as setup } from '@playwright/test';

const authFile='.auth/user.json'

setup('authentification', async({page}) => {
    await page.goto('https://conduit.bondaracademy.com/login');
    await page.locator('[formcontrolname="email"]').fill('tanya_sol@test.com');
    await page.locator('[formcontrolname="password"]').fill('userway');
    await page.getByRole('button').click();
    await page.waitForResponse('https://conduit-api.bondaracademy.com/api/tags')
    await page.context().storageState({path: authFile})
    
})