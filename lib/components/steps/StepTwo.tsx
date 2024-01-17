import { Box, Button, Chip, IconButton, Typography } from '@mui/material';
import { useCdeContext } from "../../CdeContext.tsx";
import React from 'react';
import { ArrowDropDown, LeftIcon, RightIcon } from '../../icons/index.tsx';
import SuggestionDetailUI from './SuggestionDetailUI.tsx';
import ModalHeightWrapper from '../common/ModalHeightWrapper.tsx';
import { vars } from '../../theme/variables.ts';

const {
    gray100,
    gray500,
    gray50,
    gray300,
    gray200,
    baseWhite,
    primary600
} = vars;

function StepTwo() {
    const { mapping } = useCdeContext();

    const [showOtherSuggestions, setShowOtherSuggestions] = React.useState(false);

    console.log(mapping)

    return (
        <>
            <ModalHeightWrapper>
                <Box mb={3} borderBottom={`0.0625rem solid ${gray100}`} py='0.6875rem' display='flex' alignItems='center' justifyContent='space-between'>
                    <Typography sx={{
                        color: gray500,
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        lineHeight: '142.857%'
                    }}>
                        Column header from datasets
                    </Typography>
                    <Typography sx={{
                        color: gray500,
                        fontSize: '0.75rem',
                        fontWeight: 400,
                        lineHeight: '150%'
                    }}>
                        This is the column header you’re mapping.
                    </Typography>
                </Box>

                <Typography sx={{
                    padding: '0.5rem 0.75rem',
                    borderRadius: '0.5rem',
                    border: `0.0625rem solid ${gray200}`,
                    background: gray50,
                    fontSize: '0.875rem',
                    color: gray500,
                    lineHeight: '142.857%',
                    fontWeight: 400,
                    marginBottom: '3rem'
                }}>
                    Strain
                </Typography>

                <Box mb={3} borderBottom={`0.0625rem solid ${gray100}`} py='0.6875rem' display='flex' alignItems='center' justifyContent='space-between'>
                    <Typography sx={{
                        color: gray500,
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        lineHeight: '142.857%'
                    }}>
                        CDE suggestions
                    </Typography>
                    <Typography sx={{
                        color: gray500,
                        fontSize: '0.75rem',
                        fontWeight: 400,
                        lineHeight: '150%'
                    }}>
                        Select only 1 suggestion to map ‘Strain’ with. Suggestions are ordered based on the quality of the suggestion.
                    </Typography>
                </Box>

                <Box display='flex' alignItems='start' flexDirection='column' gap='3rem'>
                    <SuggestionDetailUI />
                    <SuggestionDetailUI />
                    <Button variant='text' onClick={() =>  setShowOtherSuggestions(!showOtherSuggestions)} disableRipple sx={{
                        p: 0, gap: '0.25rem', color: primary600,

                        '& svg': {
                            transform: showOtherSuggestions ? 'rotate(90deg)' : 'rotate(0deg)'
                        }
                    }}>
                        <ArrowDropDown />
                        4 other suggestions available for this column. Expand all suggestions.
                    </Button>
                </Box>


                {showOtherSuggestions && (
                    <Box display='flex' alignItems='start' flexDirection='column' mt='3rem' gap='3rem'>
                        <SuggestionDetailUI />
                        <SuggestionDetailUI />
                        <SuggestionDetailUI />
                        <SuggestionDetailUI />
                    </Box>
                )}
            </ModalHeightWrapper>

            <Box width='calc(100% - 3rem)' mx='auto' justifyContent='space-between' display='flex' alignItems='center' sx={{ background: baseWhite, zIndex: 9 }} py='1rem' borderTop={`0.0625rem solid ${gray100}`}>
                <Box gap='0.75rem' display='flex' alignItems='center'>
                    <Box gap='0.25rem' display='flex' alignItems='center'>
                        <IconButton disabled sx={{
                            borderRadius: '0.5rem',
                            padding: '0.5rem',
                            border: `0.0625rem solid ${gray200}`,
                            boxShadow: '0rem 0.0625rem 0.125rem 0rem rgba(7, 8, 8, 0.05)'
                        }}>
                            <LeftIcon color={gray300} />
                        </IconButton>
                        <IconButton sx={{
                            borderRadius: '0.5rem',
                            padding: '0.5rem',
                            border: `0.0625rem solid ${gray300}`,
                            boxShadow: '0rem 0.0625rem 0.125rem 0rem rgba(7, 8, 8, 0.05)'
                        }}>
                            <RightIcon />
                        </IconButton>
                    </Box>
                    <Chip label='Displaying 1/3 suggestions' color='primary' />
                </Box>

                <Box gap='0.5rem' display='flex' alignItems='center'>
                    <Button variant='outlined'>Ignore suggestions</Button>
                    <Button variant='contained'>Accept selected mapping</Button>
                </Box>
            </Box>
        </>
    );
}

export default StepTwo;
