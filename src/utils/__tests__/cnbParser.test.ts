import { describe, it, expect } from 'vitest';
import { parseCNBData, convertCurrency } from '../cnbParser';
import { ExchangeRate } from '../../types/currency';

describe('parseCNBData', () => {
  const sampleCNBData = `16 Oct 2025 #203
Country|Currency|Amount|Code|Rate
Australia|dollar|1|AUD|15.234
Brazil|real|1|BRL|4.123
Canada|dollar|1|CAD|16.789`;

  it('should parse valid CNB data correctly', () => {
    const result = parseCNBData(sampleCNBData);

    expect(result.date).toBe('16 Oct 2025');
    expect(result.rates).toHaveLength(3);
    expect(result.rates[0]).toEqual({
      country: 'Australia',
      currency: 'dollar',
      amount: 1,
      code: 'AUD',
      rate: 15.234,
    });
  });

  it('should handle rates with comma as decimal separator', () => {
    const dataWithComma = `16 Oct 2025 #203
Country|Currency|Amount|Code|Rate
EMU|euro|1|EUR|25,123`;

    const result = parseCNBData(dataWithComma);
    expect(result.rates[0].rate).toBe(25.123);
  });

  it('should handle multi-unit amounts', () => {
    const dataWithMultiUnit = `16 Oct 2025 #203
Country|Currency|Amount|Code|Rate
Japan|yen|100|JPY|15.234`;

    const result = parseCNBData(dataWithMultiUnit);
    expect(result.rates[0].amount).toBe(100);
    expect(result.rates[0].rate).toBe(15.234);
  });

  it('should throw error for invalid format', () => {
    expect(() => parseCNBData('')).toThrow('Invalid CNB data format');
    expect(() => parseCNBData('invalid data')).toThrow();
  });

  it('should skip invalid lines but parse valid ones', () => {
    const dataWithInvalidLine = `16 Oct 2025 #203
Country|Currency|Amount|Code|Rate
Australia|dollar|1|AUD|15.234
Invalid|Line
Canada|dollar|1|CAD|16.789`;

    const result = parseCNBData(dataWithInvalidLine);
    expect(result.rates).toHaveLength(2);
    expect(result.rates[0].code).toBe('AUD');
    expect(result.rates[1].code).toBe('CAD');
  });
});

describe('convertCurrency', () => {
  const mockRate: ExchangeRate = {
    country: 'EMU',
    currency: 'euro',
    amount: 1,
    code: 'EUR',
    rate: 25.0,
  };

  it('should convert CZK to foreign currency correctly', () => {
    const result = convertCurrency(100, mockRate);
    expect(result).toBe(4.0); // 100 CZK / 25 = 4 EUR
  });

  it('should handle multi-unit rates correctly', () => {
    const yenRate: ExchangeRate = {
      country: 'Japan',
      currency: 'yen',
      amount: 100,
      code: 'JPY',
      rate: 15.0,
    };

    const result = convertCurrency(150, yenRate);
    expect(result).toBe(1000); // 150 CZK * (100/15) = 1000 JPY
  });

  it('should round to 2 decimal places', () => {
    const result = convertCurrency(100, {
      ...mockRate,
      rate: 24.999,
    });
    expect(result).toBe(4.0);
  });

  it('should handle zero amount', () => {
    const result = convertCurrency(0, mockRate);
    expect(result).toBe(0);
  });

  it('should throw error for negative amounts', () => {
    expect(() => convertCurrency(-100, mockRate)).toThrow('Amount cannot be negative');
  });

  it('should handle decimal CZK amounts', () => {
    const result = convertCurrency(50.5, mockRate);
    expect(result).toBe(2.02); // 50.5 / 25 = 2.02
  });
});

