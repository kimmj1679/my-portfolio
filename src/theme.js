import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FF0000',
      light: '#FF4444',
      dark: '#CC0000',
    },
    secondary: {
      main: '#3EA6FF',
    },
    background: {
      default: '#0F0F0F',
      paper: '#212121',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#AAAAAA',
      disabled: '#717171',
    },
    divider: '#3F3F3F',
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 500 },
    h6: { fontWeight: 500 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          backgroundColor: '#FF0000',
          '&:hover': {
            backgroundColor: '#CC0000',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#212121',
          border: '1px solid #3F3F3F',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#0F0F0F',
          borderBottom: '1px solid #3F3F3F',
          boxShadow: 'none',
        },
      },
    },
  },
  spacing: 8,
});

export default theme;
