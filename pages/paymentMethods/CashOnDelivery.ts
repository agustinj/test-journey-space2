import { Page } from '@playwright/test';
import { PaymentMethod } from './PaymentMethod';

export class CashOnDelivery implements PaymentMethod {
  async select(page: Page) {
    await page.locator('[data-test="payment-method"]').selectOption('cash-on-delivery');
  }

  async fillDetails(page: Page) {
    // No additional fields required for this payment method
  }
}