import 'dotenv/config';
import { setDefaultTimeout, Before, After, Status } from '@cucumber/cucumber';
import { chromium, Browser, Page } from '@playwright/test';

setDefaultTimeout(10000);

let browser: Browser;

Before(async function () {
  browser = await chromium.launch();
  this.page = await browser.newPage();
});

After(async function (scenario) {
  if (scenario.result?.status === Status.FAILED) {
    const screenshot = await this.page.screenshot();
    this.attach(screenshot, 'image/png');
  }
  await browser.close();
});