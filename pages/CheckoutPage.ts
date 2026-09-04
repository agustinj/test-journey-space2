import { Page, expect } from '@playwright/test';

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

  async expectProceedButtonEnabled() {
    await expect(this.page.locator('[data-test="proceed-3"]')).toBeEnabled();
  }
}