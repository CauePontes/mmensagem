import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 2,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: "http://127.0.0.1:4173",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [
    { name: "desktop-chromium", use: { ...devices["Desktop Chrome"], channel: process.env.PLAYWRIGHT_CHANNEL, viewport: { width: 1440, height: 1000 } } },
    { name: "iphone-webkit", use: { ...devices["iPhone 13"], defaultBrowserType: "webkit" } },
    { name: "iphone-chromium", use: { ...devices["iPhone 13"], defaultBrowserType: "chromium", channel: process.env.PLAYWRIGHT_CHANNEL } },
    { name: "mobile-320", use: { browserName: "chromium", channel: process.env.PLAYWRIGHT_CHANNEL, viewport: { width: 320, height: 740 }, isMobile: true, hasTouch: true } },
  ],
  webServer: process.env.PLAYWRIGHT_EXTERNAL_SERVER ? undefined : {
    command: "node scripts/serve-static.mjs",
    url: "http://127.0.0.1:4173",
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
  },
});
