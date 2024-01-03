import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { NavigateNext } from '../../icons';
import { vars } from '../../theme/variables';

const { gray200, gray500, primary600 } = vars;

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
        connector={<NavigateNext sx={{ margin: '0.5rem' }} />}
        sx={{
          px: '1.5rem',
          borderBottom: `1px solid ${gray200}`
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
                borderBottom: isStepActive(index) ? `2px solid ${primary600}`: 'none'
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
                    color: gray500,
                    '&.Mui-active': {
                      color: primary600,
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
