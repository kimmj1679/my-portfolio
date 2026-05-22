import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#FF0000' },
    secondary: { main: '#3EA6FF' },
    background: { default: '#0F0F0F', paper: '#212121' },
    divider: '#3F3F3F',
    text: { primary: '#FFFFFF', secondary: '#AAAAAA' },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
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
});

export default theme;
