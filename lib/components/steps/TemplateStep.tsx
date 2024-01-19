import React from 'react';
import { Box, Typography, Breadcrumbs, Link, Button, Stack } from '@mui/material';
import { ModalLayout } from "../layout/ModalLayout.tsx";
import { vars } from '../../theme/variables.ts';
import { AddIcon } from '../../icons/index.tsx';
import CustomEntitiesDropdown from '../common/CustomMappingDropdown.tsx';
import PreviewBox from '../common/PreviewBox.tsx';
const { gray100, gray500, gray600 } = vars

function TemplateStep() {
    const [dropdowns, setDropdowns] = React.useState([1]);

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
            <Box display="flex" flexDirection="column" justifyContent="space-between" height={"100vh"}>
                <Box display='flex' flexDirection='column' p={3}>
                    <Box p={1.5} display="flex" flexDirection="column" gap={6}>
                        <Stack>
                            <Typography variant='h6'>Create template</Typography>
                            <Typography sx={{ color: gray600, fontSize: '0.875rem' }}>Generate a template with CDEs or data dictionary fields before data collection for accurate mapping. Start by selecting CDEs to create template with.</Typography>
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
                </Box>
                <PreviewBox />
            </Box>
        </ModalLayout>
    );
}

export default TemplateStep;