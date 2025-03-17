import { Locator, Page } from "@playwright/test";

export class SignInPage{
    readonly page: Page

    constructor(page: Page){
        this.page=page
    }
/** Navigates to the sign in page */
async open() {
    await this.page.goto('https://conduit.bondaracademy.com/login');
}
getEmailPlaceholder(): Locator {
    return this.page.locator('.form-group input[placeholder="Email"]')
}
async login() {
    await this.page.locator('[formcontrolname="email"]').fill('tanya_sol@test.com');
    await this.page.locator('[formcontrolname="password"]').fill('userway');
    await this.page.getByRole('button').click();
    await this.page.waitForURL('https://conduit.bondaracademy.com/')
}

}