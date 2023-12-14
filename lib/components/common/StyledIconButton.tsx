import { styled } from '@mui/material/styles';
import { IconButton, IconButtonProps } from '@mui/material';

interface IStyledIconButton extends IconButtonProps {
    variant?: 'text' | 'outlined';
}

const StyledIconButton = styled(IconButton, {
    shouldForwardProp: prop => prop !== 'variant',
})<IStyledIconButton>(({ variant, theme }) => ({
    borderRadius: '0.5rem',
    ...(variant === 'outlined'
        ? {
            border: `1px solid ${theme.palette.grey[300]}`,
        }
        : {}),
}));

export default StyledIconButton;
