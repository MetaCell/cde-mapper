import { styled } from '@mui/material/styles';
import { Radio, RadioProps } from '@mui/material';
import { RadioSelected } from '../../icons';
import { vars } from '../../theme/variables';

const {baseWhite, primary100, primary600, gray100, gray300} = vars;

const DefaultIcon = styled('span')(() => ({
    borderRadius: '50%',
    width: 16,
    height: 16,
    backgroundColor: baseWhite,
    border: `1px solid ${gray300}`,
    'input:hover ~ &': {
        backgroundColor: primary100,
        border: `1px solid ${primary600}`
    },
    'input:disabled ~ &': {
        boxShadow: 'none',
        border: `1px solid ${gray300}`,
        background: gray100
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