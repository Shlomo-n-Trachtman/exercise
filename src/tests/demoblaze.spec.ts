import { test, expect } from '@playwright/test';
import web_url from '../../helpers/web_url';
import { HomePage } from '../pages/homepage';

test('demoblaze', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigate();
});