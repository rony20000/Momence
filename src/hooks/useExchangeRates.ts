import { useQuery } from '@tanstack/react-query';
import { fetchExchangeRates } from '../services/currencyService';

export const useExchangeRates = () => {
  return useQuery({
    queryKey: ['exchangeRates'],
    queryFn: fetchExchangeRates,
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
  });
};

