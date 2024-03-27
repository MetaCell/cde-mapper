import React from "react";
import {Box, Typography, Chip, Button} from "@mui/material";
import {useDataContext} from "../../contexts/data/DataContext.ts";
import {ArrowDropDown, BulletIcon} from "../../icons";
import {StyledTable} from "./StyledTable";
import {useUIContext} from "../../contexts/ui/UIContext.ts";
import {useServicesContext} from "../../contexts/services/ServicesContext.ts";


const PreviewBox = () => {
    const {datasetSample} = useDataContext();
    const {step, setStep} = useUIContext();
    const {
        getTotalRowsCount,
        getUnmappedRowsCount,
        getMappedRowsCount,
    } = useServicesContext();
    const [togglePreview, setTogglePreview] = React.useState(false);
    const headers = datasetSample[0]

    return (
        <Box sx={{
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
            <Box display='flex' gap={1.5} px={3} py={2} sx={{cursor: 'pointer'}} alignItems='center'
                 onClick={() => setTogglePreview(!togglePreview)}>
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
                    overflowY: 'hidden'
                }}>
                    <StyledTable sample={datasetSample} tableCellMinWidth='10rem' headers={headers} />
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