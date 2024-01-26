import { Box, Button, Typography, Chip, Paper, TableContainer } from '@mui/material';
import { useCdeContext } from "../../CdeContext.tsx";
import { STEPS } from "../../models.ts";
import { validateInputMappings, processInputMappings } from '../../services/mappingService.ts';
import { ModalLayout } from "../layout/ModalLayout.tsx";
import { StyledTable } from '../common/StyledTable.tsx';
import { CircleChipDefault, CircleChipSuccess } from '../../icons/index.tsx';
import { vars } from '../../theme/variables.ts';

const { primary600, gray600, drodownDetailBg, gray100 } = vars;

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
        } catch (error) {
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
                background: drodownDetailBg
            }}>
                <Typography sx={{ marginBottom: '0.5rem' }} variant='h3'>
                    Create mapping(s) with selected dataset?
                </Typography>
                <Typography variant='body2' sx={{
                    maxWidth: '31.25rem',
                    textAlign: 'center',
                }}>
                    You’ve selected column headers from the [Lab name]’s dataset on ODC’s website to map.
                </Typography>
                <Box my={6}>
                    <Box display="flex" alignItems="center" justifyContent="space-between" mb={4} width={1}>
                        <Box
                            display="flex"
                            alignItems="center"
                            sx={{
                                borderLeft: `0.125rem solid ${primary600}`,
                                '& .MuiTypography-h6': {
                                    fontSize: '1.125rem',
                                    color: primary600,
                                    lineHeight: '1.75rem',
                                    marginLeft: '0.75rem',
                                    marginRight: '0.5rem'
                                },
                                '& .MuiTypography-body2': {
                                    color: gray600,
                                    lineHeight: '1.25rem',
                                    fontSize: '0.875rem'
                                }
                            }}
                        >
                            <Typography variant="h6">124</Typography>
                            <Typography variant="body2">total number of column headers</Typography>
                        </Box>
                        <Box display="flex" alignItems="center" gap={1}>
                            <Chip size="small" label="41 mapped" color="success" icon={<CircleChipSuccess />} />
                            <Chip size="small" label="83 unmapped, 13 suggestions available" color="default" icon={<CircleChipDefault />} />
                        </Box>
                    </Box>
                    <TableContainer
                        component={Paper}
                        elevation={0}
                        sx={{
                            maxWidth: '650px',
                            border: `0.0625rem solid ${gray100}`,
                            borderBottom: 0
                        }}
                    >
                        <StyledTable tableCellMinWidth='7.5rem' />
                    </TableContainer>
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