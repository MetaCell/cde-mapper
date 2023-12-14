import {Box, Button, Stack, Typography} from '@mui/material';
import TABLE from '../../components/assets/svg/table.svg';
import X from '../../components/assets/svg/x.svg';
import {ModalLayout} from "../layout/ModalLayout.tsx";
import StyledIconButton from '../common/StyledIconButton.tsx';
import {useCdeContext} from "../../CdeContext.tsx";
import {STEPS} from "../../models.ts";


function Home() {
    const {setStep, labName, handleClose} = useCdeContext();

    return (
        <ModalLayout
            title="Map selected datasets"
            headerLeftNode={
                <StyledIconButton color="primary" size="small" onClick={handleClose}>
                    <img src={X} alt="X Icon" />
                </StyledIconButton>
            }>
            <Stack alignItems="center" justifyContent="center" width="100%" sx={{mx: 6}}>
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
                            Create mapping(s) with selected datasets?
                        </Typography>
                        <Typography className="sub" textAlign="center">
                            You’ve selected column headers from the {labName} datasets{' '}
                            <br/>
                            on ODC’s website to map.
                        </Typography>
                    </Stack>
                    <img src={TABLE} alt="table"/>
                    <Stack alignItems="center" sx={{width: '100%'}}>
                        <Box>
                            <Button
                                disableRipple
                                variant="contained"
                                onClick={() => setStep(STEPS.REPOSITORY)}>
                                Start mapping
                            </Button>
                        </Box>
                        <Box sx={{mt: 1}}>
                            <Button
                                disableRipple
                                color="secondary"
                                variant="text"
                                onClick={() => setStep(-1)}>
                                No, create an empty template with CDEs instead{' '}
                            </Button>
                        </Box>
                    </Stack>
                </Stack>
            </Stack>
        </ModalLayout>
    );
}

export default Home;
