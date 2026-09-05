import { Page, expect } from '@playwright/test';
import { PaymentMethod } from './paymentMethods/PaymentMethod';

export class CheckoutPage {
  constructor(private page: Page) {}

  async proceedFromLoginStep() {
    await this.page.locator('[data-test="proceed-2"]').click();
  }

  async fillBillingAddress(address: {
    country: string;
    postalCode: string;
    houseNumber: string;
    street: string;
    city: string;
    state: string;
  }) {
    await this.page.locator('[data-test="country"]').selectOption(address.country);
    await this.page.locator('[data-test="postal_code"]').fill(address.postalCode);
    await this.page.locator('[data-test="house_number"]').fill(address.houseNumber);
    await this.page.locator('[data-test="street"]').fill(address.street);
    await this.page.locator('[data-test="city"]').fill(address.city);
    await this.page.locator('[data-test="state"]').fill(address.state);
  }

  async fillBillingAddressWithoutCity(address: {
    country: string;
    postalCode: string;
    houseNumber: string;
    street: string;
    state: string;
  }) {
    await this.page.locator('[data-test="country"]').selectOption(address.country);
    await this.page.locator('[data-test="postal_code"]').fill(address.postalCode);
    await this.page.locator('[data-test="house_number"]').fill(address.houseNumber);
    await this.page.locator('[data-test="street"]').fill(address.street);
    await this.page.locator('[data-test="state"]').fill(address.state);
    await this.page.locator('[data-test="city"]').fill('');
  }

  async expectProceedButtonEnabled() {
    await expect(this.page.locator('[data-test="proceed-3"]')).toBeEnabled();
  }

  async expectProceedButtonDisabled() {
    await expect(this.page.locator('[data-test="proceed-3"]')).toBeDisabled();
  }

  async payWith(method: PaymentMethod) {
    await method.select(this.page);
    await method.fillDetails(this.page);
  }

  async confirmOrder() {
    await this.page.locator('[data-test="finish"]').click();
    await this.page.locator('[data-test="payment-success-message"]').waitFor({ state: 'visible' });
    await this.page.waitForLoadState('networkidle');
    await this.page.locator('[data-test="finish"]').click();
  }

  async expectOrderConfirmed() {
    await expect(this.page.locator('#order-confirmation')).toBeVisible();
  }

  async proceedFromAddressStep() {
    await this.page.locator('[data-test="proceed-3"]').click();
  }
}