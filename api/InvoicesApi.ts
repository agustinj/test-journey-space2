import { APIRequestContext } from '@playwright/test';

export class InvoicesApi {
  constructor(private request: APIRequestContext) {}

  async createInvoice(token: string, cartId: string) {
    return await this.request.post('/invoices', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        billing_street: 'Test Street',
        billing_city: 'Buenos Aires',
        billing_state: 'Buenos Aires',
        billing_country: 'AR',
        billing_postal_code: '1000',
        payment_method: 'cash-on-delivery',
        cart_id: cartId,
      },
    });
  }
}