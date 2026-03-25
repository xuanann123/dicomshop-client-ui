import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#5D4037',
      light: '#8B6B61',
      dark: '#321911',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#FF8F00',
      light: '#FFC046',
      dark: '#C56000',
      contrastText: '#000000',
    },
    background: {
      default: '#FFF8F0',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#3E2723',
      secondary: '#6D4C41',
    },
    success: {
      main: '#66BB6A',
    },
    error: {
      main: '#EF5350',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700, letterSpacing: '-0.02em' },
    h2: { fontWeight: 700, letterSpacing: '-0.01em' },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: '10px 24px',
          fontSize: '0.95rem',
        },
        contained: {
          boxShadow: '0 2px 8px rgba(93, 64, 55, 0.25)',
          '&:hover': {
            boxShadow: '0 4px 16px rgba(93, 64, 55, 0.35)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 10,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 8px rgba(0,0,0,0.08)',
        },
      },
    },
  },
});

export default theme;
