import React from 'react';
import { Box, Typography, Breadcrumbs, Link, Button, Stack, Tooltip, IconButton } from '@mui/material';
import { ModalLayout } from "../layout/ModalLayout.tsx";
import { vars } from '../../theme/variables.ts';
import { AddIcon } from '../../icons/index.tsx';
import CustomEntitiesDropdown from '../common/CustomMappingDropdown.tsx';
import PreviewBox from '../common/PreviewBox.tsx';
import CdeDetails from '../common/CdeDetails.tsx';
import ModalHeightWrapper from '../common/ModalHeightWrapper.tsx';
import { CheckIcon, CrossIcon, GlobeIcon, InfoIcon, PairIcon } from "../../icons";
const { gray100, gray500, gray600 } = vars

function TemplateStep() {
    const [dropdowns, setDropdowns] = React.useState([1]);
    const [togglePairingSuggestions, setTogglePairingSuggestions] = React.useState(true);

    const addAnotherField = () => {
        setDropdowns(prevDropdowns => {
            return [...prevDropdowns, prevDropdowns.length + 1]
        })
    };
    const mockCDE = [
        {
            "id": "5304",
            // "group": 'Origins',
            "label": "GUID",
            "content": [
                {
                    "title": "Name",
                    "value": "GUID"
                },
                {
                    "title": "Variable Name",
                    "value": "Subject"
                },
                {
                    "title": "Title",
                    "value": "Unique identification of each mouse ID"
                }
            ]
        },
        {
            "id": "32845",
            // "group": 'Origins',
            "label": "SmallSpeciesStrainTyp",
            "content": [
                {
                    "title": "Name",
                    "value": "SmallSpeciesStrainTyp"
                },
                {
                    "title": "Variable Name",
                    "value": "Subject"
                },
                {
                    "title": "Title",
                    "value": "Unique identification of each mouse ID"
                }
            ]
        },
        {
            "id": "47428",
            // "group": 'Origins',
            "label": "StudySpeciesTyp",
            "content": [
                {
                    "title": "Name",
                    "value": "StudySpeciesTyp"
                },
                {
                    "title": "Variable Name",
                    "value": "Subject"
                },
                {
                    "title": "Title",
                    "value": "Unique identification of each mouse ID"
                }
            ]
        },
        {
            "id": "12822",
            // "group": 'Origins',
            "label": "Weight",
            "content": [
                {
                    "title": "Name",
                    "value": "Weight"
                },
                {
                    "title": "Variable Name",
                    "value": "Subject"
                },
                {
                    "title": "Title",
                    "value": "Unique identification of each mouse ID"
                }
            ]
        },
        {
            "id": "1798",
            // "group": 'Origins',
            "label": "AgeVal",
            "content": [
                {
                    "title": "Name",
                    "value": "AgeVal"
                },
                {
                    "title": "Variable Name",
                    "value": "Subject"
                },
                {
                    "title": "Title",
                    "value": "Unique identification of each mouse ID"
                }
            ]
        },
    ];

    return (
        <ModalLayout>
            <ModalHeightWrapper height="15rem">
                <Box p={1.5} display="flex" flexDirection="column" gap={6}>
                    <Stack>
                        <Typography variant='h6'>Create template</Typography>
                        <Typography sx={{ color: gray600, fontSize: '0.875rem', mt: "0.25rem" }}>Generate a template with CDEs or data dictionary fields before data collection for accurate mapping. Start by selecting CDEs to create template with.</Typography>
                    </Stack>

                    <Stack spacing={3}>
                        <Box mt={6} py={1.5} sx={{ borderBottom: `1px solid ${gray100}` }}>
                            <Breadcrumbs
                                aria-label="breadcrumb"
                                sx={{
                                    '& .MuiLink-root': {
                                        fontSize: '0.75rem',
                                        color: gray500,
                                        fontWeight: 500
                                    }
                                }}
                            >
                                <Link
                                    href="/material-ui/getting-started/installation/"
                                >
                                    CDE
                                </Link>
                                <Link
                                    href="/material-ui/react-breadcrumbs/"
                                    aria-current="page"
                                >
                                    Data Dictionary field
                                </Link>
                            </Breadcrumbs>
                        </Box>
                        {
                            dropdowns.map((dropdownIndex) => (
                                <Box key={dropdownIndex}>
                                    <CustomEntitiesDropdown
                                        options={{
                                            placeholder: "Choose CDE or Data Dictionary fields...",
                                            searchPlaceholder: "Search Spinal Cord Injury (SCI)",
                                            noResultReason: "We couldn’t find any record with this in the database.",
                                            onSearch: () => mockCDE,
                                            value: "",
                                        }}
                                    />
                                </Box>
                            ))
                        }
                        <Box width='100%' mt={1.5}>
                            <Box onClick={() => setTogglePairingSuggestions(!togglePairingSuggestions)} mb={togglePairingSuggestions ? 3 : 0} display='inline-flex' alignItems='center' gap={1} sx={{ cursor: 'pointer', userSelect: 'none' }}>
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
                            </Box>

                            {togglePairingSuggestions && (
                                <>
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
                                                    width: '1.125rem',
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
                                </>
                            )}

                        </Box>
                        <Button
                            variant='text'
                            startIcon={<AddIcon />}
                            sx={{ maxWidth: '10.875rem', '&:hover': { backgroundColor: 'transparent', color: gray500 } }}
                            onClick={addAnotherField}
                        >
                            Add another field
                        </Button>
                    </Stack>
                </Box>
            </ModalHeightWrapper>
            <PreviewBox />
        </ModalLayout>
    );
}

export default TemplateStep;