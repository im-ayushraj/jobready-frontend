export const colors = {
  primary: {
    dark: '#0D1F23',    // Deep navy
    main: '#132E35',    // Dark teal
    light: '#2D4A53',   // Medium teal
  },
  secondary: {
    dark: '#5A636A',    // Dark gray
    main: '#69818D',    // Medium gray
    light: '#AFB3B7',   // Light gray
  },
  text: {
    primary: '#FFFFFF',
    secondary: '#AFB3B7',
    dark: '#0D1F23',
  },
  background: {
    dark: '#0D1F23',
    main: '#132E35',
    light: '#2D4A53',
  },
  accent: {
    primary: '#69818D',
    secondary: '#5A636A',
  }
};

export const theme = {
  colors,
  typography: {
    fontFamily: 'Inter, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: colors.text.primary,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      color: colors.text.primary,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
      color: colors.text.primary,
    },
    body: {
      fontSize: '1rem',
      color: colors.text.secondary,
    },
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '1rem',
  },
  shadows: {
    sm: '0 1px 3px rgba(0,0,0,0.12)',
    md: '0 4px 6px rgba(0,0,0,0.1)',
    lg: '0 10px 15px rgba(0,0,0,0.1)',
  },
}; 