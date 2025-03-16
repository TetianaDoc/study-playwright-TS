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
}