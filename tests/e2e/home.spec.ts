import { test, expect } from '@playwright/test';

test('home page loads and shows main heading', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'DreamForge' })).toBeVisible();
  // Check that Get Started button is visible
  await expect(page.getByRole('button', { name: /Get Started/i })).toBeVisible();
});

test('docs page loads and shows documentation', async ({ page }) => {
  await page.goto('/docs');
  await expect(page.getByRole('heading', { name: 'DreamForge Documentation' })).toBeVisible();
  // Check that the architecture section exists
  await expect(page.locator('#architecture')).toBeVisible();
}); 