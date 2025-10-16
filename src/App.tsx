import { useExchangeRates } from './hooks/useExchangeRates';
import { GlobalStyles } from './styles/GlobalStyles';
import { Container, Header, AppTitle, AppSubtitle, ContentCard } from './components/Container';
import { Loading } from './components/Loading';
import { ErrorMessage } from './components/ErrorMessage';
import { ExchangeRatesList } from './components/ExchangeRatesList';
import { CurrencyConverter } from './components/CurrencyConverter';

function App() {
  const { data, isLoading, error } = useExchangeRates();

  return (
    <>
      <GlobalStyles />
      <Container>
        <Header>
          <AppTitle>Currency Exchange Rates</AppTitle>
          <AppSubtitle>Live rates from Czech National Bank</AppSubtitle>
        </Header>

        {isLoading && (
          <ContentCard>
            <Loading />
          </ContentCard>
        )}

        {error && (
          <ContentCard>
            <ErrorMessage message={error.message} />
          </ContentCard>
        )}

        {data && !isLoading && !error && (
          <>
            <CurrencyConverter rates={data.rates} />
            <ContentCard>
              <ExchangeRatesList rates={data.rates} date={data.date} />
            </ContentCard>
          </>
        )}
      </Container>
    </>
  );
}

export default App;
