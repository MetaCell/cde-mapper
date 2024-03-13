import {Box, Typography, Chip, Button} from "@mui/material";
import {useDataContext} from "../../contexts/data/DataContext.ts";
// import PreviewTable from "./PreviewTable";
import {GlobeIcon, ArrowDropDown, BulletIcon} from "../../icons";
import {StyledTable} from "./StyledTable";
import {useUIContext} from "../../contexts/ui/UIContext.ts";
import {useServicesContext} from "../../contexts/services/ServicesContext.ts";

interface PreviewBoxProps {
    togglePreview: boolean;
    onToggle: () => void;
}

const PreviewBox = ({togglePreview, onToggle}: PreviewBoxProps) => {
    const {datasetSample} = useDataContext();
    const {step, setStep} = useUIContext();
    const {
        getTotalRowsCount,
        getUnmappedRowsCount,
        getMappedRowsCount,
        isColumnMapped
    } = useServicesContext();

    const headers = datasetSample[0]

    return (
        <Box className="preview__toggle" sx={{
            position: 'absolute',
            background: '#fff',
            zIndex: 9999999999,
            bottom: 0,
            left: 0,
            width: '100%',
            boxSizing: 'border-box',
            borderRadius: '0.75rem 0.75rem 0 0',
            border: '0.0625rem solid #ECEDEE',
        }}>
            <Box display='flex' gap={1.5} px={3} py={2} sx={{ cursor: 'pointer' }} alignItems='center' onClick={onToggle} className="preview__toggle_false">
                <Typography sx={{
                    flex: 1,
                    color: '#676C74',
                    fontSize: '0.875rem',
                    display: 'flex',
                    alignItems: 'center',
                    fontWeight: 600,
                    lineHeight: '142.857%'
                }}>
                    <ArrowDropDown style={{transform: togglePreview ? 'rotate(90deg)' : 'rotate(0deg)'}}
                                   color="#676C74"/>
                    Preview
                </Typography>

                <Box display='flex' alignItems='center' gap={1}>
                    <Typography sx={{
                        color: '#4F5359',
                        fontSize: '0.875rem',
                        lineHeight: '142.857%'
                    }}>
                        {getTotalRowsCount()} total number of column headers
                    </Typography>

                    <Chip icon={<BulletIcon/>} color="success" label={`${getMappedRowsCount()} mapped`} size="small"/>
                    <Chip icon={<BulletIcon color="#676C74"/>} label={`${getUnmappedRowsCount()} unmapped`} size="small"/>
                </Box>
            </Box>

            {togglePreview && (
                <Box py={1.5} px={3} sx={{
                    borderTop: '0.0625rem solid #ECEDEE',
                    overflow: 'auto',
                    maxHeight: '21.25rem',

                }}>
                    <Box display='flex' mb={1} alignItems='center' sx={{
                        '& > div': {
                            flexShrink: 0,
                            padding: '0 0.5rem',
                            width: '10rem',
                            boxSizing: 'border-box'
                        }
                    }}>
                        {headers.map((header, index) => (
                            <Box key={index}>
                                {isColumnMapped(header) ? (
                                    <Chip color="success" icon={<GlobeIcon color={"#027A48" } />} label={header} size="medium" />
                                ) : (
                                    <Typography sx={{
                                        color: '#A9ACB2',
                                        border: '0.0938rem dashed #E4E5E7',
                                        borderRadius: '0.25rem',
                                        fontSize: '0.875rem',
                                        lineHeight: '142.857%',
                                        padding: '0.375rem 0.5rem'
                                    }}>No mapping yet</Typography>
                                )}
                            </Box>
                        ))}
                    </Box>
                    <StyledTable sample={datasetSample} tableCellMinWidth='10rem' />
                </Box>
            )}
            {
                step === -1 &&
                <Box px={3} py={2} display="flex" justifyContent="end" gap={1} sx={{borderTop: '2px solid #ECEDEE'}}>
                    <Button variant='text' onClick={() => setStep(0)}>Cancel</Button>
                    <Button variant='contained'>Create template</Button>
                </Box>
            }
        </Box>
    )
}

export default PreviewBox;