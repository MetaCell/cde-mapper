import { Box, Button, Stack, Typography, Chip } from '@mui/material';
import X from '../../components/assets/svg/x.svg';
import { ModalLayout } from "../layout/ModalLayout.tsx";
import StyledIconButton from '../common/StyledIconButton.tsx';
import { useCdeContext } from "../../CdeContext.tsx";
import { STEPS } from "../../models.ts";
import { StyledTable } from '../common/StyledTable.tsx';
import { processMappingFile, validateMappingFile } from "../../services/csvService.ts";
import CIRCLE_CHIP_SUCCESS from "../../components/assets/svg/circle-chip-success.svg";
import CIRCLE_CHIP_DEFAULT from "../../components/assets/svg/circle-chip-default.svg";
import vars from '../assets/styles/variables.ts';

const { palette } = vars;


function Home() {
    const {
        setStep,
        labName,
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
        } catch (error: any) {
            setErrorMessage(error.message);
        }

        setLoadingMessage(null);
    };

    return (
        <ModalLayout
            title="Map selected datasets"
            headerLeftNode={
                <StyledIconButton color="primary" size="small" onClick={handleClose}>
                    <img src={X} alt="X Icon"/>
                </StyledIconButton>
            }>
            <Stack alignItems="center" justifyContent="center" sx={{m: 6}}>
                <Stack spacing={6}>
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
                            <br />
                            on ODC’s website to map.
                        </Typography>
                    </Stack>
                    <Stack alignItems="center" justifyContent="center">
                        <Box display="flex" alignItems="center" justifyContent="space-between" mb={4} width={1}>
                            <Box
                                display="flex"
                                alignItems="center"
                                sx={{
                                    borderLeft: `2px solid ${palette.primary[600]}`,
                                    '& .MuiTypography-h6': {
                                        fontSize: '1.125rem',
                                        color: palette.primary[600],
                                        lineHeight: '1.75rem',
                                        marginLeft: '0.75rem',
                                        marginRight: '0.5rem'
                                    },
                                    '& .MuiTypography-body2': {
                                        color: palette.grey[600],
                                        lineHeight: '1.25rem'
                                    }
                                }}
                            >
                                <Typography variant="h6">124</Typography>
                                <Typography variant="body2">total number of column headers</Typography>
                            </Box>
                            <Box display="flex" alignItems="center" gap={1}>
                                <Chip size="small" label="41 mapped" color="success" icon={<img src={CIRCLE_CHIP_SUCCESS} alt="circle" />} />
                                <Chip size="small" label="83 unmapped, 13 suggestions available" color="default" icon={<img src={CIRCLE_CHIP_DEFAULT} alt='circle' />} />
                            </Box>
                        </Box>
                        <StyledTable />
                    </Stack>
                    <Stack alignItems="center" sx={{ width: '100%' }}>
                        <Box>
                            <Button
                                disableRipple
                                variant="contained"
                                onClick={handleStartMapping}>
                                Start mapping
                            </Button>
                        </Box>
                        <Box sx={{ mt: 1.5 }}>
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
