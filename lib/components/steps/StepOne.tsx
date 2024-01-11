import { useState } from 'react';
import { Stack, Typography, Box, Button, Link } from '@mui/material';
import StyledCard from '../common/StyledCard.tsx';

function StepOne() {
    const [selectedRadioValue, setSelectedRadioValue] = useState("Spinal Cord Injury (SCI)");


    const handleRadioChange = (value: string) => {
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
                    <Stack direction="row" spacing={1.5}>
                        <StyledCard value={"Spinal Cord Injury (SCI)"} isSuggested={true} selectedValue={selectedRadioValue} onChange={handleRadioChange} />
                        <StyledCard value={"Trauma Brain Injury (TBI)"} selectedValue={selectedRadioValue} onChange={handleRadioChange} />
                    </Stack>
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
