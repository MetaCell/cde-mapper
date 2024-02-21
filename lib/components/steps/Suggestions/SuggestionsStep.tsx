import { Box, Button, Chip, IconButton, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { ArrowDropDown, LeftIcon, RightIcon } from '../../../icons';
import SuggestionDetailUI from './SuggestionDetailUI.tsx';
import ModalHeightWrapper from '../../common/ModalHeightWrapper.tsx';
import { vars } from '../../../theme/variables.ts';
import { useCdeContext } from "../../../CdeContext.ts";
import { MAX_SUGGESTIONS } from "../../../settings.ts";
import NoSuggestions from "./NoSuggestions.tsx";
import Tour from '../../common/Tour.tsx';
import { tutorial, TourSteps } from '../../common/tutorial.tsx';

const {
    gray100,
    gray500,
    gray50,
    gray300,
    gray200,
    baseWhite,
    primary600
} = vars;

interface SuggestionsStepProps {
    changeToNextTab: () => void;
}

function SuggestionsStep({ changeToNextTab }: SuggestionsStepProps) {
    const [showOtherSuggestions, setShowOtherSuggestions] = useState<boolean>(false);
    const [currentKeyIndex, setCurrentKeyIndex] = useState<number>(0);
    const [hadInitialSuggestions, setHadInitialSuggestions] = useState<boolean>(false);
    const [stepIndex, setStepIndex] = useState<number>(0);


    const {
        getSuggestions,
    } = useCdeContext();

    const suggestionsMapping = getSuggestions();

    const [activeSuggestions, setActiveSuggestions] = useState<Set<string>>(
        new Set<string>(Object.keys(suggestionsMapping)
            .filter(key => suggestionsMapping[key].length > 0)));

    const handleNext = useCallback(() => {
        const activeSuggestionsArray = Array.from(activeSuggestions);
        setCurrentKeyIndex((prevIndex) => (prevIndex + 1) % activeSuggestionsArray.length);
    }, [activeSuggestions]);

    const handlePrevious = useCallback(() => {
        const activeSuggestionsArray = Array.from(activeSuggestions);
        setCurrentKeyIndex((prevIndex) => (prevIndex - 1 + activeSuggestionsArray.length) % activeSuggestionsArray.length);
    }, [activeSuggestions]);

    const completeSuggestion = useCallback(() => {
        const activeSuggestionsArray = Array.from(activeSuggestions);
        const currentColumn = activeSuggestionsArray[currentKeyIndex];
        setActiveSuggestions((prevSuggestions) => {
            const updatedSuggestions = new Set(prevSuggestions);
            updatedSuggestions.delete(currentColumn);
            return updatedSuggestions;
        });

        if (currentKeyIndex == activeSuggestionsArray.length - 1) {
            setCurrentKeyIndex(0);
        }

    }, [activeSuggestions, currentKeyIndex]);

    useEffect(() => {
        const initialActiveSuggestions = new Set<string>(
            Object.keys(suggestionsMapping).filter(key => suggestionsMapping[key].length > 0)
        );
        setActiveSuggestions(initialActiveSuggestions);

        // Set hadInitialSuggestions based on whether there were any initial suggestions
        setHadInitialSuggestions(initialActiveSuggestions.size > 0);
    }, [suggestionsMapping]);

    useEffect(() => {
        if (activeSuggestions.size === 0 && hadInitialSuggestions) {
            changeToNextTab();
        }
    }, [activeSuggestions, changeToNextTab, hadInitialSuggestions]);

    if (activeSuggestions.size === 0) {
        return <NoSuggestions onNext={changeToNextTab} />
    }

    const columnsWithSuggestions = Array.from(activeSuggestions);
    const column = columnsWithSuggestions[currentKeyIndex];
    const sortedSuggestions = suggestionsMapping[column];

    const shouldShowOtherSuggestionsButton = sortedSuggestions.length > MAX_SUGGESTIONS;
    const visibleSuggestions = shouldShowOtherSuggestionsButton ? sortedSuggestions.slice(0, MAX_SUGGESTIONS) : sortedSuggestions;
    const otherSuggestions = shouldShowOtherSuggestionsButton ? sortedSuggestions.slice(MAX_SUGGESTIONS) : [];


    return (
        <>
            <ModalHeightWrapper>
                <div className='column-header'>
                    <Box mb={3} borderBottom={`0.0625rem solid ${gray100}`} py='0.6875rem' display='flex'
                        alignItems='center' justifyContent='space-between'>
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
                        {column}
                    </Typography>
                </div>

                <Box mb={3} borderBottom={`0.0625rem solid ${gray100}`} py='0.6875rem' display='flex'
                    alignItems='center' justifyContent='space-between' className='cde-suggestions__content'>
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
                        Select only 1 suggestion to map {column} with. Suggestions are ordered based on the quality of
                        the suggestion.
                    </Typography>
                </Box>

                <Box display='flex' alignItems='start' flexDirection='column' gap='3rem'>
                    {visibleSuggestions.map((suggestion, index) => {
                        return (
                            <SuggestionDetailUI key={index} entity={suggestion} />
                        );
                    })}
                    {shouldShowOtherSuggestionsButton && (
                        <Button variant='text' onClick={() => setShowOtherSuggestions(!showOtherSuggestions)}
                            disableRipple
                            className='suggestions__expand-btn'
                            sx={{
                                p: 0, gap: '0.25rem', color: primary600,

                                '& svg': {
                                    transform: showOtherSuggestions ? 'rotate(90deg)' : 'rotate(0deg)'
                                }
                            }}>
                            <ArrowDropDown />
                            {otherSuggestions.length} other suggestions available for this column. Expand all
                            suggestions.
                        </Button>
                    )}
                </Box>


                {showOtherSuggestions && (
                    <Box display='flex' alignItems='start' flexDirection='column' mt='3rem' gap='3rem'>
                        {otherSuggestions.map((suggestion, index) => (
                            <SuggestionDetailUI key={index} entity={suggestion} />
                        ))}
                    </Box>
                )}
            </ModalHeightWrapper>

            <Box width='calc(100% - 3rem)' mx='auto' justifyContent='space-between' display='flex' alignItems='center'
                sx={{ background: baseWhite, zIndex: 9 }} py='1rem' borderTop={`0.0625rem solid ${gray100}`}>
                <Box gap='0.75rem' display='flex' alignItems='center' className="suggestions__navigation-block">
                    <Box gap='0.25rem' display='flex' alignItems='center'>
                        <IconButton onClick={handlePrevious} sx={{
                            borderRadius: '0.5rem',
                            padding: '0.5rem',
                            border: `0.0625rem solid ${gray200}`,
                            boxShadow: '0rem 0.0625rem 0.125rem 0rem rgba(7, 8, 8, 0.05)'
                        }}
                            disabled={currentKeyIndex === 0}
                        >
                            <LeftIcon color={currentKeyIndex === 0 ? gray300 : gray500} />
                        </IconButton>
                        <IconButton onClick={handleNext} sx={{
                            borderRadius: '0.5rem',
                            padding: '0.5rem',
                            border: `0.0625rem solid ${gray300}`,
                            boxShadow: '0rem 0.0625rem 0.125rem 0rem rgba(7, 8, 8, 0.05)'
                        }} disabled={currentKeyIndex === columnsWithSuggestions.length - 1}>
                            <RightIcon
                                color={currentKeyIndex === columnsWithSuggestions.length - 1 ? gray300 : gray500} />
                        </IconButton>
                    </Box>
                    <Chip label={`Displaying ${currentKeyIndex + 1}/${columnsWithSuggestions.length} suggestions`}
                        color='primary' />
                </Box>

                <Box gap='0.5rem' display='flex' alignItems='center' className='suggestions__button-block'>
                    <Button variant='outlined' onClick={completeSuggestion}>Ignore suggestions</Button>
                    <Button variant='contained'>Accept selected mapping</Button>
                </Box>
            </Box>

            <Tour
                steps={tutorial[TourSteps.Suggestions]}
                stepIndex={stepIndex}
                setStepIndex={setStepIndex}
            />
        </>
    );
}

export default SuggestionsStep;
