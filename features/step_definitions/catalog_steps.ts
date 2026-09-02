import { Given, When, Then } from '@cucumber/cucumber';
import { CatalogPage } from '../../pages/CatalogPage';

Given('I am on the product catalog page', async function () {
  this.catalogPage = new CatalogPage(this.page);
  await this.catalogPage.goto();
});

When('I search for {string}', async function (term: string) {
  await this.catalogPage.searchFor(term);
});

Then('all displayed products should contain {string} in their name', async function (term: string) {
  await this.catalogPage.expectAllProductNamesToContain(term);
});

Then('the results should include a product named {string}', async function (productName: string) {
  await this.catalogPage.expectProductInResults(productName);
});