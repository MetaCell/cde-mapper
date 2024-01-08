import { useState } from 'react';
import { Stack, Typography, Box, Button, FormControl, RadioGroup, Link } from '@mui/material';
import { useCdeContext } from "../../CdeContext.tsx";
import StyledCard from '../common/StyledCard.tsx';
import { vars } from '../../theme/variables.ts';

const { gray500 } = vars

function StepOne() {
    const { mapping } = useCdeContext();
    const [selectedRadioValue, setSelectedRadioValue] = useState("Spinal Cord Injury (SCI)");

    console.log(mapping)

    const handleRadioChange = (event: any, value: any) => {
        event.persist();
        setSelectedRadioValue(value);
    };

    return (
        <>
            <Box 
                overflow='auto' 
                display='flex'
                justifyContent='center'
                alignItems='center'
                maxHeight='calc(100vh - (3.9375rem + 3.5625rem + 4.4375rem + 2rem + 2rem))' 
                p='1.5rem' 
                pt={6} 
                pb={6}
            >
                <Stack spacing={6} sx={{ width: 'max-content' }}>
                    <Stack spacing={1}>
                        <Typography variant='h3' textAlign="center">
                            Select default repository
                        </Typography>
                        <Typography variant='body2' textAlign="center">
                            This can be changed at any time during the process.
                        </Typography>
                    </Stack>
                    <FormControl>
                        <RadioGroup row value={selectedRadioValue} onChange={handleRadioChange} sx={{ gap: 1.5 }}>
                            <StyledCard value={"Spinal Cord Injury (SCI)"} isSuggested={true} />
                            <StyledCard value={"Trauma Brain Injury (TBI)"} />
                        </RadioGroup>
                    </FormControl>
                    <Stack alignItems="center" sx={{ width: '100%' }}>
                        <Box>
                            <Button
                                disableRipple
                                variant="contained"
                            >
                                Select repository
                            </Button>
                        </Box>
                        <Box sx={{ mt: 1.5 }}>
                            <Link href={`mailto:${''}`}>Can’t find the repository you’re looking for? Contact us</Link>
                        </Box>
                    </Stack>
                </Stack>
            </Box>
        </>
    );
}

export default StepOne;
