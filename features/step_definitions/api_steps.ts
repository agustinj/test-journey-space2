import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CartApi } from '../../api/CartApi';
import { ProductsApi } from '../../api/ProductsApi';
import { AuthApi } from '../../api/AuthApi';
import { InvoicesApi } from '../../api/InvoicesApi';

Given('a new cart has been created via API', async function () {
  const cartApi = new CartApi(this.apiContext);
  this.cartId = await cartApi.createCart();
});

Given('a valid product exists in the catalog', async function () {
  const productsApi = new ProductsApi(this.apiContext);
  this.productId = await productsApi.getFirstProductId();
});

Given('an out-of-stock product exists in the catalog', async function () {
  const productsApi = new ProductsApi(this.apiContext);
  this.productId = await productsApi.getOutOfStockProductId();
});

Given('I am authenticated via API', async function () {
  const authApi = new AuthApi(this.apiContext);
  this.authToken = await authApi.login(
    process.env.CUSTOMER_EMAIL!,
    process.env.CUSTOMER_PASSWORD!
  );
});

Given('that product has been added to the cart via API', async function () {
  const cartApi = new CartApi(this.apiContext);
  await cartApi.addProduct(this.cartId, this.productId, 1);
});

When('I try to create an invoice for that cart via API', async function () {
  const invoicesApi = new InvoicesApi(this.apiContext);
  this.apiResponse = await invoicesApi.createInvoice(this.authToken, this.cartId);
});

When('I try to add that product to the cart via API', async function () {
  const cartApi = new CartApi(this.apiContext);
  this.apiResponse = await cartApi.addProduct(this.cartId, this.productId, 1);
});

When('I try to add a negative quantity of that product to the cart via API', async function () {
  const cartApi = new CartApi(this.apiContext);
  this.apiResponse = await cartApi.addProduct(this.cartId, this.productId, 0);
});

When('I request the list of products via API', async function () {
  this.apiResponse = await this.apiContext.get('/products');
});

When('I try to add a decimal quantity of that product to the cart via API', async function () {
  const cartApi = new CartApi(this.apiContext);
  this.apiResponse = await cartApi.addProduct(this.cartId, this.productId, 1.5);
});

Then('the API response status should be {int}', async function (expectedStatus: number) {
  expect(this.apiResponse.status()).toBe(expectedStatus);
});