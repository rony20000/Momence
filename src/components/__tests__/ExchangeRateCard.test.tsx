import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { ExchangeRateCard } from '../ExchangeRateCard';
import { theme } from '../../styles/theme';
import { ExchangeRate } from '../../types/currency';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('ExchangeRateCard', () => {
  const mockRate: ExchangeRate = {
    country: 'EMU',
    currency: 'euro',
    amount: 1,
    code: 'EUR',
    rate: 25.123,
  };

  it('should render currency code', () => {
    renderWithTheme(<ExchangeRateCard rate={mockRate} />);
    expect(screen.getByText('EUR')).toBeInTheDocument();
  });

  it('should render currency name', () => {
    renderWithTheme(<ExchangeRateCard rate={mockRate} />);
    expect(screen.getByText('euro')).toBeInTheDocument();
  });

  it('should render country name', () => {
    renderWithTheme(<ExchangeRateCard rate={mockRate} />);
    expect(screen.getByText('EMU')).toBeInTheDocument();
  });

  it('should render formatted rate', () => {
    renderWithTheme(<ExchangeRateCard rate={mockRate} />);
    expect(screen.getByText('25.123')).toBeInTheDocument();
  });

  it('should show amount info for multi-unit rates', () => {
    const multiUnitRate: ExchangeRate = {
      ...mockRate,
      amount: 100,
      code: 'JPY',
    };
    renderWithTheme(<ExchangeRateCard rate={multiUnitRate} />);
    expect(screen.getByText(/per 100 JPY/i)).toBeInTheDocument();
  });

  it('should not show amount info for single-unit rates', () => {
    renderWithTheme(<ExchangeRateCard rate={mockRate} />);
    expect(screen.queryByText(/per 1/i)).not.toBeInTheDocument();
  });
});

