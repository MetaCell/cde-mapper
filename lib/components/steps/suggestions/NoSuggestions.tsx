import React from 'react';
import {Stack, Typography, Box, Button} from '@mui/material';
import {tutorial, TourSteps} from '../../common/tutorial';
import Tour from '../../common/Tour';

interface NoSuggestionsProps {
    onNext: () => void;
}


function NoSuggestions({onNext}: NoSuggestionsProps) {
    const [stepIndex, setStepIndex] = React.useState(0);
    return (
        <>
            <Box
                overflow='auto'
                display='flex'
                justifyContent='center'
                alignItems='center'
                height={1}
                p='1.5rem'
                pt={6}
                pb={6}
            >
                <Stack spacing={6} sx={{ width: 'max-content' }}>
                    <Stack spacing={1}>
                        <Typography variant='h3' textAlign="center">
                            No suggestions available
                        </Typography>
                        <Typography variant='body2' textAlign="center">
                            The suggestion algorithm did not detect any suggestions for the dataset given, please move
                            to the mapping step.
                        </Typography>
                    </Stack>
                    <Stack alignItems="center" sx={{ width: '100%' }}>
                        <Box>
                            <Button
                                disableRipple
                                variant="contained"
                                onClick={onNext}
                                className='next_button'
                            >
                                Next
                            </Button>
                        </Box>
                    </Stack>
                </Stack>
            </Box>
            <Tour
                steps={tutorial[TourSteps.NoSuggestions]}
                stepIndex={stepIndex}
                setStepIndex={setStepIndex}
            />
        </>
    );
}

export default NoSuggestions;
