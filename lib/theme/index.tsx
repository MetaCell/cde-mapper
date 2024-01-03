import { createTheme } from "@mui/material/styles";
import { vars } from "./variables";

const { primaryFont, gray300, baseWhite, gray500, gray100, gray700, success50, success700, gray200 } = vars

let theme = createTheme();

theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: primaryFont,
      letterSpacing: 'normal'
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 500,
      lineHeight: '150%',
      color: '#373A3E',
    },
    body2: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: '150%',
      color: '#676C74',
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

        *::-webkit-scrollbar {
          width: 0.5rem;
          height: 0.5rem;
        }
  
        *::-webkit-scrollbar-track {
          background: transparent;
        }
    
        *::-webkit-scrollbar-thumb {
          background: ${gray200};
          border-radius: 0.5rem;
          height: 0.5rem;
        }
      `
    },

    MuiCircularProgress: {
      styleOverrides: {
        root: {
          color: '#2155BA'
        }
      }
    },

    MuiModal: {
      styleOverrides: {
        backdrop: {
          background: 'rgba(0, 0, 0, 0.10)'
        }
      }
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          background: 'rgba(0, 0, 0, 0.10)'
        }
      }
    },

    MuiDrawer: {
      styleOverrides: {
        root: {
          zIndex: 9999
        },
        paper: {
          width: '22.5rem',
          boxShadow: '0rem 0.5rem 0.5rem -0.25rem rgba(16, 24, 40, 0.03), 0rem 1.25rem 1.5rem -0.25rem rgba(16, 24, 40, 0.08)'
        }
      }
    },

    MuiButton: {
      styleOverrides: {
        root: {
          padding: '0.5rem 0.875rem',
          fontFamily: primaryFont,
          fontSize: '0.875rem',
          fontWeight: 600,
          borderRadius: '0.5rem',
          lineHeight: '142.857%',
          textTransform: 'none',
          boxShadow: '0px 1px 2px 0px rgba(7, 8, 8, 0.05)',

          '&:hover': {
            boxShadow: '0px 1px 2px 0px rgba(7, 8, 8, 0.05)',
          }
        },

        containedPrimary: {
          background: '#19418F',
          '&:hover': {
            background: '#19418F',
          }
        },

        textPrimary: {
          color: '#676C74',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
            background: 'transparent'
          }
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
    },

    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          backgroundColor: gray100,
          color: gray700,
          padding: "2px 8px 2px 6px",
          '& .MuiChip-label': {
            paddingLeft: '0.25rem',
            paddingRight: 0
          }
        },
        sizeSmall: {
          fontSize: '0.75rem'
        },
        colorSuccess: {
          backgroundColor: success50,
          color: success700
        },
      }
    },
  }
});

export default theme;