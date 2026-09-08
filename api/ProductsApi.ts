import { APIRequestContext } from '@playwright/test';

export class ProductsApi {
  constructor(private request: APIRequestContext) {}

  async getFirstProductId(): Promise<string> {
    const response = await this.request.get('/products');
    const body = await response.json();
    return body.data[0].id;
  }

  async getOutOfStockProductId(): Promise<string> {
    const response = await this.request.get('/products');
    const body = await response.json();
    const outOfStockProduct = body.data.find((product: any) => product.in_stock === false);
    if (!outOfStockProduct) {
      throw new Error('No out-of-stock product found in the catalog');
    }
    return outOfStockProduct.id;
  }
}