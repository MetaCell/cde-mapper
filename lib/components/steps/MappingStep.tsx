import {Box, Button, Tab, Tabs, Tooltip, Typography, Divider, BoxProps} from '@mui/material';
import React, {Fragment} from 'react';
import StepOne from './StepOne.tsx';
import StepTwo from './StepTwo.tsx';
import StepThree from './StepThree.tsx';
import ModalHeightWrapper from '../common/ModalHeightWrapper.tsx';
import {vars} from '../../theme/variables.ts';

const {
    baseWhite,
    gray500,
    gray100
} = vars

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

const renderTabComponent = (step: number,  changeToNextTab: () => void) => {
    switch (step) {
        case 0:
            return <ModalHeightWrapper height="11.5rem"><StepOne/></ModalHeightWrapper>;
        case 1:
            return <StepTwo changeToNextTab={changeToNextTab}/>;
        case 2:
            return <StepThree/>;
        // Add cases for other steps
        default:
            return <div>Unknown step</div>;
    }
};

interface CustomTabPanelProps extends BoxProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}


const CustomTabPanel: React.FC<CustomTabPanelProps> = ({children, value, index, ...other}) => {
    return (
        <Box
            height={1}
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && children}
        </Box>
    );
};


function MappingStep() {
    const [value, setValue] = React.useState(0);

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const changeToNextTab = () => {
        setValue((prevValue) => (prevValue + 1) % tabsArr.length);
    };

    return (
        <Fragment>
            <Box sx={{
                borderBottom: `0.0625rem solid ${gray100}`,
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
                                        color: baseWhite,
                                    }}>{tab.heading}</Typography>
                                    <Typography sx={{
                                        fontSize: '0.75rem',
                                        fontWeight: 400,
                                        lineHeight: '142.857%',
                                        color: baseWhite,
                                    }}>{tab.description}</Typography>
                                </>
                            }
                        >
                            <Tab disableRipple label={`${index + 1}. ${tab.label}`} {...a11yProps(index)} />
                        </Tooltip>
                    ))}
                </Tabs>

                <Box display='flex' gap='0.625rem' alignItems='center'>
                    {value === 1 ? (<Button variant='text'>
                        Continue without suggestions
                    </Button>) : value === 2 && (<>
                        <Typography sx={{
                            color: gray500,
                            fontSize: '0.75rem',
                            fontWeight: 500,
                            lineHeight: '150%',
                        }}>
                            37/120 column headers still unmapped
                        </Typography>

                        <Divider sx={{height: '1.875rem', background: gray100, width: '0.0625rem'}}/>

                        <Button variant='contained'>
                            Save mapping
                        </Button></>)}
                </Box>
            </Box>
            {tabsArr?.map((_tab, index) => (
                <CustomTabPanel key={index} value={value} index={index}>{renderTabComponent(index, changeToNextTab)}</CustomTabPanel>
            ))}
        </Fragment>
    );
}

export default MappingStep;
