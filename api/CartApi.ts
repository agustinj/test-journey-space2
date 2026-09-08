import { APIRequestContext } from '@playwright/test';

export class CartApi {
  constructor(private request: APIRequestContext) {}

  async createCart() {
    const response = await this.request.post('/carts');
    const body = await response.json();
    return body.id;
  }

  async addProduct(cartId: string, productId: string, quantity: number) {
    return await this.request.post(`/carts/${cartId}`, {
      data: {
        product_id: productId,
        quantity: quantity,
      },
    });
  }
}