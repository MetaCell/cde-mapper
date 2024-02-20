import { Box, Button, Tab, Tabs, Tooltip, Typography, Divider, BoxProps } from '@mui/material';
import React, { Fragment } from 'react';
import StepOne from './StepOne.tsx';
import SuggestionsStep from './Suggestions/SuggestionsStep.tsx';
import StepThree from './StepThree.tsx';
import ModalHeightWrapper from '../common/ModalHeightWrapper.tsx';
import { vars } from '../../theme/variables.ts';
import { useCdeContext } from '../../CdeContext.ts';

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
        description: 'Suggestions are based on what was previously mapped before.',
        className: 'suggestions-tab'
    },
    {
        label: 'Map the rest of the dataset',
        heading: 'Configure all selected dataset',
        description: 'All (both mapped and unmapped) your selected dataset will be here to configure.'
    }
];

enum TabsEnum {
    Collection = 0,
    Suggestions = 1,
    Mapping = 2,
}


const renderTabComponent = (step: number, changeToNextTab: () => void, handleNextStepTutorial: () => void) => {
    switch (step) {
        case TabsEnum.Collection:
            return <ModalHeightWrapper height="11.5rem"><StepOne handleNextStepTutorial={handleNextStepTutorial} /></ModalHeightWrapper>;
        case TabsEnum.Suggestions:
            return <SuggestionsStep changeToNextTab={changeToNextTab} />;
        case TabsEnum.Mapping:
            return <StepThree handleNextStepTutorial={handleNextStepTutorial}/>;
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


const CustomTabPanel: React.FC<CustomTabPanelProps> = ({ children, value, index, ...other }) => {
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
    const { tourStepName, tourSteps, setTourStepName, setTourSteps } = useCdeContext();

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const changeToNextTab = () => {
        setValue((prevValue) => (prevValue + 1) % tabsArr.length);
    };

    const handleNextStepTutorial = () => {
        if(tourSteps[tourStepName].run){
            setTourSteps(prevTutorialSteps => ({
                ...prevTutorialSteps,
                [tourStepName]: {
                    ...prevTutorialSteps[tourStepName],
                    stepIndex: prevTutorialSteps[tourStepName].stepIndex + 1
                }
            }));
        }
    };

    React.useEffect(() => {
        if (value === 0) {
            setTourStepName('collection');
        } else if (value === 1) {
            setTourStepName('suggestions');
        } else {
            setTourStepName('mapping');
        }
    }, [value])

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
                            <Tab disableRipple label={`${index + 1}. ${tab.label}`} {...a11yProps(index)} className={`${tab?.className}`} />
                        </Tooltip>
                    ))}
                </Tabs>

                <Box display='flex' gap='0.625rem' alignItems='center'>
                    {value === TabsEnum.Suggestions ? (
                        <Button variant='text' onClick={() => setValue(TabsEnum.Mapping)} className='suggestions__cancel-btn'>
                            Continue without suggestions
                        </Button>) : value === TabsEnum.Mapping && (<>
                            <Typography sx={{
                                color: gray500,
                                fontSize: '0.75rem',
                                fontWeight: 500,
                                lineHeight: '150%',
                            }} className='mapping-header__indicator'>
                                37/120 column headers still unmapped
                            </Typography>

                            <Divider sx={{ height: '1.875rem', background: gray100, width: '0.0625rem' }} />

                            <Button variant='contained'>
                                Save mapping
                            </Button></>)}
                </Box>
            </Box>
            {tabsArr?.map((_tab, index) => (
                <CustomTabPanel key={index} value={value}
                    index={index}>{renderTabComponent(index, changeToNextTab, handleNextStepTutorial)}</CustomTabPanel>
            ))}
        </Fragment>
    );
}

export default MappingStep;
