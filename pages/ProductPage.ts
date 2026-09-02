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
}