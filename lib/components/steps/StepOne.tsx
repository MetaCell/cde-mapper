import { useState } from 'react';
import { Stack, Typography, Box, Button, Link } from '@mui/material';
import StyledCard from '../common/StyledCard.tsx';
import Tour from '../common/Tour.tsx';
import { tutorial, TourSteps } from '../common/tutorial.tsx';
import { useCdeContext } from '../../CdeContext.ts';

function StepOne() {
    const {isTourOpen} = useCdeContext();
    const [selectedRadioValue, setSelectedRadioValue] = useState(0);
    const [stepIndex, setStepIndex] = useState(0);
    
    const handleTourNextStepClick = () => {
        if(isTourOpen){
            setStepIndex(1);
        }
    };

    const handleRadioChange = (value: number) => {
        setSelectedRadioValue(value);
    };

    return (
        <>
            <Box
                overflow='auto'
                display='flex'
                justifyContent='center'
                alignItems='center'
                height={1}
                // maxHeight='calc(100vh - (3.9375rem + 3.5625rem + 4.4375rem + 2rem + 2rem))'
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
                    <Stack direction="row" spacing={1.5} className='repository-cards'>
                        <StyledCard value={0} isSuggested={true}
                            selectedValue={selectedRadioValue}
                            onChange={handleRadioChange}
                            label="Spinal Cord Injury (SCI)"
                            handleTourNextStepClick={handleTourNextStepClick}
                        />
                        <StyledCard value={1}
                            selectedValue={selectedRadioValue}
                            onChange={handleRadioChange}
                            label="Trauma Brain Injury (TBI)"
                            handleTourNextStepClick={handleTourNextStepClick}
                        />
                    </Stack>
                    <Stack alignItems="center" sx={{ width: '100%' }}>
                        <Box>
                            <Button
                                disableRipple
                                variant="contained"
                                className='repository__select-btn'
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
            <Tour
                steps={tutorial[TourSteps.Collection]}
                stepIndex={stepIndex}
                setStepIndex={setStepIndex}
            />
        </>
    );
}

export default StepOne;
