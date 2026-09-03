import { Given } from '@cucumber/cucumber';
import { LoginPage } from '../../pages/LoginPage';

Given('I am logged in', async function () {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.goto();
  await this.loginPage.login(
    process.env.CUSTOMER_EMAIL!,
    process.env.CUSTOMER_PASSWORD!
  );
  await this.loginPage.expectRedirectedToAccount();
});