import { setDefaultTimeout, Before, After } from '@cucumber/cucumber';
import { chromium, Browser, Page } from '@playwright/test';

setDefaultTimeout(10000);

let browser: Browser;

Before(async function () {
  browser = await chromium.launch();
  this.page = await browser.newPage();
});

After(async function () {
  await browser.close();
});