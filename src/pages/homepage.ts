import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './basePage';

import web_url from '../../helpers/web_url';
import HomePage_elements from '../../helpers/homePage_elements';

export class HomePage extends BasePage { 

    

    constructor(protected page: Page) {
        super(page);
    }

    //Locators
    
        // Carousel
    private carousel = this.page.locator('#carouselExampleIndicators');
    private carouselElements = {
        indicators: this.carousel.locator('.carousel-indicators li'),
        firstIndicator: this.carousel.locator('.carousel-indicators li').nth(0),
        secondIndicator: this.carousel.locator('.carousel-indicators li').nth(1),
        thirdIndicator: this.carousel.locator('.carousel-indicators li').nth(2),
        items: this.carousel.locator('.carousel-item'),
        firstItem: this.carousel.locator('.carousel-item').nth(0),
        secondItem: this.carousel.locator('.carousel-item').nth(1),
        thirdItem: this.carousel.locator('.carousel-item').nth(2),
        firstImage: this.carousel.locator('.carousel-item').nth(0).locator('img.d-block.img-fluid'), // Samsung1
        secondImage: this.carousel.locator('.carousel-item').nth(1).locator('img.d-block.img-fluid'), // nexus1
        thirdImage: this.carousel.locator('.carousel-item').nth(2).locator('img.d-block.img-fluid'), // iphone1
        prevButton: this.carousel.locator('.carousel-control-prev'),
        nextButton: this.carousel.locator('.carousel-control-next'),
    };

        // Categories
    private categoriesContainer = this.page.locator('#cat');
    private categoryElements = {
        links: this.categoriesContainer.locator('#itemc'),
        phonesCategory: this.categoriesContainer.locator('#itemc').nth(0),
        laptopsCategory: this.categoriesContainer.locator('#itemc').nth(1),
        monitorsCategory: this.categoriesContainer.locator('#itemc').nth(2),
    };

        // Products
    private productsContainer = this.page.locator('#tbodyid');
    private productElements = {
        cards: this.productsContainer.locator('.card'),
        firstProduct: this.productsContainer.locator('.card').nth(0),
        secondProduct: this.productsContainer.locator('.card').nth(1),
        thirdProduct: this.productsContainer.locator('.card').nth(2),
        getProductCard: (index: number) => this.productsContainer.locator('.card').nth(index),
    };

    public async navigate(url: string) {
        await this.page.goto(url);
    }
    
    public async validateUrl(url: string) {
        await expect(this.page).toHaveURL(url);
    }

    public async clickLink(category: 'phones' | 'laptops' | 'monitors') {
        if (category === 'phones') {
            await this.categoryElements.phonesCategory.click();
        } else if (category === 'laptops') {
            await this.categoryElements.laptopsCategory.click();
        } else if (category === 'monitors') {
            await this.categoryElements.monitorsCategory.click();
        }
        }


   
    




}