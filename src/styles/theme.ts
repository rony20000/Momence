export const theme = {
  colors: {
    primary: '#06b6d4',
    secondary: '#f59e0b',
    success: '#10b981',
    error: '#ef4444',
    warning: '#f59e0b',
    text: {
      primary: '#f8fafc',
      secondary: '#cbd5e1',
      light: '#94a3b8',
      dark: '#0f172a',
      white: '#ffffff',
    },
    background: {
      white: '#ffffff',
      light: '#0f172a',
      gray: '#1e293b',
      gradient: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    },
    border: {
      default: '#334155',
      light: '#475569',
      focus: '#06b6d4',
    },
    gradient: {
      primary: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
      secondary: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
      subtle: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
    },
    overlay: {
      light: 'rgba(248, 250, 252, 0.1)',
      dark: 'rgba(15, 23, 42, 0.8)',
    },
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
    xxxl: '4rem',
  },
  borderRadius: {
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.5rem',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px -1px rgba(0, 0, 0, 0.3)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -2px rgba(0, 0, 0, 0.3)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -4px rgba(0, 0, 0, 0.3)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.3)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
    glow: '0 0 20px rgba(6, 182, 212, 0.5)',
    glowHover: '0 0 30px rgba(6, 182, 212, 0.7)',
  },
  transitions: {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    normal: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '500ms cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: '600ms cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
  animations: {
    fadeIn: 'fadeIn 0.5s ease-in-out',
    slideUp: 'slideUp 0.5s ease-out',
    scaleIn: 'scaleIn 0.3s ease-out',
    shimmer: 'shimmer 2s infinite',
  },
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1280px',
  },
};

export type Theme = typeof theme;

