import { Component } from 'react';
import type { ReactNode } from 'react';
import styled from 'styled-components';

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  padding: 2rem;
  text-align: center;
`;

const ErrorIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
`;

const ErrorTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.error};
  margin-bottom: 0.5rem;
`;

const ErrorMessage = styled.p`
  font-size: 1rem;
  color: ${props => props.theme.colors.text.secondary};
  margin-bottom: 1.5rem;
  max-width: 500px;
`;

const ErrorDetails = styled.details`
  margin-top: 1rem;
  padding: 1rem;
  background: ${props => props.theme.colors.background.gray};
  border-radius: 0.5rem;
  text-align: left;
  max-width: 600px;
  width: 100%;
  
  summary {
    cursor: pointer;
    font-weight: 600;
    color: ${props => props.theme.colors.text.primary};
    margin-bottom: 0.5rem;
  }
  
  pre {
    font-size: 0.875rem;
    color: ${props => props.theme.colors.text.secondary};
    overflow-x: auto;
    white-space: pre-wrap;
    word-wrap: break-word;
  }
`;

const ReloadButton = styled.button`
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: white;
  background: ${props => props.theme.colors.gradient.primary};
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: { componentStack: string } | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: { componentStack: string }): void {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo,
    });
  }

  handleReload = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
    window.location.reload();
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <ErrorContainer>
          <ErrorIcon>⚠️</ErrorIcon>
          <ErrorTitle>Oops! Something went wrong</ErrorTitle>
          <ErrorMessage>
            We're sorry, but something unexpected happened. 
            Please try reloading the page.
          </ErrorMessage>
          <ReloadButton onClick={this.handleReload}>
            Reload Page
          </ReloadButton>
          
          {import.meta.env.DEV && this.state.error && (
            <ErrorDetails>
              <summary>Error Details (Development Only)</summary>
              <pre>
                <strong>Error:</strong> {this.state.error.toString()}
                {'\n\n'}
                <strong>Stack:</strong>
                {'\n'}
                {this.state.error.stack}
                {this.state.errorInfo && (
                  <>
                    {'\n\n'}
                    <strong>Component Stack:</strong>
                    {'\n'}
                    {this.state.errorInfo.componentStack}
                  </>
                )}
              </pre>
            </ErrorDetails>
          )}
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

