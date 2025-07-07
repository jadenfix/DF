import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 30 * 1000,
  expect: { timeout: 5000 },
  fullyParallel: true,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    // Desktop browsers
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    
    // Mobile devices
    { 
      name: 'Mobile Chrome', 
      use: { 
        ...devices['Pixel 5'],
        viewport: { width: 393, height: 851 }
      } 
    },
    { 
      name: 'Mobile Safari', 
      use: { 
        ...devices['iPhone 12'],
        viewport: { width: 390, height: 844 }
      } 
    },
    { 
      name: 'iPad', 
      use: { 
        ...devices['iPad Pro'],
        viewport: { width: 1024, height: 1366 }
      } 
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
}); 