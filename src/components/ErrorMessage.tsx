import styled from 'styled-components';

const ErrorContainer = styled.div`
  background-color: #fee2e2;
  border: 1px solid #fecaca;
  border-radius: 0.75rem;
  padding: 1.5rem;
  margin: 2rem auto;
  max-width: 600px;
`;

const ErrorTitle = styled.h3`
  color: #991b1b;
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ErrorIcon = styled.span`
  font-size: 1.5rem;
`;

const ErrorText = styled.p`
  color: #7f1d1d;
  font-size: 0.875rem;
  line-height: 1.5;
`;

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <ErrorContainer>
      <ErrorTitle>
        <ErrorIcon>⚠️</ErrorIcon>
        Error Loading Data
      </ErrorTitle>
      <ErrorText>{message}</ErrorText>
    </ErrorContainer>
  );
};

