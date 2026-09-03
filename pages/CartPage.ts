import { Page, expect } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.locator('[data-test="nav-cart"]').click();
  }

  async expectLineTotal(expectedTotal: number) {
    const lineTotalText = await this.page.locator('[data-test="line-price"]').first().textContent();
    const lineTotal = parseFloat(lineTotalText?.replace('$', '').trim() ?? '0');
    expect(lineTotal).toBeCloseTo(expectedTotal, 2);
  }

  async updateQuantity(newQuantity: number) {
    await this.page.locator('[data-test="product-quantity"]').fill(newQuantity.toString());
  }
}