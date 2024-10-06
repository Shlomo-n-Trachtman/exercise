import { Page } from '@playwright/test';
import web_url from '../../helpers/web_url';

export class HomePage { 
    constructor(protected page: Page) {
    }

    public async navigate(url=web_url.webUrl) {
        await this.page.goto(url)
    }
}