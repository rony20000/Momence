export type ExchangeRate = {
  country: string;
  currency: string;
  amount: number;
  code: string;
  rate: number;
};

export type CNBData = {
  date: string;
  rates: ExchangeRate[];
};

export type ConversionResult = {
  fromAmount: number;
  toAmount: number;
  fromCurrency: string;
  toCurrency: string;
  rate: number;
};

