import { Page, expect } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('http://localhost:4200/auth/login');
  }

  async login(email: string, password: string) {
    await this.page.getByPlaceholder('Your email').fill(email);
    await this.page.getByPlaceholder('Your password').fill(password);
    await this.page.getByRole('button', { name: 'Login' }).click();
  }

  async expectRedirectedToAccount() {
    await expect(this.page).toHaveURL(/.*\/account/);
  }

  async expectNameVisible(name: string) {
    await expect(this.page.getByText(name)).toBeVisible();
  }
}