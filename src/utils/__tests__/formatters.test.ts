import { describe, it, expect } from 'vitest';
import { formatNumber, formatRate, formatCurrency } from '../formatters';

describe('formatters', () => {
  describe('formatNumber', () => {
    it('should format number with default 2 decimals', () => {
      expect(formatNumber(1234.5678)).toBe('1,234.57');
    });

    it('should format number with specified decimals', () => {
      expect(formatNumber(1234.5678, 3)).toBe('1,234.568');
    });

    it('should handle whole numbers', () => {
      expect(formatNumber(1000)).toBe('1,000.00');
    });

    it('should handle small numbers', () => {
      expect(formatNumber(0.123)).toBe('0.12');
    });
  });

  describe('formatRate', () => {
    it('should format rate with 3 decimals', () => {
      expect(formatRate(25.12345)).toBe('25.123');
    });

    it('should handle whole number rates', () => {
      expect(formatRate(25)).toBe('25.000');
    });
  });

  describe('formatCurrency', () => {
    it('should format currency with code', () => {
      expect(formatCurrency(100.5, 'EUR')).toBe('100.50 EUR');
    });

    it('should format large amounts', () => {
      expect(formatCurrency(1234567.89, 'USD')).toBe('1,234,567.89 USD');
    });
  });
});

