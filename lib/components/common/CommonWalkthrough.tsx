import Joyride, { ACTIONS, EVENTS, STATUS, CallBackProps } from 'react-joyride';
import { Box, Typography, Button, } from '@mui/material';
import Checkbox from './CheckBox';
import { useCdeContext } from '../../CdeContext';

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
};

const Tooltip = ({
    continuous,
    index,
    isLastStep,
    step,
    backProps,
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
                <Checkbox label='Dont show on startup (accessible on the header)' sx={{
                    mt: '2rem',
                    '& .MuiTypography-root': {
                        fontSize: '0.75rem',
                        fontWeight: 400,
                        color: '#676C74'
                    }
                }} />
            </Box>
            <Box className='tooltip-footer' {...step.styles.tooltipFooter}>
                <Typography variant='caption' sx={{ color: '#676C74' }}>{index + 1} of {size}</Typography>
                <>
                    {continuous && !step.spotlightClicks && (
                        <Box display="flex" gap={1}>
                            {index > 0 ? (
                                <Button id="back" {...backProps} sx={{ border: `1px solid #D6D8DB`, '&:hover': { color: '#4F5359' } }}>
                                    Back
                                </Button>
                            ) : <Button id="skip" {...skipProps} sx={{ border: `1px solid #D6D8DB`, '&:hover': { color: '#4F5359' } }}>
                                Skip tutorial
                            </Button>}
                            {!isLastStep && <Button id="next" {...primaryProps} sx={{ backgroundColor: '#19418F', color: '#fff', '&:hover': { backgroundColor: '#122E64', color: 'white' } }}>
                                Next
                            </Button>}
                        </Box>
                    )}
                    {isLastStep && (
                        <Button id="close" {...closeProps} sx={{ backgroundColor: '#19418F', color: '#fff', '&:hover': { backgroundColor: '#122E64', color: 'white' } }}>
                            Close tutorial
                        </Button>
                    )}
                </>
            </Box>
        </Box>
    );
}

const CommonWalkthrough = () => {
    const { tutorialStep, tutorialSteps, setTutorialSteps } = useCdeContext();

    const handleJoyrideCallback = (data: CallBackProps) => {
        const { action, index, status, type } = data;
        if (([STATUS.FINISHED, STATUS.SKIPPED] as string[]).includes(status)) {
            setTutorialSteps(prevTutorialSteps => ({
                ...prevTutorialSteps,
                [tutorialStep]: {
                    ...prevTutorialSteps[tutorialStep],
                    run: false
                }
            }));
        } else if (([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND] as string[]).includes(type)) {
            const nextStepIndex = index + (action === ACTIONS.PREV ? -1 : 1);
            setTutorialSteps(prevTutorialSteps => ({
                ...prevTutorialSteps,
                [tutorialStep]: {
                    ...prevTutorialSteps[tutorialStep],
                    stepIndex: nextStepIndex
                }
            }));
        } else if (([ACTIONS.CLOSE] as string[]).includes(action)) {
            setTutorialSteps(prevTutorialSteps => ({
                ...prevTutorialSteps,
                [tutorialStep]: {
                    ...prevTutorialSteps[tutorialStep],
                    run: false
                }
            }));
        }
    };

    return (
        <Joyride
            callback={handleJoyrideCallback}
            continuous={true}
            hideBackButton={true}
            run={tutorialSteps[tutorialStep].run}
            stepIndex={tutorialSteps[tutorialStep].stepIndex}
            steps={tutorialSteps[tutorialStep].steps}
            showProgress={false}
            showSkipButton={true}
            tooltipComponent={Tooltip}
            styles={{
                options: {
                    width: 350,
                    arrowColor: '#fff',
                    backgroundColor: '#fff',
                    primaryColor: '#19418F',
                    zIndex: 10000,
                },
                spotlight: {
                    borderRadius: '0.5rem'
                },
                beaconOuter: {
                    filter: 'none',
                    willChange: 'unset'
                },
                tooltip: {
                    padding: 0,
                    borderRadius: '0.25rem'
                },
                tooltipTitle: {
                    color: '#070808',
                    fontSize: '14px',
                    padding: '24px 24px 12px 24px',
                    fontWeight: 600,
                },
                tooltipContent: {
                    fontSize: '14px',
                    padding: '0 24px 12px 24px',
                    color: '#4F5359',
                },
                tooltipContainer: {
                    textAlign: 'left',
                    lineHeight: '20px',
                },
                tooltipFooter: {
                    justifyContent: 'space-between',
                    marginTop: 0,
                    padding: '12px 24px 12px 24px',
                    borderTop: `1px solid #ECEDEE`
                },
                buttonNext: {
                    ...buttonBase,
                    backgroundColor: '#19418F',
                    color: '#fff',
                },
                buttonBack: {
                    ...buttonBase,
                    color: '#676C74',
                    border: '1px solid #D6D8DB',
                    background: '#fff',
                },
                buttonClose: {
                    ...buttonBase,
                    height: 14,
                    padding: 0,
                    paddingRight: '24px',
                    paddingTop: '24px',
                    position: 'absolute' as const,
                    right: 0,
                    top: 0,
                    width: 14,
                    boxShadow: 'none',
                    border: 'none',
                    minWidth: 'auto',
                },
                buttonSkip: {
                    ...buttonBase,
                    color: '#676C74',
                    border: '1px solid #D6D8DB',
                    background: '#fff',
                },
            }}
            locale={{
                skip: 'Skip tutorial',
                next: 'Next',
            }}
            floaterProps={{
                disableAnimation: true,
                styles: {
                    floater: {
                        filter: 'none',
                    },
                    wrapperPosition: {
                        willChange: 'unset',
                    },
                }
            }}
        />
    )
}

export default CommonWalkthrough;