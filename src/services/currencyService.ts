import type { CNBData } from '../types/currency';
import { parseCNBData } from '../utils/cnbParser';

const CNB_API_URL = import.meta.env.DEV
  ? '/api/cnb/daily.txt'
  : 'https://api.allorigins.win/raw?url=https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt';

export const fetchExchangeRates = async (): Promise<CNBData> => {
  try {
    const response = await fetch(CNB_API_URL);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch exchange rates: ${response.statusText}`);
    }

    const text = await response.text();
    return parseCNBData(text);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error fetching exchange rates: ${error.message}`);
    }
    throw new Error('Unknown error occurred while fetching exchange rates');
  }
};

