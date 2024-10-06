import { Page, Locator, expect } from '@playwright/test';
import web_url from '../../helpers/web_url';
import HomePage_elements from '../../helpers/homePage_elements';

export class HomePage { 

    private navbar_txt: Locator;

    constructor(protected page: Page) {
        this.navbar_txt = this.page.locator('[class="navbar-brand"]');
    }

    public async navigate(url=web_url.webUrl) {
        await this.page.goto(url)
    }

    public async validateUrl(url: string) {
        await expect(this.page).toHaveURL(url);
    }

    public async validateTitle(expectedTitle=HomePage_elements.title) {
        const actualTitle = await this.page.title();
        await expect(actualTitle).toBe(expectedTitle);
    }

    public async validateNavbar_txt(expectedNavbar_txt=HomePage_elements.navbar_txt) {
        await expect(this.navbar_txt).toContainText(expectedNavbar_txt);
    }
}