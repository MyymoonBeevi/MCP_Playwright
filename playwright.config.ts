import { defineConfig, devices } from '@playwright/test';

// Generate a unique timestamp for every test execution (e.g., 2026-10-03_08-32-00)
const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);

export default defineConfig({
  testDir: './tests',
  reporter: [
    [
      'html',
      {
        // 1. Saves each run into a new timestamped folder under playwright-reports/
        outputFolder: `playwright-reports/report-${timestamp}`,
        open: 'always',
        // 2. Embeds all step screenshots directly inside the HTML report
        embedAttachments: true,
      },
    ],
    ['list'],
  ],
  use: {
    // Capture trace for every step (includes DOM snapshots & screenshots)
    trace: 'on',

    // Automatically take screenshots on actions
    screenshot: 'on',

    // Record video for full execution
    video: 'on',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});