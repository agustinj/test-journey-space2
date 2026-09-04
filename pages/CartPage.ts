import { Page, expect } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.locator('[data-test="nav-cart"]').click();
    await this.page.locator('[data-test="cart-total"]').waitFor({ state: 'visible' });
  }

  async expectLineTotal(expectedTotal: number) {
    const lineTotalText = await this.page.locator('[data-test="line-price"]').first().textContent();
    const lineTotal = parseFloat(lineTotalText?.replace('$', '').trim() ?? '0');
    expect(lineTotal).toBeCloseTo(expectedTotal, 2);
  }

  async updateQuantity(newQuantity: number) {
    await this.page.locator('[data-test="product-quantity"]').fill(newQuantity.toString());
  }

  async removeProduct(productName: string) {
    const rows = this.page.locator('tr').filter({ has: this.page.locator('[data-test="product-title"]') });
    const countBefore = await rows.count();
    await rows.first().locator('a.btn-danger').click();
    await expect(rows).toHaveCount(countBefore - 1);
  }

  async expectTotalEqualsLineTotalOf(productName: string) {
    const row = this.page.locator('tr').filter({ has: this.page.getByText(productName, { exact: true }) });
    const lineTotalText = await row.locator('[data-test="line-price"]').textContent();
    const lineTotal = parseFloat(lineTotalText?.replace('$', '').trim() ?? '0');

    const cartTotalText = await this.page.locator('[data-test="cart-total"]').textContent();
    const cartTotal = parseFloat(cartTotalText?.replace('$', '').trim() ?? '0');

    expect(cartTotal).toBeCloseTo(lineTotal, 2);
  }

  async proceedToCheckout() {
    await this.page.locator('[data-test="proceed-1"]').click();
  }
}