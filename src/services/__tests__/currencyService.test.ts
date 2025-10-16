import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchExchangeRates } from '../currencyService';

// Mock fetch for tests
const mockCNBResponse = `16 Oct 2025 #203
Country|Currency|Amount|Code|Rate
Australia|dollar|1|AUD|15.234
EMU|euro|1|EUR|25.123`;

describe('fetchExchangeRates', () => {
  beforeEach(() => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        text: () => Promise.resolve(mockCNBResponse),
      } as Response)
    );
  });

  it('should fetch and parse CNB data', async () => {
    const result = await fetchExchangeRates();

    expect(result).toBeDefined();
    expect(result.date).toBe('16 Oct 2025');
    expect(result.rates).toBeDefined();
    expect(result.rates.length).toBe(2);

    // Check structure of first rate
    const firstRate = result.rates[0];
    expect(firstRate).toHaveProperty('country');
    expect(firstRate).toHaveProperty('currency');
    expect(firstRate).toHaveProperty('amount');
    expect(firstRate).toHaveProperty('code');
    expect(firstRate).toHaveProperty('rate');

    // Verify types
    expect(typeof firstRate.country).toBe('string');
    expect(typeof firstRate.currency).toBe('string');
    expect(typeof firstRate.amount).toBe('number');
    expect(typeof firstRate.code).toBe('string');
    expect(typeof firstRate.rate).toBe('number');
  });

  it('should handle fetch errors', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        statusText: 'Not Found',
      } as Response)
    );

    await expect(fetchExchangeRates()).rejects.toThrow('Failed to fetch exchange rates');
  });
});

