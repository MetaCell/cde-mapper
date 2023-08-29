import { ThemeOptions, createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import vars from './components/assets/styles/variables';

const { palette, fontFamily } = vars;

// A custom theme for this app
const theme = createTheme({
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          useNextVariants: true,
          fontFamily: fontFamily,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '0.5rem',
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: `
      `,
    },
  },
  palette: {
    primary: {
      ...palette.primary,
    },
    error: {
      main: red.A400,
    },
    grey: {
      ...palette.grey,
    },
    success: {
      ...palette.success,
    },
    secondary: {
      ...palette.grey,
      main: palette.grey[500],
    },
  },
  typography: {
    body1: {
      fontFamily: fontFamily,
    },
  },
});

export default theme;
