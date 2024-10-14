import { test, expect } from '@playwright/test';
import web_url from '../../helpers/web_url';
import HomePage_elements from '../../helpers/homePage_elements';
import { BasePage }  from '../pages/basePage';
import { HomePage } from '../pages/homepage';
import { CartPage } from '../pages/cart';


test('demoblaze', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigate(web_url.webUrl);
  await homePage.validateUrl(web_url.webUrl);

    // Handle dialogs
    page.on('dialog', async dialog => {
      console.log(`Dialog message: ${dialog.message()}`);
      await page.waitForTimeout(1500);

      await dialog.accept();
    });

  /* 
  await homePage.sorting();
  await homePage.click_navbarLinks('home');
  await homePage.click_navbarLinks('cart');
  await homePage.open_navbarModals('contact');
  await homePage.open_navbarModals('about us');
  await homePage.open_navbarModals('log in');
  await homePage.open_navbarModals('sign up');
  await homePage.click_contact();
  */

  await homePage.click_navbarLinks('home');
  await homePage.addProductToCart();

  const cartPage = new CartPage(page);
  await cartPage.validateOrder();
  await cartPage.getAmount();
  await cartPage.click_placeOrder();
  await cartPage.fillForm();
});