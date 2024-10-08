import { test, expect } from '@playwright/test';
import web_url from '../../helpers/web_url';
import HomePage_elements from '../../helpers/homePage_elements';
import { BasePage }  from '../pages/basePage';
import { HomePage } from '../pages/homepage';


test('demoblaze', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigate(web_url.webUrl);
  await homePage.validateUrl(web_url.webUrl);
});