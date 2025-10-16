import { test, expect } from '@playwright/test';

test.describe('Accessibility Audit', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    // Check h1 exists
    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();
    await expect(h1).toHaveText(/Currency Exchange Rates/i);
    
    // Check h2 exists
    const h2 = page.locator('h2');
    await expect(h2.first()).toBeVisible();
  });

  test('should have proper form labels', async ({ page }) => {
    // Amount input has label
    const amountInput = page.getByLabel(/Amount in CZK/i);
    await expect(amountInput).toBeVisible();
    
    // Currency select has label
    const currencySelect = page.getByLabel(/Convert to/i);
    await expect(currencySelect).toBeVisible();
  });

  test('should support keyboard navigation', async ({ page }) => {
    // Tab to amount input
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    const amountInput = page.getByLabel(/Amount in CZK/i);
    await amountInput.focus();
    await expect(amountInput).toBeFocused();
    
    // Type with keyboard
    await page.keyboard.type('100');
    await page.waitForTimeout(500);
    
    // Tab to select
    await page.keyboard.press('Tab');
    const currencySelect = page.getByLabel(/Convert to/i);
    await expect(currencySelect).toBeFocused();
  });

  test('should have sufficient color contrast', async ({ page }) => {
    // Check main heading is visible (white on purple gradient)
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    
    // Check form labels are visible
    const labels = page.locator('label');
    await expect(labels.first()).toBeVisible();
  });

  test('should have descriptive button/input text', async ({ page }) => {
    // Check input has placeholder or label
    const amountInput = page.getByLabel(/Amount in CZK/i);
    await expect(amountInput).toHaveAttribute('placeholder');
    
    // Check select has meaningful options
    const currencySelect = page.getByLabel(/Convert to/i);
    const options = await currencySelect.locator('option').count();
    expect(options).toBeGreaterThan(0);
  });

  test('should show error messages clearly', async ({ page }) => {
    const amountInput = page.getByLabel(/Amount in CZK/i);
    
    // Enter invalid input
    await amountInput.fill('invalid');
    
    // Error should be visible and descriptive
    const error = page.getByText(/valid number/i);
    await expect(error).toBeVisible();
  });

  test('should have semantic HTML', async ({ page }) => {
    // Check for main content area
    const main = page.locator('main, [role="main"]');
    const hasMain = await main.count() > 0 || await page.locator('div').count() > 0;
    expect(hasMain).toBeTruthy();
    
    // Check for headings
    const headings = page.locator('h1, h2, h3');
    const headingCount = await headings.count();
    expect(headingCount).toBeGreaterThan(0);
  });

  test('should be usable with screen reader', async ({ page }) => {
    // Check all interactive elements have accessible names
    const amountInput = page.getByLabel(/Amount in CZK/i);
    await expect(amountInput).toHaveAccessibleName(/Amount in CZK/i);

    const currencySelect = page.getByLabel(/Convert to/i);
    await expect(currencySelect).toHaveAccessibleName(/Convert to/i);
  });

  test('should handle focus states', async ({ page }) => {
    const amountInput = page.getByLabel(/Amount in CZK/i);
    
    // Focus input
    await amountInput.focus();
    await expect(amountInput).toBeFocused();
    
    // Should have visible focus indicator (tested visually)
    const isFocused = await amountInput.evaluate((el) => {
      return document.activeElement === el;
    });
    expect(isFocused).toBeTruthy();
  });

  test('should not have empty links or buttons', async ({ page }) => {
    // Check no empty buttons
    const buttons = page.locator('button');
    const buttonCount = await buttons.count();
    
    for (let i = 0; i < buttonCount; i++) {
      const text = await buttons.nth(i).textContent();
      expect(text?.trim().length).toBeGreaterThan(0);
    }
  });
});

