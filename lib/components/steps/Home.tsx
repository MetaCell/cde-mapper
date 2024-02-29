import React from 'react';
import { Box, Button, Typography, Chip, TableContainer, Paper } from '@mui/material';
import { StyledTable } from '../common/StyledTable.tsx';
import { CircleChipDefault, CircleChipSuccess } from '../../icons/index.tsx';
import { vars } from '../../theme/variables.ts';
import { STEPS } from "../../models.ts";
import { useCdeContext } from "../../CdeContext.ts";
import { isRowMapped } from '../../helpers/getters.ts';

const { primary600, gray600, drodownDetailBg, gray200 } = vars;

function Home() {
    const {
        setStep,
        datasetSample,
        name,
        datasetMapping,
        headerIndexes,
        getSuggestions
    } = useCdeContext();
    
    const [numberOfMapped, setNumberOfMapped] = React.useState(0);
    const suggestionsMapping = getSuggestions();

    const sumOfMappedAndUnmapped = Object.keys(datasetMapping).length;
    const numberOfUnmapped = sumOfMappedAndUnmapped - numberOfMapped;
    const numberOfSuggestions = Object.keys(suggestionsMapping).length;

    React.useEffect(() => {
        Object.keys(datasetMapping).map((variableName) => {
            if (isRowMapped(datasetMapping[variableName], headerIndexes)) {
                setNumberOfMapped(prevNumberOfMapped => prevNumberOfMapped + 1);
            }
        })
    }, []);

    return (
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
                You’ve selected column headers from the {name}’s dataset on ODC’s website to map.
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
                        <Typography variant="h6">{sumOfMappedAndUnmapped}</Typography>
                        <Typography variant="body2">total number of column headers</Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1}>
                        <Chip size="small" label={`${numberOfMapped} mapped`} color="success" icon={<CircleChipSuccess />} />
                        <Chip size="small" label={`${numberOfUnmapped} unmapped, ${numberOfSuggestions} suggestions available`} color="default"
                            icon={<CircleChipDefault />} />
                    </Box>
                </Box>
                <TableContainer
                    component={Paper}
                    elevation={0}
                    sx={{
                        maxWidth: '650px',
                        borderRight: `0.0625rem solid ${gray200}`,
                        borderBottom: 0
                    }}
                >
                    <StyledTable sample={datasetSample} tableCellMinWidth='7.5rem'/>
                </TableContainer>
            </Box>

            <Box display='flex' flexDirection='column' alignItems='center' gap={1.5}>
                <Button variant='contained' onClick={() => setStep(STEPS.COLLECTION)}>Start mapping</Button>
                <Button variant='text' onClick={() => setStep(-1)}>No, create an empty template with CDEs
                    instead </Button>
            </Box>
        </Box>
    );
}

export default Home;