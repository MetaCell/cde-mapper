import { Theme } from '@mui/material/styles';
import '@mui/material/styles/createPalette';
import '@mui/material/styles';
import '@material-ui/core/styles/createMuiTheme';
import '@mui/styles/defaultTheme';
import '@mui/styles';

declare module '@mui/styles' {
  interface Palette {
    primary: any;
    grey: any;
    success: any;
  }
  interface PaletteOptions {
    primary: Palette['primary'];
    grey: Palette['grey'];
    success: Palette['success'];
  }

  interface Theme {
    components: {
      MuiCssBaseline: any;
    };
  }

  interface ThemeOptions {
    components?: {
      MuiCssBaseline?: any;
    };
  }
}

declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface (remove this line if you don't have the rule enabled)
  interface DefaultTheme extends Theme {}
}
