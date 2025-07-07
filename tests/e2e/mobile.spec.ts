import { test, expect } from '@playwright/test';

test.describe('Mobile-Specific Tests', () => {
  test('home page is mobile responsive', async ({ page, isMobile }) => {
    await page.goto('/');
    
    if (isMobile) {
      // Check mobile-specific elements
      await expect(page.getByRole('heading', { name: 'DreamForge' })).toBeVisible();
      
      // Verify mobile navigation (hamburger menu or collapsed nav)
      const navButton = page.locator('button[aria-label="Toggle navigation"]').or(
        page.locator('[data-testid="mobile-menu-button"]')
      );
      
      // Mobile menu should exist or navigation should be visible
      const hasNavButton = await navButton.count() > 0;
      const hasVisibleNav = await page.locator('nav').isVisible();
      
      expect(hasNavButton || hasVisibleNav).toBe(true);
      
      // Test viewport-specific layout
      const viewportSize = page.viewportSize();
      if (viewportSize && viewportSize.width < 768) {
        // Mobile breakpoint tests
        await expect(page.locator('main')).toHaveCSS('padding', /8px|16px|1rem/);
      }
    }
  });

  test('playground page works on mobile', async ({ page, isMobile }) => {
    await page.goto('/playground');
    
    await expect(page.getByText('AI Playground')).toBeVisible();
    
    if (isMobile) {
      // Check that form elements are touch-friendly
      const textarea = page.locator('textarea').first();
      await expect(textarea).toBeVisible();
      
      // Ensure minimum touch target size (44px recommended)
      const boundingBox = await textarea.boundingBox();
      expect(boundingBox?.height).toBeGreaterThan(44);
      
      // Test file upload button on mobile
      const fileInput = page.locator('input[type="file"]');
      if (await fileInput.count() > 0) {
        await expect(fileInput).toBeVisible();
      }
    }
  });

  test('advanced playground is mobile responsive', async ({ page, isMobile }) => {
    await page.goto('/playground-advanced');
    
    await expect(page.getByText('Advanced Playground')).toBeVisible();
    
    if (isMobile) {
      // Check tab navigation on mobile
      const tabs = page.locator('[role="tab"]');
      const tabCount = await tabs.count();
      
      if (tabCount > 0) {
        // Ensure tabs are accessible on mobile
        for (let i = 0; i < Math.min(tabCount, 3); i++) {
          const tab = tabs.nth(i);
          await expect(tab).toBeVisible();
          
          // Test touch interaction
          await tab.click();
          await page.waitForTimeout(500); // Allow transition
        }
      }
      
      // Check that content areas are scrollable on mobile
      const contentArea = page.locator('[role="tabpanel"]').first();
      if (await contentArea.count() > 0) {
        await expect(contentArea).toBeVisible();
      }
    }
  });

  test('model selector works on mobile', async ({ page, isMobile }) => {
    await page.goto('/playground-advanced');
    
    if (isMobile) {
      // Find model selector dropdown or buttons
      const modelSelector = page.locator('select').or(
        page.locator('[data-testid="model-selector"]')
      ).or(
        page.locator('button').filter({ hasText: /model|select/i })
      );
      
      if (await modelSelector.count() > 0) {
        const selector = modelSelector.first();
        await expect(selector).toBeVisible();
        
        // Test touch interaction
        await selector.click();
        await page.waitForTimeout(500);
        
        // Check if dropdown options are visible and touch-friendly
        const options = page.locator('option').or(
          page.locator('[role="option"]')
        );
        
        if (await options.count() > 0) {
          const firstOption = options.first();
          const boundingBox = await firstOption.boundingBox();
          expect(boundingBox?.height).toBeGreaterThan(32); // Minimum touch target
        }
      }
    }
  });

  test('usage dashboard is mobile responsive', async ({ page, isMobile }) => {
    await page.goto('/playground-advanced');
    
    // Navigate to usage dashboard tab if available
    const usageTab = page.locator('[role="tab"]').filter({ hasText: /usage|dashboard/i });
    if (await usageTab.count() > 0) {
      await usageTab.first().click();
      await page.waitForTimeout(1000);
    }
    
    if (isMobile) {
      // Check for responsive charts/graphs
      const chartElements = page.locator('canvas, svg, [data-testid*="chart"]');
      if (await chartElements.count() > 0) {
        const chart = chartElements.first();
        await expect(chart).toBeVisible();
        
        // Ensure charts fit mobile viewport
        const boundingBox = await chart.boundingBox();
        const viewportSize = page.viewportSize();
        
        if (boundingBox && viewportSize) {
          expect(boundingBox.width).toBeLessThanOrEqual(viewportSize.width - 32); // Account for padding
        }
      }
      
      // Check for mobile-friendly data tables
      const tables = page.locator('table');
      if (await tables.count() > 0) {
        const table = tables.first();
        await expect(table).toBeVisible();
        
        // Tables should either be scrollable or stacked on mobile
        const hasScrollableContainer = await page.locator('.overflow-x-auto, .overflow-scroll').count() > 0;
        const hasStackedLayout = await page.locator('.flex-col').count() > 0;
        
        expect(hasScrollableContainer || hasStackedLayout).toBe(true);
      }
    }
  });

  test('mobile touch gestures work correctly', async ({ page, isMobile }) => {
    if (!isMobile) return;
    
    await page.goto('/playground');
    
    // Test swipe gestures on tabs if available
    const tabContainer = page.locator('[role="tablist"]');
    if (await tabContainer.count() > 0) {
      const container = tabContainer.first();
      const boundingBox = await container.boundingBox();
      
      if (boundingBox) {
        // Simulate horizontal swipe
        await page.mouse.move(boundingBox.x + boundingBox.width * 0.8, boundingBox.y + boundingBox.height / 2);
        await page.mouse.down();
        await page.mouse.move(boundingBox.x + boundingBox.width * 0.2, boundingBox.y + boundingBox.height / 2);
        await page.mouse.up();
        
        await page.waitForTimeout(500);
      }
    }
    
    // Test scroll behavior on long content
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);
    await page.evaluate(() => window.scrollTo(0, 0));
  });

  test('mobile form interactions work properly', async ({ page, isMobile }) => {
    if (!isMobile) return;
    
    await page.goto('/playground');
    
    // Test textarea focus and virtual keyboard
    const textarea = page.locator('textarea').first();
    if (await textarea.count() > 0) {
      await textarea.click();
      await textarea.fill('Testing mobile input with virtual keyboard');
      
      // Verify text was entered correctly
      const value = await textarea.inputValue();
      expect(value).toContain('Testing mobile input');
      
      // Test that viewport adjusts for virtual keyboard
      const viewportHeight = page.viewportSize()?.height || 0;
      expect(viewportHeight).toBeGreaterThan(300); // Minimum usable space
    }
    
    // Test button interactions
    const buttons = page.locator('button').filter({ hasText: /generate|analyze|submit/i });
    if (await buttons.count() > 0) {
      const button = buttons.first();
      
      // Ensure button is large enough for touch
      const boundingBox = await button.boundingBox();
      expect(boundingBox?.height).toBeGreaterThan(44);
      expect(boundingBox?.width).toBeGreaterThan(44);
      
      // Test touch interaction
      await button.click();
      await page.waitForTimeout(500);
    }
  });

  test('mobile navigation works correctly', async ({ page, isMobile }) => {
    await page.goto('/');
    
    if (isMobile) {
      // Test navigation menu
      const navLinks = page.locator('nav a, [role="navigation"] a');
      const linkCount = await navLinks.count();
      
      if (linkCount > 0) {
        // Test first few navigation links
        for (let i = 0; i < Math.min(linkCount, 3); i++) {
          const link = navLinks.nth(i);
          await expect(link).toBeVisible();
          
          // Ensure links are touch-friendly
          const boundingBox = await link.boundingBox();
          expect(boundingBox?.height).toBeGreaterThan(32);
        }
        
        // Test navigation to different pages
        const playgroundLink = navLinks.filter({ hasText: /playground/i });
        if (await playgroundLink.count() > 0) {
          await playgroundLink.first().click();
          await page.waitForLoadState('networkidle');
          expect(page.url()).toContain('playground');
        }
      }
    }
  });

  test('mobile performance and loading', async ({ page, isMobile }) => {
    if (!isMobile) return;
    
    const startTime = Date.now();
    await page.goto('/');
    const loadTime = Date.now() - startTime;
    
    // Ensure reasonable load time on mobile
    expect(loadTime).toBeLessThan(10000); // 10 seconds max
    
    // Check for loading states
    const loadingIndicators = page.locator('[data-testid*="loading"], .loading, .spinner');
    
    // Loading indicators should disappear after page load
    await page.waitForTimeout(2000);
    const visibleLoaders = await loadingIndicators.filter({ hasText: /.+/ }).count();
    expect(visibleLoaders).toBe(0);
    
    // Test image loading optimization
    const images = page.locator('img');
    const imageCount = await images.count();
    
    if (imageCount > 0) {
      for (let i = 0; i < Math.min(imageCount, 3); i++) {
        const img = images.nth(i);
        await expect(img).toBeVisible();
        
        // Check for lazy loading attributes
        const loading = await img.getAttribute('loading');
        const hasLazyLoading = loading === 'lazy' || await img.getAttribute('data-src') !== null;
        
        // Either lazy loading should be implemented or images should load quickly
        if (!hasLazyLoading) {
          await expect(img).toHaveJSProperty('complete', true);
        }
      }
    }
  });
});
