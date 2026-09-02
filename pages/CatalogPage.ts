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
}