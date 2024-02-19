import React from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import { vars } from '../../theme/variables';

const { baseWhite, gray600, primary600, primary700, tooltipBoxShadow, gray900 } = vars;

const WalkthroughStartDialog = ({ handleNextStepTutorial, handleSkipTutorial }: { handleNextStepTutorial: () => void, handleSkipTutorial: () => void }) => {
    const [isVisible, setIsVisible] = React.useState(true);

    const handleSkipButtonClick = () => {
        setIsVisible(false);
        handleSkipTutorial();
    };

    const handleNextButtonClick = () => {
        handleNextStepTutorial();
        setIsVisible(false);
    };

    return isVisible && (
        <Box sx={{
            position: 'absolute',
            bottom: 0,
            margin: '0.75rem',
            padding: '1.5rem',
            maxWidth: 320,
            background: baseWhite,
            borderRadius: '0.25rem',
            boxShadow: tooltipBoxShadow
        }}>
            <Typography variant='subtitle2' fontWeight={600} sx={{ color: gray900 }}>Get started with mapping</Typography>
            <Typography variant='subtitle2' fontWeight={400} mt={1.5} sx={{ color: gray600 }}>Would you like a quick tour of the basics of mapping your dataset?</Typography>
            <Stack direction="row" mt={3} justifyContent="space-between">
                <Button sx={{ minWidth: '8.5rem', '&:hover': { color: gray600 } }} onClick={handleSkipButtonClick}>Skip tutorial</Button>
                <Button sx={{ minWidth: '8.5rem', backgroundColor: primary600, color: baseWhite, '&:hover': { backgroundColor: primary700, color: baseWhite } }} onClick={handleNextButtonClick}>Next</Button>
            </Stack>
        </Box>
    )
}

export default WalkthroughStartDialog;