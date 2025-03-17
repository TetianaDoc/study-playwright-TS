import { expect, Locator, Page } from "@playwright/test";

export class HomePageSignedIn{
    readonly page: Page

    constructor(page: Page){
        this.page=page
    }
    
    async deleteArticle(){
    await this.page.getByRole('button', {name: "Delete Article"}).first().click()
    }

    async verifyArticleListTitleDoesNotContain(title: string) {
        await expect(this.page.locator('app-article-list h1').first()).not.toContainText(title);
    }
}
