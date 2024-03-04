import React from 'react';
import { Box, Button, Typography, Chip, TableContainer, Paper } from '@mui/material';
import { StyledTable } from '../common/StyledTable.tsx';
import { CircleChipDefault, CircleChipSuccess } from '../../icons/index.tsx';
import { vars } from '../../theme/variables.ts';
import { STEPS } from "../../models.ts";
import { useDataContext } from "../../contexts/data/DataContext.ts";
import {useServicesContext} from "../../contexts/services/ServicesContext.ts";
import {useUIContext} from "../../contexts/ui/UIContext.ts";

const { primary600, gray600, drodownDetailBg, gray200 } = vars;

function Home(props: { homeStepIndex: number, setHomeStepIndex: React.Dispatch<React.SetStateAction<number>> }) {
    const [isTourStartDialogVisible, setIsTourStartDialogVisible] = React.useState(true);
    const { isTourOpen, setIsTourOpen } = useCdeContext();
    const { homeStepIndex, setHomeStepIndex } = props;
    const {
        name,
        datasetSample,
    } = useDataContext();

    const {
        getTotalRowsCount,
        getMappedRowsCount,
        getUnmappedRowsCount,
        getSuggestionsCount,
    } = useServicesContext();

    const {
        setStep,
    } = useUIContext();

    return (
        <>
            <Box display='flex' alignItems='center' flexDirection='column' px={3} py={6} sx={{
                background: drodownDetailBg
            }}>
                You’ve selected column headers from the {name}’s dataset on ODC’s website to map.
            </Typography>
            <Box my={6}>
                <Box display="flex" alignItems="center" justifyContent="space-between" mb={4} width={1}>
                    <Box
                        display="flex"
                        alignItems="center"
                        sx={{
                            maxWidth: '650px',
                            borderRight: `0.0625rem solid ${gray200}`,
                            borderBottom: 0
                        }}
                    >
                        <Typography variant="h6">{getTotalRowsCount()}</Typography>
                        <Typography variant="body2">total number of column headers</Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1}>
                        <Chip size="small" label={`${getMappedRowsCount()} mapped`} color="success" icon={<CircleChipSuccess />} />
                        <Chip size="small" label={`${getUnmappedRowsCount()} unmapped, ${getSuggestionsCount()} suggestions available`} color="default"
                            icon={<CircleChipDefault />} />
                    </Box>
                </Box>

                <Box display='flex' flexDirection='column' alignItems='center' gap={1.5}>
                    <Button variant='contained' onClick={() => setStep(STEPS.COLLECTION)} className="mapping__start-btn">Start mapping</Button>
                    <Button variant='text' onClick={() => setStep(-1)}>No, create an empty template with CDEs
                        instead </Button>
                </Box>
            </Box>
            {
                !isTourStartDialogVisible && <Tour
                    steps={tutorial[TourSteps.Home]}
                    stepIndex={homeStepIndex}
                    setStepIndex={setHomeStepIndex}
                />
            }
            {isTourOpen && <WalkthroughStartDialog
                isTourStartDialogVisible={isTourStartDialogVisible}
                setIsTourStartDialogVisible={setIsTourStartDialogVisible}
                setIsTourOpen={setIsTourOpen}
            />}
        </>
    );
}

export default Home;