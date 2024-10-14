import { Page, Locator, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { BasePage } from './basePage';
import { HomePage } from './homepage';




export class CartPage extends BasePage {

    constructor(protected page: Page) {
        super(page);
    }

    // Locators
    readonly placeOrder = this.page.locator('#page-wrapper > div > div.col-lg-1 > button');
    readonly amount = this.page.locator('#totalp');
    readonly productOrdered = this.page.locator('#tbodyid > tr > td:nth-child(2)');
    readonly prices = this.page.locator('#tbodyid > tr > td:nth-child(3)');
    // Modal locarots
    readonly placeOrderModal = this.page.locator('#orderModal');
    readonly totalFromForm = this.page.locator('#totalm');
    readonly formName = this.page.locator('#name');
    readonly formCountry = this.page.locator('#country');
    readonly formCity = this.page.locator('#city');
    readonly formCard = this.page.locator('#card');
    readonly formMonth = this.page.locator('#month');
    readonly formYear = this.page.locator('#year');
    readonly purchaseBtn = this.page.locator('#orderModal > div div.modal-footer > button.btn.btn-primary');

    // Confirm modal
    readonly confirmModal = this.page.locator('div.sweet-alert.showSweetAlert.visible');
    readonly infoText = this.page.locator('p.lead.text-muted');
    

    // Methods
    public async navigate(url: string) {
        await this.page.goto(url);
    }
    
    public async validateUrl(url: string) {
        await expect(this.page).toHaveURL(url);
    }

    // Validating the order
    public async validateOrder() {
        const orderDetail = await this.productOrdered.allTextContents();
        for (let i = 0; i < HomePage.chosenProducts.length; i++) {
            const expectedProduct = HomePage.chosenProducts[i];
            const actualProduct = orderDetail[i];
            
            if (expectedProduct === actualProduct) {
                console.log(`Product match at index ${i}: ${expectedProduct}`);
            } else {
                console.error(`Mismatch at index ${i}: expected ${expectedProduct} but got ${actualProduct}`);
            }
        }       
    }

    billAmount: number = 0;

    // Get the amount
    public async getAmount() {
        const totalPriceTxt = await this.amount.innerText();
        const totalPrice = parseFloat(totalPriceTxt);
        const pricesFromCells = await this.page.$$eval('#tbodyid td:nth-child(3)', (elements) => 
            elements.map(el => el.textContent?.trim() || '0') 
        );
    
        // Convert to nums
        const sum = pricesFromCells.reduce((acc, curr) => acc + parseFloat(curr), 0);
        
        // Validing match
        if (totalPrice === sum) {
            console.log(`Price valided ${sum}`);
        } else {
            console.error(`The price not match. Got ${sum} by calculate, but expected ${totalPrice}`);
        }
        this.billAmount = sum;
    }

    public async click_placeOrder() {
        await this.placeOrder.click();
        await this.page.waitForTimeout(300); 


        const modalIsVisible = await this.placeOrderModal.isVisible();
        if (modalIsVisible) {
            console.log(`Place order modal is visible`);
        } else {
            console.log('WARNING: Place order modal is NOT visible');
        }        
    }

    public async checkPriceInForm() {
        // Check the total price
        const totalFromFormTxt = await this.amount.innerText();
        const totalFromFormNum = parseFloat(totalFromFormTxt);
        // Compare to the sum
        const sum = this.billAmount;
        if (totalFromFormNum === sum) {
            console.log(`Price valided ${sum}`);
        } else {
            console.error(`The price not match. Got ${totalFromFormNum} by calculate, but expected ${sum}`);
        }
    }


    public async fillForm() {
        const fakeName = faker.person.fullName();
        const fakeCountry = faker.location.country();
        const fakeCity = faker.location.city();
        const fakeCard = faker.finance.creditCardNumber();
        const fakeMonth = faker.number.bigInt({ min: 1, max: 12 }).toString().padStart(2, '0');
        const thisYear = new Date().getFullYear() + 3;
        const yearFormated =  thisYear.toString().slice(-2);

        await this.formName.fill(fakeName);
        console.log(`Filling name in form`);
        await this.page.waitForTimeout(300); 

        await this.formCountry.fill(fakeCountry);
        console.log(`Filling country in form`);
        await this.page.waitForTimeout(300); 


        await this.formCity.fill(fakeCity);
        console.log(`Filling city in form`);
        await this.page.waitForTimeout(300); 


        await this.formCard.fill(fakeCard);
        console.log(`Filling card in form`);
        await this.page.waitForTimeout(300); 


        await this.formMonth.fill(fakeMonth);
        console.log(`Filling month in form`);
        await this.page.waitForTimeout(300); 


        await this.formYear.fill(yearFormated);
        console.log(`Filling year in form`);
        await this.page.waitForTimeout(1000);

        await this.clickPurchaseBtn();

        await this.validateForm(fakeName, fakeCountry, fakeCity, fakeCard, fakeMonth, yearFormated);

    }

    public async clickPurchaseBtn() {
        await this.purchaseBtn.click();
        console.log('Purchase button clicked');
        await this.page.waitForTimeout(1000);
    }

    public async validateForm (name: string, country: string, city: string, card: string, month: string, year: string) {
        const modalIsVisible = await this.confirmModal.isVisible();
        if (modalIsVisible) {
            console.log(`Confirm modal is visible`);
        } else {
            console.log('WARNING: Confirm modal is NOT visible');
        }

        this.checkPriceInForm()

        const getInfoHtl = await this.infoText.innerHTML();
        console.log(`INFO: ${getInfoHtl}`);
        if (getInfoHtl) {
            const infoParts = getInfoHtl.split('<br>');
    
            const amountTxt = infoParts[1].replace('Amount: ', '').trim();
            const cardNumberTxt = infoParts[2].replace('Card Number: ', '').trim();
            const nameTxt = infoParts[3].replace('Name: ', '').trim();
            const dateTxt = infoParts[4].replace('Date: ', '').trim();
    
            console.log(`Amount: ${amountTxt}, Name: ${nameTxt}, Card Number: ${cardNumberTxt}, Date: ${dateTxt}`);
        } else {
            console.log('WARNING: Could not retrieve info text from modal.');
        }

    }




}