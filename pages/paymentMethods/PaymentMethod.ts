import { Page } from '@playwright/test';

export interface PaymentMethod {
  select(page: Page): Promise<void>;
  fillDetails(page: Page): Promise<void>;
}

