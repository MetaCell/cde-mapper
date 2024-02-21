import React, { useState } from 'react';
import Joyride, { ACTIONS, EVENTS, STATUS, CallBackProps, Step } from 'react-joyride';
import { Box, Typography, Button, IconButton } from '@mui/material';
import Checkbox from './CheckBox';
import { TutorialCloseIcon } from '../../icons';
import { vars } from '../../theme/variables';
import { useCdeContext } from '../../CdeContext';

const { baseWhite, gray300, gray500, gray600, primary600, primary700, tutorialOverlayColor, tooltipBoxShadow, gray100, gray900 } = vars;

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

    let isChecked = JSON.parse(localStorage.getItem('isCheckboxChecked') || 'false');
    const [checked, setChecked] = useState(isChecked);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
        localStorage.setItem('isCheckboxChecked', JSON.stringify(event.target.checked));
    };
 
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
                    checked={checked}
                    onChange={handleChange}
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
                        {index > 0 && !hideBackButton && (
                            <Button id="back" {...backProps} sx={{ border: `1px solid ${gray300}`, '&:hover': { color: gray600 } }}>
                                Back
                            </Button>
                        )}
                        {!isLastStep && hideBackButton && (
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

interface TourProps {
    steps: Step[];
    stepIndex: number;
    setStepIndex: (stepIndex: number) => void;
    isSpotlightOpen?: boolean;
    handleSpotlightClose?: () => void;
}

const Tour = (props: TourProps) => {
    const { steps, stepIndex, setStepIndex, isSpotlightOpen, handleSpotlightClose } = props;
    const { isTourOpen, setIsTourOpen } = useCdeContext();

    const handleJoyrideCallback = (data: CallBackProps) => {
        const { action, index, status, type } = data;
        if (([STATUS.FINISHED, STATUS.SKIPPED] as string[]).includes(status)) {
            setIsTourOpen(false)
        } else if (([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND] as string[]).includes(type)) {
            const nextStepIndex = index + (action === ACTIONS.PREV ? -1 : 1)
            if(isSpotlightOpen && (nextStepIndex === 5 || nextStepIndex===8)){
                handleSpotlightClose?.()
            }
            setStepIndex(action === ACTIONS.CLOSE ? 0 : nextStepIndex)
            setIsTourOpen(action === ACTIONS.CLOSE ? false : true)
        } else if (([ACTIONS.CLOSE] as string[]).includes(action)) {
            setIsTourOpen(false)
        }
    };

    return (
        <Joyride
            callback={handleJoyrideCallback}
            continuous={true}
            disableOverlayClose={true}
            run={isTourOpen}
            stepIndex={stepIndex}
            steps={steps}
            showProgress={false}
            showSkipButton={true}
            tooltipComponent={Tooltip}
            styles={{
                options: {
                    width: 350,
                    arrowColor: baseWhite,
                    backgroundColor: baseWhite,
                    primaryColor: primary600,
                    zIndex: 100000
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
                    display: 'flex',
                    flexDirection: 'column',
                    fontSize: '0.875rem',
                    padding: '0 1.5rem 0.75rem 1.5rem',
                    color: gray600
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
                        willChange: 'unset !important'
                    }
                }
            }}
        />
    )
}

export default Tour;