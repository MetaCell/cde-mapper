import React from 'react';
import { Box, Button, Typography, Chip } from '@mui/material';
import { useCdeContext } from "../../CdeContext.tsx";
import { STEPS } from "../../models.ts";
// import { validateInputMappings, processInputMappings } from '../../services/mappingService.ts';
import { StyledTable } from '../common/StyledTable.tsx';
import { CircleChipDefault, CircleChipSuccess } from '../../icons/index.tsx';
import Joyride, { ACTIONS, EVENTS, STATUS, CallBackProps, Step } from 'react-joyride';
import Checkbox from '../common/CheckBox.tsx';
import {vars} from '../../theme/variables.ts';

const {primary600, gray600, drodownDetailBg} = vars;

const buttonBase = {
    backgroundColor: 'transparent',
    borderRadius: 8,
    cursor: 'pointer',
    fontSize: 14,
    lineHeight: '20px',
    padding: '8px 14px',
    boxShadow: '0px 1px 2px 0px rgba(7, 8, 8, 0.05)',
    minWidth: '8.5rem',
    fontWeight: 600,
    WebkitAppearance: 'none' as const,
};

interface TooltipProps {
    continuous: boolean,
    index: number
    isLastStep: boolean
    size: number
    step: any
    backProps: any
    closeProps: any
    primaryProps: any
    skipProps: any
    tooltipProps: any
}

const Tooltip = ({
    continuous,
    index,
    step,
    // backProps,
    closeProps,
    primaryProps,
    tooltipProps,
    skipProps,
    size
}: TooltipProps) => {
    return (
        <Box
            className="tooltip"
            {...tooltipProps}
            {...step.styles.tooltip}
            {...step.placement}
            {...step.spotlightClicks}
        >
            {
                step.title && <Box className='tooltip-title' {...step.styles.tooltipTitle}>
                    {step.title}
                </Box>
            }
            <Box className='tooltip-content' {...step.styles.tooltipContent}>
                {step.content}
                <Checkbox label='Don’t show on startup (accessible on the header)' sx={{
                    mt: '2rem',
                    '& .MuiTypography-root': {
                        fontSize: '0.75rem',
                        fontWeight: 400,
                        color: '#676C74'
                    }
                }}/>
            </Box>
            <Box className='tooltip-footer' {...step.styles.tooltipFooter}>
                <Typography variant='caption' sx={{ color: '#676C74' }}>{index + 1} of {size}</Typography>
                {continuous && !step.spotlightClicks && (
                    <Box display="flex" gap={1}>
                        <Button id="back" {...skipProps} sx={{ border: `1px solid #D6D8DB`, '&:hover': { color: '#4F5359' } }}>
                            Skip tutorial
                        </Button>
                        <Button id="next" {...primaryProps} sx={{ backgroundColor: '#19418F', color: '#fff', '&:hover': { backgroundColor: '#122E64', color: 'white' } }}>
                            Next
                        </Button>
                    </Box>
                )}
                {!continuous && (
                    <Button id="close" {...closeProps}>
                        Close
                    </Button>
                )}
            </Box>
        </Box>
    );
}

function Home() {
    const {
        setStep,
        datasetSample,
        runTutorial,
        setRunTutorial,
        setTutorialStepIndex
    } = useCdeContext();
    const [steps, setSteps] = React.useState<Step[]>([
        {
            target: '.stats-content',
            title: 'Stats of your mapping',
            disableBeacon: true,
            content: 'This shows how much mappings you have completed and how much you have left to map.'
        },
        {
            target: '.dataset-table',
            title: 'Preview of your dataset',
            content: 'This shows your selected dataset. Important thing to look out here is the column header because that’s what you’l be mapping.'
        },
        {
            target: '.about__info-btn',
            title: 'Click to open more information',
            content: 'Lost in what mapping is, how it works? Find out more by clicking this button.',
            placement: 'right-end',
            spotlightClicks: true
        },
        {
            target: '.about__info-sidebar',
            title: 'Information on mappings',
            content: 'This is a good place to refer to what you’re mapping, what CDEs are, how it works, etc.',
            placement: 'right-start'
        },
        {
            target: '.sidebar__close-btn',
            title: 'Click to close and continue',
            content: 'Click to close this info sidebar and continue with your mapping.',
            placement: 'right',
            // spotlightClicks: true
        },
        {
            target: '.mapping__start-btn',
            title: 'Ready to start mapping?',
            content: 'Now that you’ve got all the information that you need, click this button to start mapping. All the information on this screen will be available throughout the process to help guide you.',
            spotlightClicks: true
        },
    ]);

    const handleJoyrideCallback = (data: CallBackProps) => {
        const { action, index, status, type } = data;
        if (([STATUS.FINISHED, STATUS.SKIPPED] as string[]).includes(status)) {
            setRunTutorial(false);
        } else if (([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND] as string[]).includes(type)) {
            const nextStepIndex = index + (action === ACTIONS.PREV ? -1 : 1);
            setTutorialStepIndex(nextStepIndex);
        } else if (([ACTIONS.CLOSE] as string[]).includes(action)) {
            setRunTutorial(false);
        }
    };


    return (
        <Box display='flex' alignItems='center' flexDirection='column' px={3} py={6} sx={{
            background: drodownDetailBg
        }}>
            <Typography sx={{marginBottom: '0.5rem'}} variant='h3'>
                Create mapping(s) with selected dataset?
            </Typography>
            <Typography variant='body2' sx={{
                maxWidth: '31.25rem',
                textAlign: 'center',
            }}>
                You’ve selected column headers from the [Lab name]’s dataset on ODC’s website to map.
            </Typography>
            <Box my={6}>
                <Box display="flex" alignItems="center" justifyContent="space-between" mb={4} width={1}>
                    <Box
                        display="flex"
                        alignItems="center"
                        sx={{
                            borderLeft: `0.125rem solid ${primary600}`,
                            '& .MuiTypography-h6': {
                                fontSize: '1.125rem',
                                color: primary600,
                                lineHeight: '1.75rem',
                                marginLeft: '0.75rem',
                                marginRight: '0.5rem'
                            },
                            '& .MuiTypography-body2': {
                                color: gray600,
                                lineHeight: '1.25rem',
                                fontSize: '0.875rem'
                            }
                        }}
                    >
                        <Typography variant="h6">124</Typography>
                        <Typography variant="body2">total number of column headers</Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1}>
                        <Chip size="small" label="41 mapped" color="success" icon={<CircleChipSuccess/>}/>
                        <Chip size="small" label="83 unmapped, 13 suggestions available" color="default"
                              icon={<CircleChipDefault/>}/>
                    </Box>
                </Box>
                <StyledTable sample={datasetSample}/>
            </Box>

            <Box display='flex' flexDirection='column' alignItems='center' gap={1.5}>
                <Button variant='contained' onClick={() => setStep(STEPS.COLLECTION)}>Start mapping</Button>
                <Button variant='text' onClick={() => setStep(-1)}>No, create an empty template with CDEs
                    instead </Button>
            </Box>
        </Box>
    );
}

export default Home;