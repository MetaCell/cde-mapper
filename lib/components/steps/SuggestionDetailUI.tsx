import {Box, Checkbox, Typography} from '@mui/material';
import {ArrowIcon, CheckboxDefault, CheckboxSelected, GlobeIcon} from '../../icons/index.tsx';
import CdeDetails from '../common/CdeDetails.tsx';
import {vars} from '../../theme/variables.ts';

const {
    gray900,
    gray500,
    gray200
} = vars;

function SuggestionDetailUI() {

    return (
        <Box gap='1.5rem' display='flex' alignItems='start'>
            <Box height='2.625rem' display='flex' alignItems='center'>
                <Checkbox sx={{mt: '0rem'}} disableRipple icon={<CheckboxDefault/>} checkedIcon={<CheckboxSelected/>}/>
            </Box>
            <Box flex={1}>
                <Box gap='1.5rem' display='flex' alignItems='center' mb='0.75rem'>
                    <ArrowIcon/>

                    <Box flex={1} sx={{
                        padding: '0.625rem 0.875rem',
                        borderRadius: '0.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        border: `0.0625rem solid ${gray200}`,
                    }}>
                        <GlobeIcon/>
                        <Typography sx={{
                            fontSize: '0.875rem',
                            fontWeight: 500,
                            lineHeight: '142.857%',
                            color: gray900
                        }}>
                            SmallSpeciesStrainTyp
                        </Typography>
                        <Typography sx={{
                            fontSize: '0.875rem',
                            fontWeight: 400,
                            lineHeight: '142.857%',
                            color: gray500
                        }}>
                            Strain of the mouse
                        </Typography>
                    </Box>
                </Box>
                <CdeDetails/>
            </Box>
        </Box>
    );
}

export default SuggestionDetailUI;
