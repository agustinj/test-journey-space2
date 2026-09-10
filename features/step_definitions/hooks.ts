import 'dotenv/config';
import { setDefaultTimeout, Before, After, BeforeAll, AfterAll, Status } from '@cucumber/cucumber';
import { chromium, Browser } from '@playwright/test';
import { request, APIRequestContext } from '@playwright/test';

setDefaultTimeout(10000);

let browser: Browser;
const STORAGE_STATE_PATH = 'storage-state.json';

BeforeAll({ timeout: 60000 }, async function () {
  const t0 = Date.now();
  const log = (label: string) => console.log(`[BeforeAll] ${label} — ${Date.now() - t0}ms`);

  browser = await chromium.launch();
  log('browser launched');

  // Log in once and save the session state
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('http://localhost:4200/auth/login');
  log('goto /auth/login done');

  await page.locator('[data-test="email"]').fill(process.env.CUSTOMER_EMAIL!);
  log('email filled');

  await page.locator('[data-test="password"]').fill(process.env.CUSTOMER_PASSWORD!);
  log('password filled');

  await page.locator('[data-test="login-submit"]').click();
  log('submit clicked');

  await page.waitForURL(/.*\/account/);
  log('waitForURL /account resolved');

  await context.storageState({ path: STORAGE_STATE_PATH });
  log('storageState saved');

  await context.close();
  log('context closed');
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