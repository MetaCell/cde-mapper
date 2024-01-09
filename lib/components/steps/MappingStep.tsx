import { Box, Button, Tab, Tabs, Tooltip, Typography } from '@mui/material';
import { ModalLayout } from "../layout/ModalLayout.tsx";
import { useCdeContext } from "../../CdeContext.tsx";
import React, { ReactNode } from 'react';
import PropTypes from 'prop-types';
import StepOne from './StepOne.tsx';
import StepTwo from './StepTwo.tsx';

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const tabsArr = [
    {
        label: 'Select default repository',
        heading: 'Select default repository',
        description: 'Choose a default repository that best fit the dataset you have selected.'
    },
    {
        label: 'Suggestions',
        heading: 'Accept or decline suggestions',
        description: 'Suggestions are based on what was previously mapped before.'
    },
    {
        label: 'Map the rest of the dataset',
        heading: 'Configure all selected dataset',
        description: 'All (both mapped and unmapped) your selected dataset will be here to configure.'
    }
];

function CustomTabPanel(props: { children: ReactNode; value: number; index: number; }) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && children}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function MappingStep() {
    const { mapping } = useCdeContext();

    const [value, setValue] = React.useState(0);

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    console.log(mapping)

    return (
        <ModalLayout>
            <Box sx={{
                borderBottom: '0.0625rem solid #ECEDEE',
                padding: '0 1.5rem',
            }} display='flex' justifyContent='space-between' alignItems='center'>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    {tabsArr?.map((tab, index) => (
                        <Tooltip
                            placement='bottom'
                            title={
                                <>
                                    <Typography sx={{
                                        fontSize: '0.75rem',
                                        fontWeight: 600,
                                        lineHeight: '142.857%',
                                        marginBottom: '0.25rem',
                                        color: '#fff',
                                    }}>{tab.heading}</Typography>
                                    <Typography sx={{
                                        fontSize: '0.75rem',
                                        fontWeight: 400,
                                        lineHeight: '142.857%',
                                        color: '#fff',
                                    }}>{tab.description}</Typography>
                                </>
                            }
                        >
                            <Tab disableRipple label={`${index + 1}. ${tab.label}`} {...a11yProps(index)} />
                        </Tooltip>
                    ))}
                </Tabs>

                {
                    value !== 0 && <Box display='flex' gap='0.625rem' alignItems='center'>
                        <Button variant='text'>
                            Continue without suggestions
                        </Button>
                    </Box>
                }
            </Box>
            <CustomTabPanel value={value} index={0}>
                <StepOne />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <StepTwo />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                Item Three
            </CustomTabPanel>
        </ModalLayout>
    );
}

export default MappingStep;
