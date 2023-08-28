import { InputBase, alpha } from '@mui/material';
import { styled } from '@mui/styles';

const StyledInput = styled(InputBase)(({ theme }) => ({
  borderRadius: '0.5rem',
  position: 'relative',
  border: '1px solid',
  borderColor: theme.palette.grey[200],
  fontSize: '0.875rem',
  width: 'auto',
  padding: '0.5rem 0.75rem',
  transition: theme.transitions.create([
    'border-color',
    'background-color',
    'box-shadow',
  ]),
  fontFamily: [
    'Inter',
    'sans-serif',
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  '&.Mui-focused': {
    boxShadow: `${alpha(theme.palette.primary.light, 0.25)} 0 0 0 0.2rem`,
    borderColor: theme.palette.primary.light,
  },

  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    padding: '0rem 0.25rem',
    fontSize: '0.875rem',
  },
}));

export default StyledInput;
