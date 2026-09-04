import { Given, When, Then } from '@cucumber/cucumber';
import { ProductPage } from '../../pages/ProductPage';
import { CartPage } from '../../pages/CartPage';

async function addUnitsOfProductAt(world: any, index: number, quantity: number) {
  await world.catalogPage.goto();
  const summary = await world.catalogPage.getProductSummaryAt(index);
  await world.catalogPage.openProductAt(index);
  const productPage = new ProductPage(world.page);
  const unitPrice = await productPage.getUnitPrice();
  await productPage.setQuantity(quantity);

  world.totalUnitsInCart = (world.totalUnitsInCart ?? 0) + quantity;
  await productPage.addToCart(world.totalUnitsInCart);

  return { name: summary.name, unitPrice };
}

Given(/^I have added (\d+) units? of a product to the cart$/, async function (quantity: string) {
  const result = await addUnitsOfProductAt(this, 0, parseInt(quantity));
  this.unitPrice = result.unitPrice;
  this.firstProductName = result.name;
});

Given('I have added {int} unit of another product to the cart', async function (quantity: number) {
  const result = await addUnitsOfProductAt(this, 1, quantity);
  this.secondProductName = result.name;
});

When('I add {int} units of the first product to the cart', async function (quantity: number) {
  const result = await addUnitsOfProductAt(this, 0, quantity);
  this.unitPrice = result.unitPrice;
});

When('I update the quantity to {int} in the cart', async function (newQuantity: number) {
  const cartPage = new CartPage(this.page);
  await cartPage.goto();
  await cartPage.updateQuantity(newQuantity);
});

When('I remove the first product from the cart', async function () {
  const cartPage = new CartPage(this.page);
  await cartPage.goto();
  await cartPage.removeProduct(this.firstProductName);
});

Then('the cart should show a line total equal to the unit price times {int}', async function (multiplier: number) {
  const cartPage = new CartPage(this.page);
  await cartPage.goto();
  const expectedTotal = this.unitPrice * multiplier;
  await cartPage.expectLineTotal(expectedTotal);
});

Then('the cart total should equal the remaining product\'s line total', async function () {
  const cartPage = new CartPage(this.page);
  await cartPage.expectTotalEqualsLineTotalOf(this.secondProductName);
});