import React from "react";
import { Box, Typography, Chip, Button } from "@mui/material";
import { useCdeContext } from "../../CdeContext";
// import PreviewTable from "./PreviewTable";
import { GlobeIcon, ArrowDropDown, BulletIcon } from "../../icons";
import { StyledTable } from "./StyledTable";



const PreviewBox = () => {
    const { step } = useCdeContext();
    const [togglePreview, setTogglePreview] = React.useState(false);

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
            <Box display='flex' gap={1.5} px={3} py={2} sx={{ cursor: 'pointer' }} alignItems='center' onClick={() => setTogglePreview(!togglePreview)}>
                <Typography sx={{
                    flex: 1,
                    color: '#676C74',
                    fontSize: '0.875rem',
                    display: 'flex',
                    alignItems: 'center',
                    fontWeight: 600,
                    lineHeight: '142.857%'
                }}>
                    <ArrowDropDown style={{ transform: togglePreview ? 'rotate(90deg)' : 'rotate(0deg)' }} color="#676C74" />
                    Preview
                </Typography>

                <Box display='flex' alignItems='center' gap={1}>
                    <Typography sx={{
                        color: '#4F5359',
                        fontSize: '0.875rem',
                        lineHeight: '142.857%'
                    }}>
                        124 total number of column headers
                    </Typography>

                    <Chip icon={<BulletIcon />} color="success" label="87 mapped" size="small" />
                    <Chip icon={<BulletIcon color="#676C74" />} label="37 unmapped" size="small" />
                </Box>
            </Box>

            {togglePreview && (
                <Box py={1.5} px={3} sx={{
                    borderTop: '0.0625rem solid #ECEDEE',
                    overflow: 'auto',
                    maxHeight: '21.25rem',

                    '&:after': {
                        content: '""',
                        height: '7.8125rem',
                        minWidth: '100%',
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, #FFF 83.85%)',
                    }
                }}>
                    <Box display='flex' mb={1} alignItems='center' sx={{
                        '& > div': {
                            flexShrink: 0,
                            padding: '0 0.5rem',
                            width: '10rem',
                            boxSizing: 'border-box'
                        }
                    }}>
                        <Box>
                            <Chip color="success" icon={<GlobeIcon color="#027A48" />} label="GUID" size="medium" />
                        </Box>
                        <Box>
                            <Chip color="success" icon={<GlobeIcon color="#027A48" />} label="SmallSpeciesStrainTyp" size="medium" />
                        </Box>
                        <Box>
                            <Chip color="success" icon={<GlobeIcon color="#027A48" />} label="SmallSpeciesStrainTyp" size="medium" />
                        </Box>
                        <Box>
                            <Typography sx={{
                                color: '#A9ACB2',
                                border: '0.0938rem dashed #E4E5E7',
                                borderRadius: '0.25rem',
                                fontSize: '0.875rem',
                                lineHeight: '142.857%',
                                padding: '0.375rem 0.5rem'
                            }}>No mapping yet</Typography>
                        </Box>
                        <Box>
                            <Typography sx={{
                                color: '#A9ACB2',
                                border: '0.0938rem dashed #E4E5E7',
                                borderRadius: '0.25rem',
                                lineHeight: '142.857%',
                                fontSize: '0.875rem',
                                padding: '0.375rem 0.5rem'
                            }}>No mapping yet</Typography>
                        </Box>
                        <Box>
                            <Typography sx={{
                                color: '#A9ACB2',
                                border: '0.0938rem dashed #E4E5E7',
                                borderRadius: '0.25rem',
                                fontSize: '0.875rem',
                                lineHeight: '142.857%',
                                padding: '0.375rem 0.5rem'
                            }}>No mapping yet</Typography>
                        </Box>
                        <Box>
                            <Typography sx={{
                                color: '#A9ACB2',
                                border: '0.0938rem dashed #E4E5E7',
                                borderRadius: '0.25rem',
                                fontSize: '0.875rem',
                                lineHeight: '142.857%',
                                padding: '0.375rem 0.5rem'
                            }}>No mapping yet</Typography>
                        </Box>
                        <Box>
                            <Typography sx={{
                                color: '#A9ACB2',
                                border: '0.0938rem dashed #E4E5E7',
                                borderRadius: '0.25rem',
                                fontSize: '0.875rem',
                                lineHeight: '142.857%',
                                padding: '0.375rem 0.5rem'
                            }}>No mapping yet</Typography>
                        </Box>
                        <Box>
                            <Typography sx={{
                                color: '#A9ACB2',
                                border: '0.0938rem dashed #E4E5E7',
                                borderRadius: '0.25rem',
                                fontSize: '0.875rem',
                                lineHeight: '142.857%',
                                padding: '0.375rem 0.5rem'
                            }}>No mapping yet</Typography>
                        </Box>
                        <Box>
                            <Typography sx={{
                                color: '#A9ACB2',
                                border: '0.0938rem dashed #E4E5E7',
                                borderRadius: '0.25rem',
                                fontSize: '0.875rem',
                                lineHeight: '142.857%',
                                padding: '0.375rem 0.5rem'
                            }}>No mapping yet</Typography>
                        </Box>
                    </Box>

                    {/* <PreviewTable /> */}
                    <StyledTable tableMaxWidth="1100px" tableCellMinWidth='10rem' /> 
                </Box>
            )}
            {
                step === -1 && <Box px={3} py={2} display="flex" justifyContent="end" gap={1} sx={{ borderTop: '1px solid #ECEDEE' }}>
                    <Button variant='text'>Cancel</Button>
                    <Button variant='contained'>Create template</Button>
                </Box>
            }
        </Box>
    )
}

export default PreviewBox;