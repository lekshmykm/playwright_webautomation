import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();
export default defineConfig({
  testDir: './src/tests',
  fullyParallel: true,
  retries: 0,
  timeout: 30_000,
  expect: { timeout: 5000 },
  // Reporter to use
  reporter: 'allure-playwright',
  use: {
    baseURL: process.env['BASE_URL'] || 'https://www.thomann.de/intl/index.html',
    headless: true,
    viewport: { width: 1920, height: 1080 },
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure', 
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ]
});
