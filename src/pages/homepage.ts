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
        phonesCategory: this.page.locator('a.list-group-item', { hasText: 'Phones' }),
        laptopsCategory: this.page.locator('a.list-group-item', { hasText: 'Laptops' }),
        monitorsCategory: this.page.locator('a.list-group-item', { hasText: 'monitors' }),
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

    
    productsSorted = [
        {
            category: 'phones',
            items: ['Samsung galaxy s6', 'Nokia lumia 1520', 'Nexus 6', 'Samsung galaxy s7', 'Iphone 6 32gb', 'Sony xperia z5', 'HTC One M9']
        },
        {
            category: 'laptops',
            items: ['Sony vaio i5', 'Sony vaio i7', 'MacBook air', 'Dell i7 8gb', '2017 Dell 15.6 Inch', 'MacBook Pro']
        },
        {
            category: 'monitors',
            items: ['Apple monitor 24', 'ASUS Full HD']
        }
    ];   
    
   
    public async clickLink () {
        const categories = [this.categoryElements.phonesCategory,  this.categoryElements.laptopsCategory,  this.categoryElements.monitorsCategory];
        for (let i=0; i < categories.length; i++) {
            const categoryName = i === 0 ? 'phones' : i === 1 ? 'laptops' : 'monitors';
            
            await categories[i].click();
            await this.page.waitForTimeout(1000); 

            await this.page.waitForSelector('.card', { state: 'visible' });
            console.log(`Sorting by ${categoryName}`);
            
            await this.page.waitForLoadState('networkidle');

            const productsElements = await this.productElements.cards.allTextContents();
            console.log(`Collecting all products in ${categoryName}`);
            
            
            const displayedProducts = productsElements.map(product => product.split('$')[0].trim());
            if (displayedProducts.length > 0) {
                console.log(`I've got those products: ${displayedProducts}`);
            }

            const sortedIsValid = this.productsSorted[i].items.every(product => displayedProducts.includes(product));
            if (sortedIsValid) {
                console.log(`YES! ${categoryName} is valid!`);
            } else {
                console.log(`WARNING: Espected ${this.productsSorted[i].items.filter(product => !displayedProducts.includes(product))}`);
            }

            console.log('\n');
            await this.page.waitForTimeout(1000);
        }
    }

    
    
}