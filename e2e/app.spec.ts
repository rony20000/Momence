import { test, expect } from '@playwright/test';

test.describe('Currency Exchange Rate Converter', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load the application successfully', async ({ page }) => {
    // Check page title
    await expect(page).toHaveTitle(/momence/i);
    
    // Check main heading
    await expect(page.getByRole('heading', { name: /Currency Exchange Rates/i })).toBeVisible();
    
    // Check subtitle
    await expect(page.getByText(/Live rates from Czech National Bank/i)).toBeVisible();
  });

  test('should display exchange rates after loading', async ({ page }) => {
    // Wait for data to load (loading spinner should disappear)
    await expect(page.getByText(/Loading/i)).toBeHidden({ timeout: 10000 });

    // Check that currency cards are displayed by looking for currency codes in the list
    await expect(page.locator('text=EUR').nth(1)).toBeVisible({ timeout: 10000 });
    await expect(page.locator('text=USD').nth(1)).toBeVisible();
  });

  test('should display currency converter form', async ({ page }) => {
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Check converter title
    await expect(page.getByRole('heading', { name: /Currency Converter/i })).toBeVisible();
    
    // Check amount input
    const amountInput = page.getByLabel(/Amount in CZK/i);
    await expect(amountInput).toBeVisible();
    
    // Check currency select
    const currencySelect = page.getByLabel(/Convert to/i);
    await expect(currencySelect).toBeVisible();
  });

  test('should convert CZK to EUR', async ({ page }) => {
    // Wait for data to load
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000); // Give time for API to load

    // Enter amount
    const amountInput = page.getByLabel(/Amount in CZK/i);
    await amountInput.fill('1000');

    // Wait for conversion result
    await page.waitForTimeout(500);

    // Check that conversion equation is shown
    await expect(page.getByText(/1000 CZK =/i)).toBeVisible();
  });

  test('should change currency and update conversion', async ({ page }) => {
    // Wait for data to load
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    // Enter amount
    const amountInput = page.getByLabel(/Amount in CZK/i);
    await amountInput.fill('500');

    // Select USD by value
    const currencySelect = page.getByLabel(/Convert to/i);
    await currencySelect.selectOption('USD');

    // Wait for conversion
    await page.waitForTimeout(500);

    // Check conversion equation is shown
    await expect(page.getByText(/500 CZK =/i)).toBeVisible();
  });

  test('should validate negative numbers', async ({ page }) => {
    // Wait for data to load
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    // Enter negative amount
    const amountInput = page.getByLabel(/Amount in CZK/i);
    await amountInput.fill('-100');
    
    // Check error message
    await expect(page.getByText(/cannot be negative/i)).toBeVisible();
  });

  test('should validate invalid input', async ({ page }) => {
    // Wait for data to load
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    // Enter invalid input
    const amountInput = page.getByLabel(/Amount in CZK/i);
    await amountInput.fill('abc');
    
    // Check error message
    await expect(page.getByText(/valid number/i)).toBeVisible();
  });

  test('should handle decimal amounts', async ({ page }) => {
    // Wait for data to load
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    // Enter decimal amount
    const amountInput = page.getByLabel(/Amount in CZK/i);
    await amountInput.fill('50.5');
    
    // Wait for conversion
    await page.waitForTimeout(500);
    
    // Should show result without error
    await expect(page.getByText(/50.5 CZK =/i)).toBeVisible();
    await expect(page.getByText(/valid number/i)).not.toBeVisible();
  });

  test('should handle zero amount', async ({ page }) => {
    // Wait for data to load
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    // Enter zero
    const amountInput = page.getByLabel(/Amount in CZK/i);
    await amountInput.fill('0');
    
    // Wait for conversion
    await page.waitForTimeout(500);
    
    // Should show 0.00 result
    await expect(page.getByText(/0 CZK =/i)).toBeVisible();
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Wait for data to load
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    // Check elements are still visible
    await expect(page.getByRole('heading', { name: /Currency Exchange Rates/i })).toBeVisible();
    await expect(page.getByLabel(/Amount in CZK/i)).toBeVisible();
    
    // Check that converter works on mobile
    const amountInput = page.getByLabel(/Amount in CZK/i);
    await amountInput.fill('100');
    await page.waitForTimeout(500);
    await expect(page.getByText(/100 CZK =/i)).toBeVisible();
  });

  test('should display date in exchange rates list', async ({ page }) => {
    // Wait for data to load
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    // Check that date is displayed (look for the one with bullet point)
    await expect(page.locator('text=/Czech National Bank • \\d+/')).toBeVisible();
  });

  test('should show multiple currencies in the list', async ({ page }) => {
    // Wait for data to load
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    // Check for various currencies in the exchange rates list (not in dropdown)
    const currencies = ['EUR', 'USD', 'GBP', 'JPY', 'CHF'];

    for (const currency of currencies) {
      // Use nth(1) to skip the dropdown option and get the card
      await expect(page.locator(`text=${currency}`).nth(1)).toBeVisible();
    }
  });

  test('should handle large numbers', async ({ page }) => {
    // Wait for data to load
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    // Enter large amount
    const amountInput = page.getByLabel(/Amount in CZK/i);
    await amountInput.fill('1000000');
    
    // Wait for conversion
    await page.waitForTimeout(500);
    
    // Should show result with formatted number
    await expect(page.getByText(/1000000 CZK =/i)).toBeVisible();
  });

  test('should update conversion in real-time', async ({ page }) => {
    // Wait for data to load
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    const amountInput = page.getByLabel(/Amount in CZK/i);
    
    // Enter first amount
    await amountInput.fill('100');
    await page.waitForTimeout(500);
    await expect(page.getByText(/100 CZK =/i)).toBeVisible();
    
    // Change amount
    await amountInput.fill('200');
    await page.waitForTimeout(500);
    await expect(page.getByText(/200 CZK =/i)).toBeVisible();
    
    // Verify old amount is not shown
    await expect(page.getByText(/100 CZK =/i)).not.toBeVisible();
  });

  test('should have accessible form elements', async ({ page }) => {
    // Wait for data to load
    await page.waitForLoadState('networkidle');
    
    // Check that form elements have proper labels
    const amountInput = page.getByLabel(/Amount in CZK/i);
    await expect(amountInput).toBeVisible();
    
    const currencySelect = page.getByLabel(/Convert to/i);
    await expect(currencySelect).toBeVisible();
    
    // Check that elements are keyboard accessible
    await amountInput.focus();
    await expect(amountInput).toBeFocused();
    
    await page.keyboard.press('Tab');
    await expect(currencySelect).toBeFocused();
  });

  test('should clear error when valid input is entered', async ({ page }) => {
    // Wait for data to load
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    const amountInput = page.getByLabel(/Amount in CZK/i);
    
    // Enter invalid input
    await amountInput.fill('abc');
    await expect(page.getByText(/valid number/i)).toBeVisible();
    
    // Enter valid input
    await amountInput.fill('100');
    await page.waitForTimeout(500);
    
    // Error should be gone
    await expect(page.getByText(/valid number/i)).not.toBeVisible();
    await expect(page.getByText(/100 CZK =/i)).toBeVisible();
  });
});

