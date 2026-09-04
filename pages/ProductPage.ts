import { Page, expect } from '@playwright/test';

export class ProductPage {
  constructor(private page: Page) {}

  async expectMatches(expected: { name?: string; price?: string; rating?: string }) {
    const name = await this.page.locator('[data-test="product-name"]').textContent();
    const price = await this.page.locator('[data-test="unit-price"]').textContent();
    const rating = await this.page.locator('[data-test="co2-rating-badge"] .co2-letter.active').textContent();
    expect(name?.trim()).toBe(expected.name);
    expect(`$${price?.trim()}`).toBe(expected.price);
    expect(rating?.trim()).toBe(expected.rating);
  }

  async setQuantity(quantity: number) {
    await this.page.locator('[data-test="quantity"]').fill(quantity.toString());
  }

  async addToCart(expectedCartCount: number) {
    await this.page.locator('[data-test="add-to-cart"]').click();
    await expect(this.page.locator('[data-test="cart-quantity"]')).toHaveText(expectedCartCount.toString());
  }

  async getUnitPrice(): Promise<number> {
    const price = await this.page.locator('[data-test="unit-price"]').textContent();
    return parseFloat(price?.trim() ?? '0');
  }
}