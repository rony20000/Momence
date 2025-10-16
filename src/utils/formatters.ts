export const formatNumber = (value: number, decimals: number = 2): string => {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};

export const formatRate = (rate: number): string => {
  return formatNumber(rate, 3);
};

export const formatCurrency = (amount: number, currencyCode: string): string => {
  return `${formatNumber(amount, 2)} ${currencyCode}`;
};

