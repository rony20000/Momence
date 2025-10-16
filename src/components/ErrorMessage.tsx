import styled from 'styled-components';

const ErrorContainer = styled.div`
  background-color: rgba(239, 68, 68, 0.1);
  border: 2px solid ${props => props.theme.colors.error};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: 2rem;
  margin: 2rem auto;
  max-width: 600px;
`;

const ErrorTitle = styled.h3`
  color: ${props => props.theme.colors.error};
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ErrorIcon = styled.span`
  font-size: 1.5rem;
`;

const ErrorText = styled.p`
  color: ${props => props.theme.colors.text.primary};
  font-size: 1rem;
  line-height: 1.6;
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

