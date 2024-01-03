import {Box, Button, Typography} from '@mui/material';
import TABLE from '../../components/assets/svg/table.svg';
import {useCdeContext} from "../../CdeContext.tsx";
import {STEPS} from "../../models.ts";
import {processInputMappings, validateInputMappings} from "../../services/mappingService.ts";
import {ModalLayout} from "../layout/ModalLayout.tsx";


function Home() {
    const {
        setStep,
        inputMappings,
        setLoadingMessage,
        setErrorMessage,
        setMapping
    } = useCdeContext();

    const handleStartMapping = async () => {
        if (inputMappings.length == 0) {
            setErrorMessage('Mapping file not found')
            return
        }

        setLoadingMessage('Validating and processing file...');

        try {
            const isValid = validateInputMappings(inputMappings);
            if (isValid) {
                const mapping = processInputMappings(inputMappings);
                setMapping(mapping);
                setStep(STEPS.REPOSITORY);
                console.log(mapping)
            } else {
                setErrorMessage('Invalid CSV file format.');
            }
        }  catch (error) {
            if (error instanceof Error) {
                setErrorMessage(error.message);
            } else {
                setErrorMessage('An unknown error occurred');
            }
        }

        setLoadingMessage(null);
    };

    return (
        <ModalLayout>
            <Box display='flex' alignItems='center' flexDirection='column' px={3} py={6} sx={{
                background: '#FCFCFD',
                '& img': {
                    maxWidth: '40.625rem',
                    display: 'block'
                }
            }}>
                <Typography sx={{ marginBottom: '0.25rem' }} variant='h3'>
                    Create mapping(s) with selected dataset?
                </Typography>
                <Typography variant='body2' sx={{
                    maxWidth: '31.25rem',
                    textAlign: 'center',
                }}>
                    You’ve selected column headers from the [Lab name]’s dataset on ODC’s website to map.
                </Typography>
                <Box my={3}>
                    <img src={TABLE} alt="table"/>
                </Box>

                <Box display='flex' flexDirection='column' alignItems='center' gap={1.5}>
                    <Button variant='contained' onClick={handleStartMapping}>Start mapping</Button>
                    <Button variant='text' onClick={() => setStep(-1)}>No, create an empty template with CDEs instead </Button>
                </Box>
            </Box>
        </ModalLayout>
    );
}

export default Home;
