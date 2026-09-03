import { Given, When, Then } from '@cucumber/cucumber';
import { ProductPage } from '../../pages/ProductPage';
import { CartPage } from '../../pages/CartPage';

async function addUnitsOfFirstProduct(world: any, quantity: number) {
  await world.catalogPage.openFirstProduct();
  const productPage = new ProductPage(world.page);
  world.unitPrice = await productPage.getUnitPrice();
  await productPage.setQuantity(quantity);
  await productPage.addToCart();
}

Given('I have added {int} units of a product to the cart', async function (quantity: number) {
  await addUnitsOfFirstProduct(this, quantity);
});

When('I add {int} units of the first product to the cart', async function (quantity: number) {
  await addUnitsOfFirstProduct(this, quantity);
});

When('I update the quantity to {int} in the cart', async function (newQuantity: number) {
  const cartPage = new CartPage(this.page);
  await cartPage.goto();
  await cartPage.updateQuantity(newQuantity);
});

Then('the cart should show a line total equal to the unit price times {int}', async function (multiplier: number) {
  const cartPage = new CartPage(this.page);
  await cartPage.goto();
  const expectedTotal = this.unitPrice * multiplier;
  await cartPage.expectLineTotal(expectedTotal);
});