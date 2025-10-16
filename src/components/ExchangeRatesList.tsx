import styled from 'styled-components';
import type { ExchangeRate } from '../types/currency';
import { ExchangeRateCard } from './ExchangeRateCard';

const ListContainer = styled.div`
  width: 100%;
`;

const ListHeader = styled.div`
  margin-bottom: 2rem;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  font-size: 1rem;
  color: ${props => props.theme.colors.text.secondary};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: ${props => props.theme.colors.text.secondary};
  font-size: 1rem;
`;

interface ExchangeRatesListProps {
  rates: ExchangeRate[];
  date: string;
}

export const ExchangeRatesList = ({ rates, date }: ExchangeRatesListProps) => {
  if (rates.length === 0) {
    return <EmptyState>No exchange rates available</EmptyState>;
  }

  return (
    <ListContainer>
      <ListHeader>
        <Title>Exchange Rates</Title>
        <Subtitle>Czech National Bank • {date}</Subtitle>
      </ListHeader>
      <Grid>
        {rates.map((rate) => (
          <ExchangeRateCard key={rate.code} rate={rate} />
        ))}
      </Grid>
    </ListContainer>
  );
};

