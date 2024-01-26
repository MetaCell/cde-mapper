import { createTheme } from "@mui/material/styles";
import { vars } from "./variables";
import CaretRight from '../images/CaretRight.png';

const { 
  primaryFont, 
  gray100, 
  primary50, 
  success700, 
  success500, 
  success50, 
  gray400, 
  gray900, 
  primary300, 
  primary500, 
  gray200, 
  gray300, 
  gray50, 
  baseWhite, 
  gray500, 
  primary700, 
  gray700, 
  primary600, 
  primary100, 
  black,
  primary400,
  purple50,
  purple700,
  purple500,
  warning50,
  warning700
} = vars

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
    h6: {
      fontSize: '1.125rem',
      color: gray700
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
          box-sizing: border-box !important;
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
          color: primary500
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
        },
        root: {
          '& .MuiDialog-paper': {
            minHeight: '0.0625rem !important',
            height: '100%'
          }
        },
      }
    },

    MuiDrawer: {
      styleOverrides: {
        root: {
          zIndex: 9999
        },
        paper: {
          width: '22.5rem',
          boxShadow: '0 0.5rem 0.5rem -0.25rem rgba(16, 24, 40, 0.03), 0 1.25rem 1.5rem -0.25rem rgba(16, 24, 40, 0.08)'
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

    MuiMenu: {
      styleOverrides: {
        root: {
          zIndex: 99999
        },
        list: {
          padding: '0.25rem 0.375rem',
        },
        paper: {
          borderColor: gray200,
          boxShadow: '0 0.25rem 0.375rem -0.125rem rgba(7, 8, 8, 0.03), 0 0.75rem 1rem -0.25rem rgba(7, 8, 8, 0.08)'
        }
      }
    },

    MuiMenuItem: {
      styleOverrides: {
        root: {
          padding: '0.5rem 0.625rem',
          fontSize: '0.75rem',
          fontWeight: 500,
          color: gray900,
          lineHeight: '142.857%',
          borderRadius: '0.375rem',

          '&:hover': {
            background: gray50
          },

          '&.Mui-disabled': {
            display: 'none'
          }
        }
      }
    },

    MuiInputAdornment: {
      styleOverrides: {
        root: {
          height: 'auto',
          maxHeight: '100%'
        }
      }
    },

    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: '0.75rem',
          borderColor: gray100
        },
        body: {
          paddingTop: '1.5rem',
          paddingBottom: '1.5rem',
        },
        head: {
          fontSize: '0.75rem',
          fontWeight: 500,
          lineHeight: '150%',
          justifyContent: 'space-between',
          color: gray500,

          '& svg': {
            display: 'inline-block',
            cursor: 'pointer',
            verticalAlign: 'middle',
            marginLeft: '0.75rem'
          }
        }
      }
    },

    MuiFormGroup: {
      styleOverrides: {
        root: {
          '& .MuiFormControlLabel-root:not(:first-child)': {
            marginTop: '0.75rem'
          }
        }
      }
    },

    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          margin: 0,
          gap: '0.5rem',
        },
        label: {
          fontSize: '0.875rem',
          fontWeight: 500,
          lineHeight: '142.857%',
          color: gray700,
          userSelect: 'none'
        }
      }
    },

    MuiPopover: {
      styleOverrides: {
        paper: {
          borderRadius: '0.5rem',
          border: '0.0625rem solid rgba(236, 237, 238, 0.30)',
          background: baseWhite,
          boxShadow: '0 0.125rem 0.25rem -0.125rem rgba(7, 8, 8, 0.06), 0 0.25rem 0.5rem -0.125rem rgba(7, 8, 8, 0.10)',
          minWidth: '18.75rem'
        }
      }
    },

    MuiSelect: {
      styleOverrides: {
        select: {
          height: '2.25rem',
          display: 'flex',
          alignItems: 'center',
          minWidth: 0
        }
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          boxSizing: 'border-box',
          borderRadius: '0.5rem',
          paddingLeft: '0.75rem',

          '&.Mui-focused': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderWidth: '0.0625rem',
              borderColor: primary300,
              boxShadow: `0 0 0 0.25rem ${primary100}, 0 0.0625rem 0.125rem 0 rgba(7, 8, 8, 0.05)`
            }
          },

          '&.Mui-disabled': {
            pointerEvents: 'none',
            background: gray50,

            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: gray200
            }
          },

          '&:not(.Mui-focused):hover': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: gray200
            }
          }
        },
        notchedOutline: {
          borderColor: gray200,
        },
        input: {
          fontSize: '0.875rem',
          lineHeight: '142.857%',
          padding: '0 0',
          color: gray500,
          height: '2.25rem',

          '& em': {
            fontStyle: 'normal',
            color: gray400,
          },

          '&::placeholder': {
            color: gray400,
            opacity: 1
          }
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
          boxShadow: '0rem 0.0625rem 0.125rem 0rem rgba(7, 8, 8, 0.05)',

          '&:hover': {
            boxShadow: '0rem 0.0625rem 0.125rem 0rem rgba(7, 8, 8, 0.05)',
          }
        },

        startIcon: {
          margin: 0,
          marginRight: '0.5rem'
        },

        containedPrimary: {
          background: primary600,
          '&:hover': {
            background: primary700,
          },
          '&:focus': {
            background: primary600,
            boxShadow: `0 0 0 0.25rem ${primary100}, 0 0.0625rem 0.125rem 0 rgba(7, 8, 8, 0.05)`
          },
          '&.Mui-disabled': {
            background: primary100,
            color: baseWhite,
          }
        },

        containedInfo: {
          background: primary50,
          color: primary600,
          boxShadow: 'none',
          '&:hover': {
            background: primary100,
            color: primary700,
          },
          '&:focus': {
            background: primary50,
            boxShadow: `0rem 0rem 0rem 0.25rem ${primary100}, 0rem 0.0625rem 0.125rem 0rem rgba(7, 8, 8, 0.05)`
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
            boxShadow: `0 0 0 0.25rem ${gray100}, 0 0.0625rem 0.125rem 0 rgba(7, 8, 8, 0.05)`
          },
          '&.Mui-disabled': {
            background: baseWhite,
            border: `0.0625rem solid ${gray200}`,
            color: gray300,
          }
        }
      }
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: black,
          padding: '0.75rem',
          borderRadius: '0.5rem'
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
          borderRadius: '3.125rem',
          background: gray100,
          '& svg': {
            marginRight: '0.25rem'
          }
        },

        sizeSmall: {
          padding: '0.125rem 0.5rem',
          '& .MuiChip-label': {
            color: gray700,
          }
        },

        sizeMedium: {
          padding: '0.375rem 0.5rem',
        },

        label: {
          fontSize: '0.75rem',
          lineHeight: '150%',
          fontWeight: 500,
          padding: 0,
          fontFamily: primaryFont
        },

        colorSuccess: {
          background: success50,
          '& .MuiChip-label': {
            color: success700,

            '&:before': {
              background: success500,
            }
          }
        },

        colorSecondary: {
          background: purple50,
          '& .MuiChip-label': {
            color: purple700,

            '&:before': {
              background: purple500,
            }
          }
        },

        colorInfo: {
          background: primary50,
          '& .MuiChip-label': {
            color: primary500,

            '&:before': {
              background: primary400,
            }
          }
        },

        colorWarning: {
          background: warning50,
          '& .MuiChip-label': {
            color: warning700
          }
        },

        filledPrimary: {
          background: primary50,
          '& .MuiChip-label': {
            color: primary500
          }
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
    },

    MuiBreadcrumbs: {
      styleOverrides: {
        separator: {
          marginLeft: '0.25rem',
          marginRight: '0.25rem',
          height: '1.125rem',
          fontSize: '0.875rem'
        }
      }
    }
  }
});

export default theme;