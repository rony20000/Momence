import styled from 'styled-components';
import type { ExchangeRate } from '../types/currency';
import { formatRate } from '../utils/formatters';
import { getFlagEmoji } from '../constants/flags';

const Card = styled.div`
  background: ${props => props.theme.colors.background.white};
  border-radius: 0.75rem;
  padding: 1.25rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  transition: all 0.2s ease-in-out;
  border: 1px solid ${props => props.theme.colors.border.default};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
`;

const CurrencyCode = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  letter-spacing: 0.5px;
`;

const Flag = styled.div`
  font-size: 2rem;
  line-height: 1;
`;

const CurrencyName = styled.div`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.text.secondary};
  margin-bottom: 0.5rem;
  text-transform: capitalize;
`;

const Country = styled.div`
  font-size: 0.75rem;
  color: ${props => props.theme.colors.text.light};
  margin-bottom: 1rem;
`;

const RateInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding-top: 1rem;
  border-top: 1px solid ${props => props.theme.colors.border.light};
`;

const RateLabel = styled.span`
  font-size: 0.75rem;
  color: ${props => props.theme.colors.text.secondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const RateValue = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text.primary};
`;

const RateUnit = styled.span`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.text.secondary};
  margin-left: 0.25rem;
`;

const UnitInfo = styled.div`
  font-size: 0.75rem;
  color: ${props => props.theme.colors.text.light};
  margin-top: 0.5rem;
  text-align: right;
`;

interface ExchangeRateCardProps {
  rate: ExchangeRate;
}

export const ExchangeRateCard = ({ rate }: ExchangeRateCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CurrencyCode>{rate.code}</CurrencyCode>
        <Flag>{getFlagEmoji(rate.country)}</Flag>
      </CardHeader>
      <CurrencyName>{rate.currency}</CurrencyName>
      <Country>{rate.country}</Country>
      <RateInfo>
        <RateLabel>Exchange Rate</RateLabel>
        <RateValue>
          {formatRate(rate.rate)}
          <RateUnit>CZK</RateUnit>
        </RateValue>
      </RateInfo>
      {rate.amount > 1 && (
        <UnitInfo>
          per {rate.amount} {rate.code}
        </UnitInfo>
      )}
    </Card>
  );
};

