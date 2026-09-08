import { APIRequestContext } from '@playwright/test';

export class AuthApi {
  constructor(private request: APIRequestContext) {}

  async login(email: string, password: string): Promise<string> {
    const response = await this.request.post('/users/login', {
      data: { email, password },
    });
    const body = await response.json();
    return body.access_token;
  }
}