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
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: #6b7280;
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

