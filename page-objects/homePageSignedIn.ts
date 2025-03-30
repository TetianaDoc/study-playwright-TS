import { expect, Locator, Page } from "@playwright/test";

export class HomePageSignedIn{
    readonly page: Page

    constructor(page: Page){
        this.page=page
    }
    

    async createArticle(title: string, description: string, body: string){
        await this.page.getByText('New Article').click()
        await this.page.locator('[formcontrolname="title"]').fill(title);
        await this.page.locator('[formcontrolname="description"]').fill(description);
        await this.page.locator('[formcontrolname="body"]').fill(body);
        await this.page.getByRole('button', {name: "Publish Article"}).click()
        await this.page.waitForURL('https://conduit.bondaracademy.com/article/**')
    }

    async deleteArticle(){
        await this.page.getByRole('button', {name: "Delete Article"}).first().click()
    }

    async verifyArticleListTitleDoesNotContain(title: string) {
        await expect(this.page.locator('app-article-list h1').first()).not.toContainText(title);
    }

    getArticleTitleCreated(): Locator {
        return this.page.locator('.banner h1')
    }

    async verifyArticleCreatedHasTitle(title: string) {
        await this.page.waitForSelector('.banner h1')
        await expect(this.getArticleTitleCreated()).toHaveText(title);
    }
}
