import { test, expect } from '@playwright/test';

test.describe('Critical User Flow', () => {
  test('complete user journey: view rates and convert currency', async ({ page }) => {
    // Step 1: Navigate to the app
    await page.goto('/');
    
    // Step 2: Verify page loads
    await expect(page.getByRole('heading', { name: /Currency Exchange Rates/i })).toBeVisible();
    
    // Step 3: Wait for exchange rates to load
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000); // Wait for API
    
    // Step 4: Verify exchange rates are displayed
    await expect(page.locator('text=EUR').nth(1)).toBeVisible();
    await expect(page.locator('text=USD').nth(1)).toBeVisible();
    
    // Step 5: Scroll to converter (if needed)
    const converter = page.getByRole('heading', { name: /Currency Converter/i });
    await converter.scrollIntoViewIfNeeded();
    
    // Step 6: Enter amount to convert
    const amountInput = page.getByLabel(/Amount in CZK/i);
    await amountInput.click();
    await amountInput.fill('1000');
    
    // Step 7: Verify default conversion (EUR)
    await page.waitForTimeout(500);
    await expect(page.getByText(/1000 CZK =/i)).toBeVisible();

    // Step 8: Change currency to USD
    const currencySelect = page.getByLabel(/Convert to/i);
    await currencySelect.selectOption('USD');

    // Step 9: Verify USD conversion
    await page.waitForTimeout(500);
    await expect(page.getByText(/1000 CZK =/i)).toBeVisible();
    
    // Step 10: Try different amount
    await amountInput.click();
    await amountInput.fill('500');
    await page.waitForTimeout(500);
    await expect(page.getByText(/500 CZK =/i)).toBeVisible();
    
    // Step 11: Try GBP
    await currencySelect.selectOption('GBP');
    await page.waitForTimeout(500);
    await expect(page.getByText(/500 CZK =/i)).toBeVisible();
    
    // Step 12: Verify conversion rate is shown
    await expect(page.getByText(/Rate:/i)).toBeVisible();
    
    // Success: User completed full journey
  });

  test('error recovery flow: invalid input to valid conversion', async ({ page }) => {
    // Step 1: Navigate and wait for load
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    // Step 2: Enter invalid input
    const amountInput = page.getByLabel(/Amount in CZK/i);
    await amountInput.fill('invalid');
    
    // Step 3: Verify error is shown
    await expect(page.getByText(/valid number/i)).toBeVisible();
    
    // Step 4: Correct the input
    await amountInput.fill('250');
    await page.waitForTimeout(500);
    
    // Step 5: Verify error is cleared and conversion works
    await expect(page.getByText(/valid number/i)).not.toBeVisible();
    await expect(page.getByText(/250 CZK =/i)).toBeVisible();
    
    // Step 6: Try negative number
    await amountInput.fill('-50');
    
    // Step 7: Verify negative error
    await expect(page.getByText(/cannot be negative/i)).toBeVisible();
    
    // Step 8: Fix with positive number
    await amountInput.fill('50');
    await page.waitForTimeout(500);
    
    // Step 9: Verify recovery
    await expect(page.getByText(/cannot be negative/i)).not.toBeVisible();
    await expect(page.getByText(/50 CZK =/i)).toBeVisible();
  });

  test('multi-currency comparison flow', async ({ page }) => {
    // User wants to compare how much 1000 CZK is in different currencies
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    const amountInput = page.getByLabel(/Amount in CZK/i);
    const currencySelect = page.getByLabel(/Convert to/i);
    
    // Enter amount once
    await amountInput.fill('1000');
    await page.waitForTimeout(500);
    
    // Test EUR
    await currencySelect.selectOption('EUR');
    await page.waitForTimeout(500);
    const eurResult = await page.getByText(/1000 CZK =/i).textContent();
    expect(eurResult).toContain('EUR');

    // Test USD
    await currencySelect.selectOption('USD');
    await page.waitForTimeout(500);
    const usdResult = await page.getByText(/1000 CZK =/i).textContent();
    expect(usdResult).toContain('USD');

    // Test GBP
    await currencySelect.selectOption('GBP');
    await page.waitForTimeout(500);
    const gbpResult = await page.getByText(/1000 CZK =/i).textContent();
    expect(gbpResult).toContain('GBP');

    // Test JPY (multi-unit currency)
    await currencySelect.selectOption('JPY');
    await page.waitForTimeout(500);
    const jpyResult = await page.getByText(/1000 CZK =/i).textContent();
    expect(jpyResult).toContain('JPY');
  });

  test('mobile user flow', async ({ page }) => {
    // Simulate mobile device
    await page.setViewportSize({ width: 375, height: 667 });

    // Navigate
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    // Verify mobile layout
    await expect(page.getByRole('heading', { name: /Currency Exchange Rates/i })).toBeVisible();

    // Scroll to converter
    const converter = page.getByRole('heading', { name: /Currency Converter/i });
    await converter.scrollIntoViewIfNeeded();

    // Use converter on mobile (use click instead of tap)
    const amountInput = page.getByLabel(/Amount in CZK/i);
    await amountInput.click();
    await amountInput.fill('500');

    // Verify result on mobile
    await page.waitForTimeout(500);
    await expect(page.getByText(/500 CZK =/i)).toBeVisible();

    // Change currency on mobile
    const currencySelect = page.getByLabel(/Convert to/i);
    await currencySelect.click();
    await currencySelect.selectOption('USD');

    // Verify mobile conversion
    await page.waitForTimeout(500);
    await expect(page.getByText(/500 CZK =/i)).toBeVisible();

    // Scroll to see exchange rates
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(page.locator('text=EUR').nth(1)).toBeVisible();
  });

  test('keyboard navigation flow', async ({ page }) => {
    // Test keyboard-only navigation
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    // Focus on amount input directly
    const amountInput = page.getByLabel(/Amount in CZK/i);
    await amountInput.focus();

    // Type amount
    await page.keyboard.type('750');
    await page.waitForTimeout(500);

    // Verify conversion
    await expect(page.getByText(/750 CZK =/i)).toBeVisible();

    // Tab to currency select
    await page.keyboard.press('Tab');

    // Use arrow keys to change currency
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(500);

    // Verify conversion still shows
    await expect(page.getByText(/750 CZK =/i)).toBeVisible();
  });

  test('decimal precision flow', async ({ page }) => {
    // Test various decimal inputs
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    const amountInput = page.getByLabel(/Amount in CZK/i);
    
    // Test .5
    await amountInput.fill('100.5');
    await page.waitForTimeout(500);
    await expect(page.getByText(/100.5 CZK =/i)).toBeVisible();
    
    // Test .25
    await amountInput.fill('50.25');
    await page.waitForTimeout(500);
    await expect(page.getByText(/50.25 CZK =/i)).toBeVisible();
    
    // Test .99
    await amountInput.fill('99.99');
    await page.waitForTimeout(500);
    await expect(page.getByText(/99.99 CZK =/i)).toBeVisible();
    
    // All should work without errors
    await expect(page.getByText(/valid number/i)).not.toBeVisible();
  });
});

