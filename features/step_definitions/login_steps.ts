import { Given, When, Then } from '@cucumber/cucumber';
import { chromium, Browser, Page } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

let browser: Browser;
let page: Page;
let loginPage: LoginPage;

Given('I am on the login page', async function () {
  browser = await chromium.launch();
  page = await browser.newPage();
  loginPage = new LoginPage(page);
  await loginPage.goto();
});

When('I log in with a valid email and password', async function () {
  await loginPage.login('customer@practicesoftwaretesting.com', 'welcome01');
});

Then('I should be redirected to my account page', async function () {
  await loginPage.expectRedirectedToAccount();
});

Then('I should see my name displayed', async function () {
  await loginPage.expectNameVisible('Jane');
  await browser.close();
});