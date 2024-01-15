import { createTheme } from "@mui/material/styles";
import { vars } from "./variables";
import CaretRight from '../images/CaretRight.png';

const { primaryFont, gray300, gray50, baseWhite, gray100, gray500, primary700, gray700, primary600, primary100, success50, success700, gray200, gray900 } = vars

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
      color: gray700,
    },
    body2: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: '150%',
      color: gray500,
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

    MuiDialog: {
      styleOverrides: {
        paperWidthXl: {
          maxWidth: '68.75rem'
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

    MuiTouchRipple: {
      styleOverrides: {
        root: {
          display: 'none',
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
          background: primary600,
          '&:hover': {
            background: primary700,
          },
          '&:focus': {
            background: primary600,
            boxShadow: '0rem 0rem 0rem 0.25rem #C2D4F4, 0rem 0.0625rem 0.125rem 0rem rgba(7, 8, 8, 0.05)'
          },
          '&.Mui-disabled': {
            background: primary100,
            color: baseWhite,
          }
        },

        textPrimary: {
          color: gray500,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
            color: gray700,
            background: gray50
          }
        },

        outlinedPrimary: {
          border: `0.0625rem solid ${gray300}`,
          background: baseWhite,
          color: gray500,
          '&:hover': {
            border: `0.0625rem solid ${gray300}`,
            background: gray50,
            color: gray500,
          },
          '&:focus': {
            border: `0.0625rem solid ${gray300}`,
            background: baseWhite,
            boxShadow: '0rem 0rem 0rem 0.25rem #ECEDEE, 0rem 0.0625rem 0.125rem 0rem rgba(7, 8, 8, 0.05)'
          },
          '&.Mui-disabled': {
            background: baseWhite,
            border: `0.0625rem solid #E4E5E7`,
            color: gray300,
          }
        }
      }
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: gray900,
          padding: '0.5rem 0.75rem',
          borderRadius: '0.5rem',
          fontSize: '0.75rem',
          fontWeight: 600
        }
      }
    },

    MuiTabs: {
      styleOverrides: {
        root: {
          padding: 0
        },
        indicator: {
          backgroundColor: primary600
        }
      }
    },

    MuiCheckbox: {
      styleOverrides: {
        root: {
          padding: 0
        }
      }
    },

    MuiChip: {
      styleOverrides: {
        root: {
          height: 'auto',
          fontFamily: primaryFont,
          borderRadius: '1rem',
          padding: '0.125rem 0.5rem',
          backgroundColor: gray100,
          color: gray700,
          gap: '0.25rem'
        },
        label: {
          fontSize: '0.75rem',
          lineHeight: '150%',
          fontWeight: 500,
          padding: 0,
          fontFamily: primaryFont
        },
        filledPrimary: {
          background: '#EEF2FC',
          '& .MuiChip-label': {
            color: '#2155BA'
          }
        },
        colorSuccess: {
          backgroundColor: success50,
          color: success700
        },
      }
    },

    MuiTab: {
      styleOverrides: {
        root: {
          flexDirection: 'row',
          minHeight: '3.375rem',
          overflow: 'visible',
          textTransform: 'none',
          fontSize: '0.875rem',
          columnGap: '0.5rem',
          fontWeight: 500,
          lineHeight: '142.857%',
          color: gray500,
          padding: '1.125rem 0',

          '&.Mui-selected': {
            color: primary600,
            fontWeight: 600
          },

          '&:not(:first-of-type)': {
            marginLeft: '2.5rem',
            position: 'relative',

            '&:before': {
              content: '""',
              backgroundImage: `url(${CaretRight})`,
              left: '-1.75rem',
              backgroundPosition: 'center',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '1rem',
              height: '1rem',
              position: 'absolute'
            }
          }
        }
      }
    },

    MuiRadio: {
      styleOverrides: {
        sizeSmall: {
          width: '1rem',
          height: '1rem'
        }
      }
    },

    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'none',
          color: gray500,
          fontWeight: 600,
          fontSize: '0.875rem',
          fontFamily: primaryFont,
          
          "&:hover": {
            color: gray700
          }
        }
      }
    }
  }
});

export default theme;