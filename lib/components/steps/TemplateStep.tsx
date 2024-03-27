import React, { Fragment } from 'react';
import { Box, Typography, Button, Stack, Tooltip, IconButton, Divider, 
    Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { vars } from '../../theme/variables.ts';
import { PlusIcon } from '../../icons/index.tsx';
// import CustomEntitiesDropdown from '../common/CustomMappingDropdown.tsx';
import PreviewBox from '../common/PreviewBox.tsx';
import CdeDetails from '../common/CdeDetails.tsx';
import ModalHeightWrapper from '../common/ModalHeightWrapper.tsx';
import { CheckIcon, CrossIcon, GlobeIcon, InfoIcon, PairIcon } from "../../icons";
const { gray100, gray500, gray600 } = vars

function TemplateStep() {
    const [dropdowns, setDropdowns] = React.useState([1]);

    const addAnotherField = () => {
        setDropdowns(prevDropdowns => {
            return [...prevDropdowns, prevDropdowns.length + 1]
        })
    };

    return (
        <Box>
            <ModalHeightWrapper height="15rem">
                <Box p={1.5} display="flex" flexDirection="column" gap={6}>
                    <Stack>
                        <Typography variant='h6'>Create template</Typography>
                        <Typography sx={{ color: gray600, fontSize: '0.875rem', mt: "0.25rem" }}>Generate a template with CDEs or data dictionary fields before data collection for accurate mapping. Start by selecting CDEs to create template with.</Typography>
                    </Stack>

                    <Stack spacing={3}>
                        <Box mt={6} py={1.5} sx={{ borderBottom: `1px solid ${gray100}` }}>
                            <Typography variant='caption' sx={{ color: gray500 }}>CDE / Data Dictionary field</Typography>
                        </Box>
                        {
                            dropdowns.map((dropdownIndex) => (
                                <Fragment key={dropdownIndex}>
                                    {/*<CustomEntitiesDropdown*/}
                                    {/*    placeholder="Choose CDE or Data Dictionary fields..."*/}
                                    {/*    options={{*/}
                                    {/*        searchPlaceholder: "Search Spinal Cord Injury (SCI)",*/}
                                    {/*        noResultReason: "We couldn’t find any record with this in the database.",*/}
                                    {/*        onSearch: async () => [],*/}
                                    {/*        onSelection: async () => [],*/}
                                    {/*        collections: [],*/}
                                    {/*        onCollectionSelect: () => [],*/}
                                    {/*        value: null,*/}
                                    {/*    }}*/}
                                    {/*/>*/}
                                    <Box width='100%' mt={1.5}>
                                        <Accordion>
                                            <AccordionSummary>
                                                <PairIcon />
                                                <Typography sx={{ fontSize: '0.75rem', color: '#4F5359', fontWeight: 500, lineHeight: '150%' }}>Pairing suggestions</Typography>
                                                <Tooltip
                                                    title={
                                                        <>
                                                            <Typography sx={{
                                                                fontSize: '0.75rem',
                                                                fontWeight: 600,
                                                                lineHeight: '142.857%',
                                                                marginBottom: '0.25rem',
                                                                color: '#fff',
                                                            }}>This is a Tooltip</Typography>
                                                            <Typography sx={{
                                                                fontSize: '0.75rem',
                                                                fontWeight: 400,
                                                                lineHeight: '142.857%',
                                                                color: '#fff',
                                                            }}>
                                                                Tooltips are used to describe or identify an element. In most scenarious, tooltips help the user understand meaning, function or alt-text.
                                                            </Typography>
                                                        </>
                                                    }
                                                >
                                                    <Box ml='0.25rem' display='flex' alignItems='center'><InfoIcon /></Box>
                                                </Tooltip>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Box pl='2.5625rem'>
                                                    <Box sx={{
                                                        position: 'relative',
                                                        '&:before': {
                                                            content: '""',
                                                            position: 'absolute',
                                                            left: '-1.375rem',
                                                            height: '2.25rem',
                                                            top: '-1.1rem',
                                                            width: '0.125rem',
                                                            background: '#ECEDEE',
                                                            borderRadius: '3.125rem',
                                                        }
                                                    }}>
                                                        <Box sx={{
                                                            position: 'relative',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            columnGap: '1.5rem',

                                                            '& > div': {
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                            },

                                                            '&:before': {
                                                                content: '""',
                                                                position: 'absolute',
                                                                left: '-1.375rem',
                                                                top: '50%',
                                                                transform: 'translateY(-50%)',
                                                                width: '0.75rem',
                                                                height: '0.125rem',
                                                                background: '#ECEDEE',
                                                                borderTopRightRadius: '3.125rem',
                                                                borderBottomRightRadius: '3.125rem',
                                                            }
                                                        }} mb={1.5}>
                                                            <Box display='flex' gap={1.5} flex={1}>
                                                                <Box flex={1} sx={{
                                                                    padding: '0.4375rem 0.875rem',
                                                                    borderRadius: '0.5rem',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    gap: '0.5rem',
                                                                    background: '#F4F5F5',
                                                                    border: '0.0625rem solid #E4E5E7',
                                                                }}>
                                                                    <GlobeIcon />
                                                                    <Typography sx={{
                                                                        fontSize: '0.875rem',
                                                                        fontWeight: 500,
                                                                        lineHeight: '142.857%',
                                                                        color: '#070808'
                                                                    }}>
                                                                        Subject_name
                                                                    </Typography>
                                                                    <Typography sx={{
                                                                        fontSize: '0.875rem',
                                                                        fontWeight: 400,
                                                                        lineHeight: '142.857%',
                                                                        color: '#676C74'
                                                                    }}>
                                                                        Name of each subject in the dataset
                                                                    </Typography>
                                                                </Box>

                                                                <Box display='flex' gap={0.5}>
                                                                    <IconButton sx={{
                                                                        borderRadius: '0.5rem',
                                                                        padding: '0.4375rem',
                                                                    }}>
                                                                        <CrossIcon />
                                                                    </IconButton>
                                                                    <IconButton sx={{
                                                                        borderRadius: '0.5rem',
                                                                        padding: '0.4375rem',
                                                                        border: '0.0625rem solid #D6D8DB',
                                                                        boxShadow: '0rem 0.0625rem 0.125rem 0rem rgba(7, 8, 8, 0.05)'
                                                                    }}>
                                                                        <CheckIcon />
                                                                    </IconButton>
                                                                </Box>
                                                            </Box>
                                                        </Box>
                                                        <CdeDetails />
                                                    </Box>
                                                </Box>
                                            </AccordionDetails>
                                        </Accordion>
                                        <Divider sx={{ color: gray100, marginTop: '1.5rem' }}/>
                                    </Box>
                                </Fragment>
                            ))
                        }

                        <Button
                            variant='text'
                            startIcon={<PlusIcon />}
                            sx={{ maxWidth: '10.875rem', '&:hover': { backgroundColor: 'transparent', color: gray500 } }}
                            onClick={addAnotherField}
                        >
                            Add another field
                        </Button>
                    </Stack>
                </Box>
            </ModalHeightWrapper>
            <PreviewBox />
        </Box>
    );
}

export default TemplateStep;