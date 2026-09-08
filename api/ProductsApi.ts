import { APIRequestContext } from '@playwright/test';

export class ProductsApi {
  constructor(private request: APIRequestContext) {}

  async getFirstProductId(): Promise<string> {
    const response = await this.request.get('/products');
    const body = await response.json();
    return body.data[0].id;
  }
}