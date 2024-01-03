import {Box, Button, Typography} from '@mui/material';
import TABLE from '../../components/assets/svg/table.svg';
import {useCdeContext} from "../../CdeContext.tsx";
import {STEPS} from "../../models.ts";
import {processMappingFile, validateMappingFile} from "../../services/csvService.ts";
import {ModalLayout} from "../layout/ModalLayout.tsx";


function Home() {
    const {
        setStep,
        cdeFileMapping,
        setLoadingMessage,
        setErrorMessage,
        setMapping
    } = useCdeContext();

    const handleStartMapping = async () => {
        if (!cdeFileMapping) {
            setErrorMessage('Mapping file not found')
            return
        }

        setLoadingMessage('Validating and processing file...');

        try {
            const isValid = await validateMappingFile(cdeFileMapping);
            if (isValid) {
                const mapping = await processMappingFile(cdeFileMapping);
                setMapping(mapping);
                setStep(STEPS.REPOSITORY);
            } else {
                setErrorMessage('Invalid CSV file format.');
            }
        } catch (error) {
            // @ts-ignore
            setErrorMessage(error.message);
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
