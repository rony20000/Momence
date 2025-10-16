import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      success: string;
      error: string;
      warning: string;
      text: {
        primary: string;
        secondary: string;
        light: string;
        dark: string;
        white: string;
      };
      background: {
        white: string;
        light: string;
        gray: string;
        gradient: string;
      };
      border: {
        default: string;
        light: string;
        focus: string;
      };
      gradient: {
        primary: string;
        secondary: string;
        subtle: string;
      };
      overlay: {
        light: string;
        dark: string;
      };
    };
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
      xxxl: string;
    };
    borderRadius: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
      full: string;
    };
    shadows: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
      '2xl': string;
      glow: string;
      glowHover: string;
    };
    transitions: {
      fast: string;
      normal: string;
      slow: string;
      bounce: string;
    };
    animations: {
      fadeIn: string;
      slideUp: string;
      scaleIn: string;
      shimmer: string;
    };
    breakpoints: {
      mobile: string;
      tablet: string;
      desktop: string;
      wide: string;
    };
  }
}

