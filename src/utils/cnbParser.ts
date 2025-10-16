import type { CNBData, ExchangeRate } from '../types/currency';

export const parseCNBData = (text: string): CNBData => {
  const lines = text.trim().split('\n');
  
  if (lines.length < 3) {
    throw new Error('Invalid CNB data format');
  }

  const dateLine = lines[0];
  const dateMatch = dateLine.match(/(\d{2}\s+\w+\s+\d{4})/);
  
  if (!dateMatch) {
    throw new Error('Could not parse date from CNB data');
  }

  const date = dateMatch[1];

  const rates: ExchangeRate[] = [];

  for (let i = 2; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const parts = line.split('|');
    
    if (parts.length !== 5) {
      console.warn(`Skipping invalid line: ${line}`);
      continue;
    }

    const [country, currency, amountStr, code, rateStr] = parts;

    const amount = parseInt(amountStr, 10);
    const rate = parseFloat(rateStr.replace(',', '.'));

    if (isNaN(amount) || isNaN(rate)) {
      console.warn(`Skipping line with invalid numbers: ${line}`);
      continue;
    }

    rates.push({
      country: country.trim(),
      currency: currency.trim(),
      amount,
      code: code.trim(),
      rate,
    });
  }

  if (rates.length === 0) {
    throw new Error('No valid exchange rates found in CNB data');
  }

  return {
    date,
    rates,
  };
};

export const convertCurrency = (
  amountInCZK: number,
  targetRate: ExchangeRate
): number => {
  if (amountInCZK < 0) {
    throw new Error('Amount cannot be negative');
  }

  const result = (amountInCZK * targetRate.amount) / targetRate.rate;
  
  return Math.round(result * 100) / 100; 
};

