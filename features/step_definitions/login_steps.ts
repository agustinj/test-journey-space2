import { Given, When, Then } from '@cucumber/cucumber';
import { LoginPage } from '../../pages/LoginPage';

Given('I am on the login page', async function () {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.goto();
});

When('I log in with a valid email and password', async function () {
  await this.loginPage.login(
    process.env.CUSTOMER_EMAIL!,
    process.env.CUSTOMER_PASSWORD!
  );
});

Then('I should be redirected to my account page', async function () {
  await this.loginPage.expectRedirectedToAccount();
});

Then('I should see my name displayed', async function () {
  await this.loginPage.expectNameVisible('Jane');
});