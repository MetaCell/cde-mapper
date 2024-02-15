import React from 'react';
import Joyride, { ACTIONS, EVENTS, STATUS, CallBackProps } from 'react-joyride';
import { Box, Typography, Button, IconButton, Stack, } from '@mui/material';
import Checkbox from './CheckBox';
import { useCdeContext } from '../../CdeContext';
import { TutorialCloseIcon } from '../../icons';
import { vars } from '../../theme/variables';

const {baseWhite, gray300, gray500, gray600, primary600, primary700, tutorialOverlayColor, tooltipBoxShadow, gray100, gray900} = vars;

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
    const {
        styles: {
            tooltip: tooltipStyle,
            tooltipTitle,
            tooltipContent,
            tooltipFooter
        },
        placement,
        spotlightClicks,
        hideBackButton,
        hideCloseButton,
        hideFooter
    } = step;

    return (
        <Box
            className="tooltip"
            {...tooltipProps}
            {...tooltipStyle}
            {...placement}
            {...spotlightClicks}
        >
            {step.title && (
                <Box className='tooltip-title' {...tooltipTitle}>
                    {step.title}
                    <IconButton {...skipProps} sx={{ padding: 0, margin: 0, '&:hover': { background: 'transparent' } }}>
                        <TutorialCloseIcon />
                    </IconButton>
                </Box>
            )}
            <Box className='tooltip-content' {...tooltipContent}>
                {step.content}
                <Checkbox
                    label='Dont show on startup (accessible on the header)'
                    sx={{
                        mt: step.content !== '' ? '2rem' : 0,
                        '& .MuiTypography-root': {
                            fontSize: '0.75rem',
                            fontWeight: 400,
                            color: gray500
                        }
                    }}
                />
            </Box>
            <Box className='tooltip-footer' {...tooltipFooter}>
                <Typography variant='caption' sx={{ color: gray500 }}>{index + 1} of {size}</Typography>
                {continuous && !hideFooter && (
                    <Box display="flex" gap={1}>
                        {index > 0 && !hideBackButton ? (
                            <Button id="back" {...backProps} sx={{ border: `1px solid ${gray300}`, '&:hover': { color: gray600 } }}>
                                Back
                            </Button>
                        ) : (
                            <Button id="skip" {...skipProps} sx={{ border: `1px solid ${gray300}`, '&:hover': { color: gray600 } }}>
                                Skip tutorial
                            </Button>
                        )}
                        {!isLastStep && (
                            <Button id="next" {...primaryProps} sx={{ backgroundColor: primary600, color: baseWhite, '&:hover': { backgroundColor: primary700, color: baseWhite } }}>
                                Next
                            </Button>
                        )}
                        {isLastStep && !hideCloseButton && (
                            <Button id="close" {...closeProps} sx={{ backgroundColor: primary600, color: baseWhite, '&:hover': { backgroundColor: primary700, color: baseWhite } }}>
                                Close tutorial
                            </Button>
                        )}
                    </Box>
                )}
            </Box>
        </Box>
    );
}

export const WalkthroughStartDialog = () => {
    const [isSkipped, setIsSkipped] = React.useState(false)
    const {setTutorialSteps} = useCdeContext();

    const handleSkipButtonClick = () => {
        setIsSkipped(true)
    };

    const handleNextButtonClick = () => {
        setTutorialSteps(prevTutorialSteps => ({
            ...prevTutorialSteps,
            ["home"]: {
                ...prevTutorialSteps["home"],
                run: true
            }
        }));
    };

    return !isSkipped && (
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
            <Typography variant='subtitle2' fontWeight={600} sx={{color: gray900}}>Get started with mapping</Typography>
            <Typography variant='subtitle2' fontWeight={400} mt={1.5} sx={{color: gray600}}>Would you like a quick tour of the basics of mapping your dataset?</Typography>
            <Stack direction="row" mt={3} justifyContent="space-between">
                <Button sx={{ minWidth: '8.5rem', '&:hover': { color: gray600 } }} onClick={handleSkipButtonClick}>Skip tutorial</Button>
                <Button sx={{ minWidth: '8.5rem', backgroundColor: primary600, color: baseWhite, '&:hover': { backgroundColor: primary700, color: baseWhite } }} onClick={handleNextButtonClick}>Next</Button>
            </Stack>
        </Box>
    )
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
                    run: false,
                    stepIndex: 0
                }
            }));
        }
    };
    console.log("tutorial step: ", tutorialStep)
    console.log("tutorialStep[].run: ", tutorialSteps[tutorialStep].run)
    console.log("tutorialSteps[].stepIndex: ", tutorialSteps[tutorialStep].stepIndex)

    return (
        <Joyride
            callback={handleJoyrideCallback}
            continuous={true}
            disableOverlayClose={true}
            run={tutorialSteps[tutorialStep].run}
            stepIndex={tutorialSteps[tutorialStep].stepIndex}
            steps={tutorialSteps[tutorialStep].steps}
            showProgress={false}
            showSkipButton={true}
            tooltipComponent={Tooltip}
            styles={{
                options: {
                    width: 350,
                    arrowColor: baseWhite,
                    backgroundColor: baseWhite,
                    primaryColor: primary600,
                    zIndex: 10000
                },
                spotlight: {
                    borderRadius: '0.5rem'
                },
                overlay: {
                    background: tutorialOverlayColor
                },
                beaconOuter: {
                    filter: 'none',
                    willChange: 'unset'
                },
                tooltip: {
                    padding: 0,
                    borderRadius: '0.25rem',
                    boxShadow: tooltipBoxShadow
                },
                tooltipTitle: {
                    color: gray900,
                    fontSize: '0.875rem',
                    padding: '1.5rem 1.5rem 0.75rem 1.5rem',
                    fontWeight: 600,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                },
                tooltipContent: {
                    fontSize: '0.875rem',
                    padding: '0 1.5rem 0.75rem 1.5rem',
                    color: gray600,
                },
                tooltipContainer: {
                    textAlign: 'left',
                    lineHeight: '1.25rem',
                },
                tooltipFooter: {
                    justifyContent: 'space-between',
                    marginTop: 0,
                    padding: '0.75rem 1.5rem 0.75rem 1.5rem',
                    borderTop: `1px solid ${gray100}`,
                    minHeight: '3.75rem'
                },
                buttonNext: {
                    backgroundColor: primary600,
                    color: baseWhite,
                },
                buttonBack: {
                    color: gray500,
                    border: `1px solid ${gray300}`,
                    background: baseWhite,
                },
                buttonClose: {
                    height: 14,
                    padding: 0,
                    paddingRight: '1.5rem',
                    paddingTop: '1.5rem',
                    position: 'absolute' as const,
                    right: 0,
                    top: 0,
                    width: 14,
                    boxShadow: 'none',
                    border: 'none',
                    minWidth: 'auto',
                },
                buttonSkip: {
                    color: gray500,
                    border: `1px solid ${gray300}`,
                    background: baseWhite,
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