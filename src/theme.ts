import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import vars from './components/assets/styles/variables';

const { palettes, fontFamily } = vars;
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
    MuiCssBaseline: {
      styleOverrides: `
      `,
    },
  },
  palette: {
    primary: {
      ...palettes.primary,
    },
    error: {
      main: red.A400,
    },
    grey: {
      ...palettes.grey,
    },
    success: {
      ...palettes.success,
    },
  },
  typography: {
    body1: {
      fontFamily: fontFamily,
    },
  },
});

export default theme;
