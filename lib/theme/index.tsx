import { createTheme } from "@mui/material/styles";
import { vars } from "./variables";

const { primaryFont, gray300, baseWhite, gray500 } = vars

let theme = createTheme();

theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: primaryFont
    }
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: `
        *, body {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: ${primaryFont}
        }
      `
    },

    MuiButton: {
      styleOverrides: {
        root: {
          padding: '0.5rem 0.875rem',
          fontSize: '0.875rem',
          fontWeight: 600,
          borderRadius: '0.5rem',
          lineHeight: '142.857%',
          textTransform: 'none',
          boxShadow: '0rem 0.0625rem 0.125rem 0rem rgba(7, 8, 8, 0.05)'
        },

        outlinedPrimary: {
          border: `0.0625rem solid ${gray300}`,
          background: baseWhite,
          color: gray500,
          '&:hover': {
            border: `0.0625rem solid ${gray300}`,
            background: baseWhite,
            color: gray500,
          }
        }
      }
    }
  }
});

export default theme;