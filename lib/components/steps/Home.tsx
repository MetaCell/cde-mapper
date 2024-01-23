import {Box, Button, Typography, Chip} from '@mui/material';
import {useCdeContext} from "../../CdeContext.tsx";
import {STEPS} from "../../models.ts";
import {StyledTable} from '../common/StyledTable.tsx';
import {CircleChipDefault, CircleChipSuccess} from '../../icons/index.tsx';
import {vars} from '../../theme/variables.ts';

const {primary600, gray600} = vars;

function Home() {
    const {
        name,
        setStep,
        datasetSample,
    } = useCdeContext();


    return (
        <Box display='flex' alignItems='center' flexDirection='column' px={3} py={6} sx={{
            background: '#FCFCFD'
        }}>
            <Typography sx={{marginBottom: '0.5rem'}} variant='h3'>
                Create mapping(s) with selected dataset?
            </Typography>
            <Typography variant='body2' sx={{
                maxWidth: '31.25rem',
                textAlign: 'center',
            }}>
                {`You’ve selected column headers from the ${name}’s dataset on ODC’s website to map.`}
            </Typography>
            <Box my={6}>
                <Box display="flex" alignItems="center" justifyContent="space-between" mb={4} width={1}>
                    <Box
                        display="flex"
                        alignItems="center"
                        sx={{
                            borderLeft: `2px solid ${primary600}`,
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
                        <Chip size="small" label="41 mapped" color="success" icon={<CircleChipSuccess/>}/>
                        <Chip size="small" label="83 unmapped, 13 suggestions available" color="default"
                              icon={<CircleChipDefault/>}/>
                    </Box>
                </Box>
                <StyledTable sample={datasetSample}/>
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