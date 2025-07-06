import { test, expect } from '@playwright/test';

test('home page loads and navigates to playground', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'DreamForge' })).toBeVisible();
  // Click CTA button
  await page.getByRole('button', { name: /Try it Now/i }).click();
  await expect(page).toHaveURL(/playground/);
  await expect(page.getByRole('heading', { name: 'AI Playground' })).toBeVisible();
});

test('docs page sections render', async ({ page }) => {
  await page.goto('/docs');
  await expect(page.getByRole('heading', { name: 'DreamForge Documentation' })).toBeVisible();
  // Navigate via anchor link
  await page.getByRole('link', { name: 'System Architecture' }).click();
  await expect(page.locator('#architecture')).toBeInViewport();
}); 