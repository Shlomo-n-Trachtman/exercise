import { test, expect } from '@playwright/test';
import web_url from '../../helpers/web_url';
import HomePage_elements from '../../helpers/homePage_elements';
import { HomePage } from '../pages/homepage';


test('demoblaze', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigate();
  await homePage.validateUrl(web_url.webUrl);
  await homePage.validateTitle(HomePage_elements.title);
  await homePage.validateNavbar_txt(HomePage_elements.navbar_txt);
});