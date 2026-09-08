import 'dotenv/config';
import { setDefaultTimeout, Before, After, BeforeAll, AfterAll, Status } from '@cucumber/cucumber';
import { chromium, Browser } from '@playwright/test';
import { request, APIRequestContext } from '@playwright/test';

setDefaultTimeout(10000);

let browser: Browser;
const STORAGE_STATE_PATH = 'storage-state.json';

BeforeAll(async function () {
  browser = await chromium.launch();

  // Log in once and save the session state
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('http://localhost:4200/auth/login');
  await page.locator('[data-test="email"]').fill(process.env.CUSTOMER_EMAIL!);
  await page.locator('[data-test="password"]').fill(process.env.CUSTOMER_PASSWORD!);
  await page.locator('[data-test="login-submit"]').click();
  await page.waitForURL(/.*\/account/);
  await context.storageState({ path: STORAGE_STATE_PATH });
  await context.close();
});

Before(async function () {
  const context = await browser.newContext({ storageState: STORAGE_STATE_PATH });
  this.context = context;
  this.page = await context.newPage();
  this.apiContext = await request.newContext({ baseURL: 'http://localhost:8091' });
});

After(async function (scenario) {
  if (scenario.result?.status === Status.FAILED && this.page) {
    const screenshot = await this.page.screenshot();
    this.attach(screenshot, 'image/png');
  }
  if (this.apiContext) {
    await this.apiContext.dispose();
  }
  if (this.context) {
    await this.context.close();
  }
});

AfterAll(async function () {
  if (browser) {
    await browser.close();
  }
});