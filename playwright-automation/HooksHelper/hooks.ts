import { BeforeAll, AfterAll, Before, After, Status } from '@cucumber/cucumber';
import { Browser, BrowserContext, chromium } from '@playwright/test';
import { pageFixture } from './pageFixture';
import { sendEmail } from "../utils/emailSender";
import * as fs from "fs";
import * as path from "path";


let browser: Browser;
let context: BrowserContext;

BeforeAll(async () => {
  console.log("Launch Browser before tests...");
  browser = await chromium.launch({ headless: false });
});

AfterAll(async () => {
  console.log("Closing Browser after tests...");
  await browser.close();

  // Prepare attachments
  const reportPaths = [
    path.join(__dirname, "../test-results/cucumber-report-smoke.html"),
  ];

  // Check if reports exist
  const attachments = reportPaths
    .filter(report => fs.existsSync(report))
    .map(report => ({
      filename: path.basename(report),
      path: report,
    }));

  // Send email with reports
  await sendEmail("Automation Test Report", "Please find the attached test report.", attachments);
});

Before(async () => {
  console.log("Setting up browser context before each test...");
  context = await browser.newContext();
  const page = await context.newPage();
  pageFixture.page = page;
});

After(async ({ pickle, result }) => {
  console.log("Cleaning up after scenario...");

  // Take screenshot if test failed
  if (result?.status == Status.FAILED) {
    await pageFixture.page.screenshot({
      path: `./test-results/screenshots/${pickle.name}.png`,
      type: 'png',
    });
  }

  await pageFixture.page.close();
  await context.close();
});
