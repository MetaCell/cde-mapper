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
    MuiTableCell: {
      styleOverrides: {
        stickyHeader: {
          backgroundColor: palette.grey[50],
        },
        root: {
          '&:not(:last-of-type)': {
            borderRight: `2px solid ${palette.grey[200]}`,
          },
          lineHeight: '1.25rem',
          color: palette.grey[600],
          borderCollapse: 'collapse',
          paddingTop: '0.75em',
          paddingBottom: '0.75em',
          paddingInline: '1.5rem',
          '& span': {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          },
          '&:hover': {
            backgroundColor: palette.grey[50],
          },
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:hover td, &:hover th': {
            backgroundColor: 'none',
          },
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          '& .MuiTableCell-root': {
            fontWeight: 600,
            lineHeight: '1.125rem',
            padding: '0.75em 1.5em',
          },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          minHeight: '1.3em',

          '&.Mui-expanded': {
            minHeight: '1.3em',
          },
        },
        content: {
          margin: 0,
          '&.Mui-expanded': {
            margin: 0,
          },
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          border: `1px solid ${palette.grey[200]}`,
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
