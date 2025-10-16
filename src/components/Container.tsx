import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  width: 100%;
  padding: 2rem 1rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 768px) {
    padding: 3rem 2rem;
  }
`;

export const Header = styled.header`
  text-align: center;
  margin-bottom: 3rem;
  width: 100%;
`;

export const AppTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  color: ${props => props.theme.colors.text.white};
  margin-bottom: 0.75rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const AppSubtitle = styled.p`
  font-size: 1.125rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 400;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const ContentCard = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  width: 100%;

  @media (max-width: 768px) {
    padding: 1.5rem;
    border-radius: 0.75rem;
  }
`;

