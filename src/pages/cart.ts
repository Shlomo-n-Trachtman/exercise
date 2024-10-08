import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './basePage';

export class CartPage extends BasePage {

    constructor(protected page: Page) {
        super(page);
    }


    public async navigate(url: string) {
        await this.page.goto(url);
    }
    
    public async validateUrl(url: string) {
        await expect(this.page).toHaveURL(url);
    }

}