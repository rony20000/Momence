import { useState, useMemo, useEffect } from 'react';
import styled from 'styled-components';
import type { ExchangeRate } from '../types/currency';
import { convertCurrency } from '../utils/cnbParser';
import { formatCurrency } from '../utils/formatters';

const ConverterContainer = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  margin-bottom: 3rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  width: 100%;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: 1.5rem;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text.dark};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 2px solid ${props => props.theme.colors.border.default};
  border-radius: 0.5rem;
  transition: all 0.2s;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &::placeholder {
    color: ${props => props.theme.colors.text.light};
  }

  &:disabled {
    background-color: ${props => props.theme.colors.background.gray};
    cursor: not-allowed;
  }
`;

const Select = styled.select`
  padding: 0.75rem 2.5rem 0.75rem 1rem;
  font-size: 1rem;
  border: 2px solid ${props => props.theme.colors.border.default};
  border-radius: 0.5rem;
  transition: all 0.2s;
  font-family: inherit;
  background-color: white;
  color: ${props => props.theme.colors.text.primary};
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1.25rem;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &:disabled {
    background-color: ${props => props.theme.colors.background.gray};
    cursor: not-allowed;
  }

  option {
    background-color: white;
    color: ${props => props.theme.colors.text.primary};
    padding: 0.5rem;
  }
`;

const ResultContainer = styled.div`
  background: ${props => props.theme.colors.gradient.primary};
  border-radius: 0.75rem;
  padding: 1.5rem;
  text-align: center;
`;

const ResultLabel = styled.div`
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ResultValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: white;
  word-break: break-word;
`;

const ErrorText = styled.div`
  color: ${props => props.theme.colors.error};
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

const ConversionInfo = styled.div`
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.8);
  margin-top: 0.75rem;
`;

interface CurrencyConverterProps {
  rates: ExchangeRate[];
}

export const CurrencyConverter = ({ rates }: CurrencyConverterProps) => {
  const [amount, setAmount] = useState<string>('');
  const [selectedCurrency, setSelectedCurrency] = useState<string>('');
  const [error, setError] = useState<string>('');

  const sortedRates = useMemo(() => {
    return [...rates].sort((a, b) => a.code.localeCompare(b.code));
  }, [rates]);

  useEffect(() => {
    if (sortedRates.length > 0 && !selectedCurrency) {
      const eurRate = sortedRates.find(r => r.code === 'EUR');
      setSelectedCurrency(eurRate?.code || sortedRates[0].code);
    }
  }, [sortedRates, selectedCurrency]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmount(value);
    setError('');

    if (value && isNaN(Number(value))) {
      setError('Please enter a valid number');
    } else if (value && Number(value) < 0) {
      setError('Amount cannot be negative');
    }
  };

  const selectedRate = sortedRates.find(r => r.code === selectedCurrency);

  const convertedAmount = useMemo(() => {
    if (!amount || !selectedRate || error) {
      return null;
    }

    const amountNum = Number(amount);
    if (isNaN(amountNum) || amountNum < 0) {
      return null;
    }

    try {
      return convertCurrency(amountNum, selectedRate);
    } catch {
      return null;
    }
  }, [amount, selectedRate, error]);

  return (
    <ConverterContainer>
      <Title>Currency Converter</Title>
      <Form onSubmit={(e) => e.preventDefault()}>
        <FormGroup>
          <Label htmlFor="amount">Amount in CZK</Label>
          <Input
            id="amount"
            type="text"
            inputMode="decimal"
            placeholder="Enter amount in CZK"
            value={amount}
            onChange={handleAmountChange}
            disabled={rates.length === 0}
          />
          {error && <ErrorText>{error}</ErrorText>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="currency">Convert to</Label>
          <Select
            id="currency"
            value={selectedCurrency}
            onChange={(e) => setSelectedCurrency(e.target.value)}
            disabled={rates.length === 0}
          >
            {sortedRates.map((rate) => (
              <option key={rate.code} value={rate.code}>
                {rate.code} - {rate.currency} ({rate.country})
              </option>
            ))}
          </Select>
        </FormGroup>

        {convertedAmount !== null && selectedRate && (
          <ResultContainer>
            <ResultLabel>Converted Amount</ResultLabel>
            <ResultValue>
              {formatCurrency(convertedAmount, selectedRate.code)}
            </ResultValue>
            <ConversionInfo>
              {amount} CZK = {formatCurrency(convertedAmount, selectedRate.code)}
              <br />
              Rate: {selectedRate.amount} {selectedRate.code} = {selectedRate.rate} CZK
            </ConversionInfo>
          </ResultContainer>
        )}
      </Form>
    </ConverterContainer>
  );
};

