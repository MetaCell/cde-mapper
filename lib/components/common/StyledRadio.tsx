import { styled } from '@mui/material/styles';
import { Radio, RadioProps } from '@mui/material';
import { RadioSelected } from '../../icons';

const DefaultIcon = styled('span')(() => ({
    borderRadius: '50%',
    width: 16,
    height: 16,
    backgroundColor: '#fff',
    border: '1px solid #D6D8DB',
    '.Mui-focusVisible &': {
        outline: '2px auto rgba(19,124,189,.6)',
        outlineOffset: 2,
    },
    'input:hover ~ &': {
        backgroundColor: '#C2D4F4',
        border: '1px solid #19418F'
    },
    'input:disabled ~ &': {
        boxShadow: 'none',
        border: '1px solid #D6D8DB',
        background: '#ECEDEE'
    },
}));

export default function StyledRadio(props: RadioProps) {
    return (
        <Radio
            disableRipple
            color="default"
            checkedIcon={<RadioSelected />}
            icon={<DefaultIcon />}
            {...props}
        />
    );
}