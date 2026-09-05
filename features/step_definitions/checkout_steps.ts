import { When, Then } from '@cucumber/cucumber';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';

When('I proceed to checkout', async function () {
  const cartPage = new CartPage(this.page);
  await cartPage.goto();
  await cartPage.proceedToCheckout();
  this.checkoutPage = new CheckoutPage(this.page);
  await this.checkoutPage.proceedFromLoginStep();
});

When('I fill in a valid billing address', async function () {
  await this.checkoutPage.fillBillingAddress({
    country: 'AR',
    postalCode: '1000',
    houseNumber: '42',
    street: 'Test Street',
    city: 'Buenos Aires',
    state: 'Buenos Aires',
  });
});

When('I fill in a billing address without a city', async function () {
  await this.checkoutPage.fillBillingAddressWithoutCity({
    country: 'AR',
    postalCode: '1000',
    houseNumber: '42',
    street: 'Test Street',
    state: 'Buenos Aires',
  });
});

Then('the proceed button should be disabled', async function () {
  await this.checkoutPage.expectProceedButtonDisabled();
});

Then('the proceed button should be enabled', async function () {
  await this.checkoutPage.expectProceedButtonEnabled();
});