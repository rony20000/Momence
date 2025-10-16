import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { ExchangeRatesList } from '../ExchangeRatesList';
import { theme } from '../../styles/theme';
import { ExchangeRate } from '../../types/currency';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('ExchangeRatesList', () => {
  const mockRates: ExchangeRate[] = [
    {
      country: 'EMU',
      currency: 'euro',
      amount: 1,
      code: 'EUR',
      rate: 25.123,
    },
    {
      country: 'USA',
      currency: 'dollar',
      amount: 1,
      code: 'USD',
      rate: 23.456,
    },
  ];

  it('should render list title', () => {
    renderWithTheme(<ExchangeRatesList rates={mockRates} date="16 Oct 2025" />);
    expect(screen.getByText('Exchange Rates')).toBeInTheDocument();
  });

  it('should render date', () => {
    renderWithTheme(<ExchangeRatesList rates={mockRates} date="16 Oct 2025" />);
    expect(screen.getByText(/16 Oct 2025/i)).toBeInTheDocument();
  });

  it('should render all rates', () => {
    renderWithTheme(<ExchangeRatesList rates={mockRates} date="16 Oct 2025" />);
    expect(screen.getByText('EUR')).toBeInTheDocument();
    expect(screen.getByText('USD')).toBeInTheDocument();
  });

  it('should show empty state when no rates', () => {
    renderWithTheme(<ExchangeRatesList rates={[]} date="16 Oct 2025" />);
    expect(screen.getByText('No exchange rates available')).toBeInTheDocument();
  });
});

