import { Page } from '@playwright/test';
import { PaymentMethod } from './PaymentMethod';

export class BankTransfer implements PaymentMethod {
  constructor(
    private bankName: string,
    private accountName: string,
    private accountNumber: string
  ) {}

  async select(page: Page) {
    await page.locator('[data-test="payment-method"]').selectOption('bank-transfer');
  }

  async fillDetails(page: Page) {
    await page.locator('[data-test="bank_name"]').fill(this.bankName);
    await page.locator('[data-test="account_name"]').fill(this.accountName);
    await page.locator('[data-test="account_number"]').fill(this.accountNumber);
  }
}