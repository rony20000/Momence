import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { CurrencyConverter } from '../CurrencyConverter';
import { theme } from '../../styles/theme';
import type { ExchangeRate } from '../../types/currency';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('CurrencyConverter', () => {
  const mockRates: ExchangeRate[] = [
    {
      country: 'EMU',
      currency: 'euro',
      amount: 1,
      code: 'EUR',
      rate: 25.0,
    },
    {
      country: 'USA',
      currency: 'dollar',
      amount: 1,
      code: 'USD',
      rate: 20.0,
    },
    {
      country: 'Japan',
      currency: 'yen',
      amount: 100,
      code: 'JPY',
      rate: 15.0,
    },
  ];

  it('should render converter title', () => {
    renderWithTheme(<CurrencyConverter rates={mockRates} />);
    expect(screen.getByText('Currency Converter')).toBeInTheDocument();
  });

  it('should render amount input field', () => {
    renderWithTheme(<CurrencyConverter rates={mockRates} />);
    expect(screen.getByLabelText(/amount in czk/i)).toBeInTheDocument();
  });

  it('should render currency selector', () => {
    renderWithTheme(<CurrencyConverter rates={mockRates} />);
    expect(screen.getByLabelText(/convert to/i)).toBeInTheDocument();
  });

  it('should display all currencies in selector', () => {
    renderWithTheme(<CurrencyConverter rates={mockRates} />);
    const select = screen.getByLabelText(/convert to/i) as HTMLSelectElement;
    expect(select.options.length).toBe(3);
  });

  it('should update amount when user types', () => {
    renderWithTheme(<CurrencyConverter rates={mockRates} />);
    const input = screen.getByLabelText(/amount in czk/i) as HTMLInputElement;
    
    fireEvent.change(input, { target: { value: '100' } });
    expect(input.value).toBe('100');
  });

  it('should calculate and display conversion result', () => {
    renderWithTheme(<CurrencyConverter rates={mockRates} />);
    const input = screen.getByLabelText(/amount in czk/i);

    fireEvent.change(input, { target: { value: '100' } });

    // Should show converted amount (100 CZK / 25 = 4 EUR)
    expect(screen.getByText(/converted amount/i)).toBeInTheDocument();
    expect(screen.getAllByText(/4\.00 EUR/i).length).toBeGreaterThan(0);
  });

  it('should update conversion when currency changes', () => {
    renderWithTheme(<CurrencyConverter rates={mockRates} />);
    const input = screen.getByLabelText(/amount in czk/i);
    const select = screen.getByLabelText(/convert to/i);

    fireEvent.change(input, { target: { value: '100' } });
    fireEvent.change(select, { target: { value: 'USD' } });

    // Should show USD conversion (100 CZK / 20 = 5 USD)
    expect(screen.getAllByText(/5\.00 USD/i).length).toBeGreaterThan(0);
  });

  it('should show error for invalid input', () => {
    renderWithTheme(<CurrencyConverter rates={mockRates} />);
    const input = screen.getByLabelText(/amount in czk/i);
    
    fireEvent.change(input, { target: { value: 'abc' } });
    
    expect(screen.getByText(/please enter a valid number/i)).toBeInTheDocument();
  });

  it('should show error for negative numbers', () => {
    renderWithTheme(<CurrencyConverter rates={mockRates} />);
    const input = screen.getByLabelText(/amount in czk/i);
    
    fireEvent.change(input, { target: { value: '-100' } });
    
    expect(screen.getByText(/amount cannot be negative/i)).toBeInTheDocument();
  });

  it('should not show result when input is empty', () => {
    renderWithTheme(<CurrencyConverter rates={mockRates} />);
    
    expect(screen.queryByText(/converted amount/i)).not.toBeInTheDocument();
  });

  it('should handle decimal amounts', () => {
    renderWithTheme(<CurrencyConverter rates={mockRates} />);
    const input = screen.getByLabelText(/amount in czk/i);

    fireEvent.change(input, { target: { value: '50.5' } });

    // Should show converted amount (50.5 CZK / 25 = 2.02 EUR)
    expect(screen.getAllByText(/2\.02 EUR/i).length).toBeGreaterThan(0);
  });

  it('should handle multi-unit currencies correctly', () => {
    renderWithTheme(<CurrencyConverter rates={mockRates} />);
    const input = screen.getByLabelText(/amount in czk/i);
    const select = screen.getByLabelText(/convert to/i);

    fireEvent.change(input, { target: { value: '150' } });
    fireEvent.change(select, { target: { value: 'JPY' } });

    // Should show JPY conversion (150 CZK * (100/15) = 1000 JPY)
    expect(screen.getAllByText(/1,000\.00 JPY/i).length).toBeGreaterThan(0);
  });

  it('should disable inputs when no rates available', () => {
    renderWithTheme(<CurrencyConverter rates={[]} />);
    const input = screen.getByLabelText(/amount in czk/i) as HTMLInputElement;
    const select = screen.getByLabelText(/convert to/i) as HTMLSelectElement;
    
    expect(input.disabled).toBe(true);
    expect(select.disabled).toBe(true);
  });

  it('should display conversion rate info', () => {
    renderWithTheme(<CurrencyConverter rates={mockRates} />);
    const input = screen.getByLabelText(/amount in czk/i);
    
    fireEvent.change(input, { target: { value: '100' } });
    
    expect(screen.getByText(/rate:/i)).toBeInTheDocument();
  });
});

