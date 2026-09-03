import { When, Then } from '@cucumber/cucumber';
import { ProductPage } from '../../pages/ProductPage';
import { CartPage } from '../../pages/CartPage';

When('I add {int} units of the first product to the cart', async function (quantity: number) {
  await this.catalogPage.openFirstProduct();
  const productPage = new ProductPage(this.page);
  this.unitPrice = await productPage.getUnitPrice();
  this.quantityAdded = quantity;
  await productPage.setQuantity(quantity);
  await productPage.addToCart();
});

Then('the cart should show a line total equal to the unit price times {int}', async function (multiplier: number) {
  const cartPage = new CartPage(this.page);
  await cartPage.goto();
  const expectedTotal = this.unitPrice * multiplier;
  await cartPage.expectLineTotal(expectedTotal);
});