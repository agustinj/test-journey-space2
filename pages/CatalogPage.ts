import { Page, expect } from '@playwright/test';

export class CatalogPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('http://localhost:4200/');
  }

  async searchFor(term: string) {
    await this.page.locator('[data-test="search-query"]').fill(term);
    await this.page.locator('[data-test="search-submit"]').click();
  }

  async expectAllProductNamesToContain(term: string) {
    const names = await this.page.locator('[data-test="product-name"]').allTextContents();
    for (const name of names) {
      expect(name.toLowerCase()).toContain(term.toLowerCase());
    }
  }

  async expectProductInResults(productName: string) {
    const names = await this.page.locator('[data-test="product-name"]').allTextContents();
    const trimmedNames = names.map(n => n.trim());
    expect(trimmedNames).toContain(productName);
  }

  async filterByCategory(categoryName: string) {
    await this.page.getByLabel(categoryName).check();
  }

  async expectResultCount(count: number) {
    const names = await this.page.locator('[data-test="product-name"]').allTextContents();
    expect(names.length).toBe(count);
  }

  async openFirstProduct() {
    await this.page.locator('[data-test^="product-"]').first().click();
  }

  async getFirstProductSummary() {
    const name = await this.page.locator('[data-test="product-name"]').first().textContent();
    const price = await this.page.locator('[data-test="product-price"]').first().textContent();
    const rating = await this.page.locator('[data-test="co2-rating-badge"] .co2-letter.active').first().textContent();
    return { name: name?.trim(), price: price?.trim(), rating: rating?.trim() };
  }
}