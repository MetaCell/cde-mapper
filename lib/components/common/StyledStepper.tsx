import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import NAVIGATE_NEXT from '../assets/svg/navigate-next.svg';
import vars from '../assets/styles/variables';

const { palette } = vars;

const steps = ['1. Select default repository', '2. Suggestions', '3. Map the rest of the dataset'];

export const StyledStepper = () => {
  const [activeStep, setActiveStep] = React.useState(0);

  const isStepActive = (step: number) => {
    return activeStep === step;
  } 

  return (
    <Box width={1}>
      <Stepper
        activeStep={activeStep}
        connector={<img src={NAVIGATE_NEXT} style={{ margin: '0.5rem' }} alt='navigate-next' />}
        sx={{
          px: '1.5rem',
          borderBottom: `1px solid ${palette.grey[200]}`
        }}
      >
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          return (
            <Step
              key={label}
              {...stepProps}
              sx={{
                padding: '1rem 0.5rem 1rem 0',
                borderBottom: isStepActive(index) ? `2px solid ${palette.primary[600]}`: 'none'
              }}
            >
              <StepLabel
                {...labelProps}
                sx={{
                  '& .MuiStepLabel-iconContainer': {
                    display: 'none'
                  },
                  '& .MuiStepLabel-label': {
                    lineHeight: '1.25rem',
                    fontWeight: 500,
                    color: palette.grey[500],
                    '&.Mui-active': {
                      color: palette.primary[600],
                      fontWeight: 600,
                    }
                  }
                }}
              >
                {label}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
}
