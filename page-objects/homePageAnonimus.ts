import { Locator, Page } from "@playwright/test";

export class HomePageAnonimus{
    readonly page: Page

    constructor(page: Page){
        this.page=page
    }

    /** Navigates to the home page */
    async open() {
        await this.page.goto('https://conduit.bondaracademy.com/');
    }

    async openSignInForm(){
        await this.page.getByText(' Sign in ').click()
    }

    getSidebar(): Locator {
        return this.page.locator('.sidebar p')
    }

    getTitle(): Locator{
        return this.page.locator('app-article-list h1').first()
    }
    getDescription(): Locator{
        return this.page.locator('app-article-list p').first()
    }
    
}
