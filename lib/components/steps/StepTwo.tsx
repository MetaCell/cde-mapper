import {useState} from 'react';
import {Stack, Typography, Box, Button, FormControl, RadioGroup} from '@mui/material';
import X from '../../components/assets/svg/x.svg';
import {ModalLayout} from "../layout/ModalLayout.tsx";
import StyledIconButton from '../common/StyledIconButton.tsx';
import {useCdeContext} from "../../CdeContext.tsx";
import {StyledStepper} from '../common/StyledStepper.tsx';
import StyledCard from '../common/StyledCard.tsx';


function StepOne() {
    const {handleClose, mapping} = useCdeContext();
    const [selectedRadioValue, setSelectedRadioValue] = useState("Spinal Cord Injury (SCI)");

    console.log(mapping)

    const handleRadioChange = (event: any, value: any) => {
        event.persist();
        setSelectedRadioValue(value);
    };

    return (
        <ModalLayout
            title="Map selected datasets"
            headerLeftNode={
                <StyledIconButton color="primary" size="small" onClick={handleClose}>
                    <img src={X} alt="X Icon"/>
                </StyledIconButton>
            }>
            <>
                <StyledStepper />
                <Stack alignItems="center" justifyContent="center" sx={{mx: 3, my: 6}}>
                    <Stack spacing={6} sx={{width: 'max-content'}}>
                        <Stack
                            spacing={1}
                            sx={{
                                alignItems: 'center',
                                '& .title': {
                                    color: 'grey.700', // Adjust color using theme
                                    fontSize: '1.5rem',
                                    fontWeight: 500,
                                    lineHeight: '2.25rem',
                                },
                                '& .sub': {
                                    color: 'grey.500', // Adjust color using theme
                                },
                            }}
                        >
                            <Typography className="title" fontSize={24}>
                                Select default repository
                            </Typography>
                            <Typography className="sub" textAlign="center">
                                This can be changed at any time during the process.
                            </Typography>
                        </Stack>
                        <FormControl>
                            <RadioGroup row value={selectedRadioValue} onChange={handleRadioChange} sx={{gap: 1.5}}>
                                <StyledCard value={"Spinal Cord Injury (SCI)"} isSuggested={true}/>
                                <StyledCard value={"Trauma Brain Injury (TBI)"}/>
                            </RadioGroup>
                        </FormControl>
                        <Stack alignItems="center" sx={{width: '100%'}}>
                            <Box>
                                <Button
                                    disableRipple
                                    variant="contained"
                                >
                                    Select repository
                                </Button>
                            </Box>
                            <Box sx={{mt: 1.5}}>
                                <Button
                                    disableRipple
                                    color="secondary"
                                    variant="text"
                                >
                                    Can’t find the repository you’re looking for? Contact us{' '}
                                </Button>
                            </Box>
                        </Stack>
                    </Stack>
                </Stack>
            </>
        </ModalLayout>
    );
}

export default StepOne;
