import React from 'react';
import { Box, Button, Typography, Chip, TableContainer, Paper } from '@mui/material';
import { StyledTable } from '../common/StyledTable.tsx';
import { CircleChipDefault, CircleChipSuccess } from '../../icons/index.tsx';
import { vars } from '../../theme/variables.ts';
import { STEPS } from "../../models.ts";
import { useCdeContext } from "../../CdeContext.ts";
import Tour from '../common/Tour.tsx';
import WalkthroughStartDialog from '../common/WalkthroughStartDialog.tsx';
import { tutorial, TourSteps } from '../common/tutorial.tsx';

const { primary600, gray600, drodownDetailBg, gray200 } = vars;

function Home(props: { homeStepIndex: number, setHomeStepIndex: React.Dispatch<React.SetStateAction<number>> }) {
    
    const [isTourStartDialogVisible, setIsTourStartDialogVisible] = React.useState(true);
    const { setStep, datasetSample, isTourOpen, setIsTourOpen } = useCdeContext();
    const { homeStepIndex, setHomeStepIndex } = props;
    
    return (
        <>
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
                    <Box display="flex" alignItems="center" justifyContent="space-between" mb={4} width={1} className="stats-content">
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
                            <Chip size="small" label="83 unmapped, 13 suggestions available" color="default"
                                icon={<CircleChipDefault />} />
                        </Box>
                    </Box>
                    <TableContainer
                        component={Paper}
                        elevation={0}
                        className='dataset-table'
                        sx={{
                            maxWidth: '650px',
                            borderRight: `0.0625rem solid ${gray200}`,
                            borderBottom: 0
                        }}
                    >
                        <StyledTable sample={datasetSample} tableCellMinWidth='7.5rem' />
                    </TableContainer>
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