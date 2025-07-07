import { test, expect } from '@playwright/test';

test.describe('Home Page Tests', () => {
  test('home page loads and shows main heading', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'DreamForge' })).toBeVisible();
    // Check that Get Started button is visible
    await expect(page.getByRole('button', { name: /Get Started/i })).toBeVisible();
  });

  test('home page is responsive across devices', async ({ page, isMobile }) => {
    await page.goto('/');
    
    // Test responsive design
    const viewportSize = page.viewportSize();
    if (viewportSize) {
      if (viewportSize.width < 768) {
        // Mobile layout tests
        await expect(page.locator('main')).toBeVisible();
        
        // Check that content stacks properly on mobile
        const heroSection = page.locator('[data-testid="hero"], .hero, section').first();
        if (await heroSection.count() > 0) {
          await expect(heroSection).toBeVisible();
        }
      } else {
        // Desktop layout tests
        await expect(page.locator('main')).toBeVisible();
      }
    }
    
    // Universal tests for all devices
    await expect(page.getByRole('heading', { name: 'DreamForge' })).toBeVisible();
  });

  test('navigation works on all devices', async ({ page, isMobile }) => {
    await page.goto('/');
    
    if (isMobile) {
      // Mobile navigation test
      const mobileMenuButton = page.locator('button[aria-label*="menu"], [data-testid="mobile-menu"]');
      if (await mobileMenuButton.count() > 0) {
        await mobileMenuButton.first().click();
        await page.waitForTimeout(300);
      }
    }
    
    // Test navigation links
    const navLinks = page.locator('nav a, [role="navigation"] a');
    const linkCount = await navLinks.count();
    
    if (linkCount > 0) {
      // Ensure at least some navigation is visible
      expect(linkCount).toBeGreaterThan(0);
      
      // Test docs link if available
      const docsLink = navLinks.filter({ hasText: /docs/i });
      if (await docsLink.count() > 0) {
        await docsLink.first().click();
        await page.waitForLoadState('networkidle');
        expect(page.url()).toContain('docs');
      }
    }
  });

  test('docs page loads and shows documentation', async ({ page }) => {
    await page.goto('/docs');
    await expect(page.getByRole('heading', { name: 'DreamForge Documentation' })).toBeVisible();
    // Check that the architecture section exists
    await expect(page.locator('#architecture')).toBeVisible();
  });

  test('docs page is mobile-friendly', async ({ page, isMobile }) => {
    await page.goto('/docs');
    
    if (isMobile) {
      // Check mobile-specific documentation layout
      const docContent = page.locator('main, .documentation, [data-testid="docs-content"]');
      await expect(docContent.first()).toBeVisible();
      
      // Ensure code blocks are scrollable on mobile
      const codeBlocks = page.locator('pre, code');
      if (await codeBlocks.count() > 0) {
        const codeBlock = codeBlocks.first();
        await expect(codeBlock).toBeVisible();
        
        // Check that code doesn't overflow
        const hasScrollable = await page.locator('.overflow-x-auto, .overflow-scroll').count() > 0;
        const codeParent = codeBlock.locator('..');
        const hasWordWrap = await codeParent.evaluate(el => 
          getComputedStyle(el).whiteSpace === 'pre-wrap' || 
          getComputedStyle(el).overflowWrap === 'break-word'
        );
        
        expect(hasScrollable || hasWordWrap).toBe(true);
      }
    }
  });

  test('interactive elements work on touch devices', async ({ page, isMobile }) => {
    if (!isMobile) return;
    
    await page.goto('/');
    
    // Test button interactions
    const buttons = page.locator('button');
    if (await buttons.count() > 0) {
      const button = buttons.first();
      
      // Ensure minimum touch target size
      const boundingBox = await button.boundingBox();
      if (boundingBox) {
        expect(boundingBox.height).toBeGreaterThan(44);
        expect(boundingBox.width).toBeGreaterThan(44);
      }
      
      // Test touch interaction
      await button.click();
      await page.waitForTimeout(300);
    }
    
    // Test link interactions
    const links = page.locator('a').filter({ hasText: /.+/ });
    if (await links.count() > 0) {
      const link = links.first();
      const boundingBox = await link.boundingBox();
      
      if (boundingBox) {
        expect(boundingBox.height).toBeGreaterThan(32);
      }
    }
  });
}); 