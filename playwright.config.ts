import { defineConfig } from '@playwright/test';
import dev from './env/dev';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  expect: { timeout: 5000 },
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['allure-playwright']
  ],
  use: {
    baseURL: process.env.BASE_URL ?? dev.baseURL,
    extraHTTPHeaders: { 'Content-Type': 'application/json' }
  },
});
