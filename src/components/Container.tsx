import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  width: 100%;
  padding: 3rem 1.5rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${props => props.theme.animations.fadeIn};

  @media (min-width: 768px) {
    padding: 4rem 2rem;
  }
`;

export const Header = styled.header`
  text-align: center;
  margin-bottom: 3rem;
  width: 100%;
  animation: ${props => props.theme.animations.slideUp};
`;

export const AppTitle = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  background: ${props => props.theme.colors.gradient.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.75rem;
  letter-spacing: -0.02em;
  line-height: 1.1;

  @media (max-width: 768px) {
    font-size: 2.25rem;
  }
`;

export const AppSubtitle = styled.p`
  font-size: 1.25rem;
  color: ${props => props.theme.colors.text.secondary};
  font-weight: 400;
  line-height: 1.6;
  max-width: 650px;
  margin: 0 auto;

  @media (max-width: 768px) {
    font-size: 1.125rem;
  }
`;

export const ContentCard = styled.div`
  background: ${props => props.theme.colors.background.gray};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: 2rem;
  box-shadow: ${props => props.theme.shadows.xl};
  width: 100%;
  border: 1px solid ${props => props.theme.colors.border.default};
  animation: ${props => props.theme.animations.scaleIn};
  animation-delay: 0.2s;
  animation-fill-mode: backwards;
  transition: transform ${props => props.theme.transitions.normal},
              box-shadow ${props => props.theme.transitions.normal},
              border-color ${props => props.theme.transitions.normal};

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.theme.shadows.glow};
    border-color: ${props => props.theme.colors.primary};
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
    border-radius: ${props => props.theme.borderRadius.md};
  }
`;

