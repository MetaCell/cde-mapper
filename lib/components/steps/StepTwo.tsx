import { Box, Button, Checkbox, Chip, Grid, IconButton, Link, Typography } from '@mui/material';
import { useCdeContext } from "../../CdeContext.tsx";
import React, { useState } from 'react';
import { ArrowDropDown, ArrowIcon, CheckboxDefault, CheckboxSelected, ChevronRight, GlobeIcon, LeftIcon, LinkIcon, RightIcon } from '../../icons/index.tsx';

function StepTwo() {
    const { mapping } = useCdeContext();

    const [showOtherSuggestions, setShowOtherSuggestions] = useState(false);

    console.log(mapping)

    return (
        <>
            <Box overflow='auto' maxHeight='calc(100vh - (3.9375rem + 3.5625rem + 4.4375rem + 2rem + 2rem))' p='1.5rem' pb={6}>
                <Box mb={3} borderBottom='0.0625rem solid #ECEDEE' py='0.6875rem' display='flex' alignItems='center' justifyContent='space-between'>
                    <Typography sx={{
                        color: '#676C74',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        lineHeight: '142.857%'
                    }}>
                        Column header from datasets
                    </Typography>
                    <Typography sx={{
                        color: '#676C74',
                        fontSize: '0.75rem',
                        fontWeight: 400,
                        lineHeight: '150%'
                    }}>
                        This is the column header you’re mapping.
                    </Typography>
                </Box>

                <Typography sx={{
                    padding: '0.5rem 0.75rem',
                    borderRadius: '0.5rem',
                    border: '0.0625rem solid #E4E5E7',
                    background: '#F4F5F5',
                    fontSize: '0.875rem',
                    color: '#676C74',
                    lineHeight: '142.857%',
                    fontWeight: 400,
                    marginBottom: '3rem'
                }}>
                    Strain
                </Typography>

                <Box mb={3} borderBottom='0.0625rem solid #ECEDEE' py='0.6875rem' display='flex' alignItems='center' justifyContent='space-between'>
                    <Typography sx={{
                        color: '#676C74',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        lineHeight: '142.857%'
                    }}>
                        CDE suggestions
                    </Typography>
                    <Typography sx={{
                        color: '#676C74',
                        fontSize: '0.75rem',
                        fontWeight: 400,
                        lineHeight: '150%'
                    }}>
                        Select only 1 suggestion to map ‘Strain’ with. Suggestions are ordered based on the quality of the suggestion.
                    </Typography>
                </Box>

                <Box display='flex' alignItems='start' flexDirection='column' gap='3rem'>
                    <Box gap='1.5rem' display='flex' alignItems='start'>
                        <Box height='2.625rem' display='flex' alignItems='center'>
                            <Checkbox sx={{ mt: '0rem' }} disableRipple icon={<CheckboxDefault />} checkedIcon={<CheckboxSelected />} />
                        </Box>
                        <Box flex={1}>
                            <Box gap='1.5rem' display='flex' alignItems='center' mb='0.75rem'>
                                <ArrowIcon />

                                <Box flex={1} sx={{
                                    padding: '0.625rem 0.875rem',
                                    borderRadius: '0.5rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    border: '0.0625rem solid #E4E5E7',
                                }}>
                                    <GlobeIcon />
                                    <Typography sx={{
                                        fontSize: '0.875rem',
                                        fontWeight: 500,
                                        lineHeight: '142.857%',
                                        color: '#070808'
                                    }}>
                                        SmallSpeciesStrainTyp
                                    </Typography>
                                    <Typography sx={{
                                        fontSize: '0.875rem',
                                        fontWeight: 400,
                                        lineHeight: '142.857%',
                                        color: '#676C74'
                                    }}>
                                        Strain of the mouse
                                    </Typography>
                                </Box>
                            </Box>
                            <Box sx={{
                                border: '0.0625rem solid #E4E5E7',
                                borderRadius: '0.5rem'
                            }}>
                                <Typography sx={{
                                    fontSize: '0.75rem',
                                    fontWeight: 500,
                                    lineHeight: '150%',
                                    color: '#373A3E',
                                    padding: '0.625rem 0.875rem',
                                    borderBottom: '0.0625rem solid #E4E5E7',
                                }}>CDE Details</Typography>

                                <Box p="0.875rem">
                                    <Grid container spacing='1.5rem'>
                                        {[
                                            {
                                                heading: 'CDE Abbrev',
                                                text: 'SmallSpeciesStrainTyp'
                                            },
                                            {
                                                heading: 'VariableName',
                                                text: 'Strain'
                                            },
                                            {
                                                heading: 'Title',
                                                text: 'Strain of the mouse'
                                            },
                                            {
                                                heading: 'Description',
                                                text: 'Strain of the mouse'
                                            },
                                            {
                                                heading: 'Unit of measure',
                                                text: '-'
                                            },
                                            {
                                                heading: 'Data type',
                                                text: 'Alphanumeric'
                                            },
                                            {
                                                heading: 'Comments',
                                                text: '-'
                                            },
                                            {
                                                heading: 'InterLex ID',
                                                text: 'CDE:0369382',
                                                link: true
                                            }
                                        ].map((item: any) => (
                                            <Grid item md={3}>
                                                <Typography sx={{
                                                    color: '#676C74',
                                                    fontWeight: 400,
                                                    lineHeight: '150%',
                                                    marginBottom: '0.25rem',
                                                    fontSize: '0.75rem',
                                                }}>
                                                    {item.heading}
                                                </Typography>
                                                <Typography sx={{
                                                    color: '#070808',
                                                    fontWeight: 400,
                                                    lineHeight: '142.857%',
                                                    fontSize: '0.875rem',
                                                    '& a': {
                                                        color: '#2155BA',
                                                        fontWeight: 500,
                                                        cursor: 'pointer',
                                                        textDecoration: 'none',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '0.25rem'
                                                    }
                                                }}>
                                                    {item?.link ? <Link>{item.text}<LinkIcon /></Link> : item.text}
                                                </Typography>

                                            </Grid>
                                        ))}
                                    </Grid>
                                </Box>
                            </Box>
                        </Box>
                    </Box>

                    <Box gap='1.5rem' display='flex' alignItems='start'>
                        <Box height='2.625rem' display='flex' alignItems='center'>
                            <Checkbox sx={{ mt: '0rem' }} disableRipple icon={<CheckboxDefault />} checkedIcon={<CheckboxSelected />} />
                        </Box>
                        <Box flex={1}>
                            <Box gap='1.5rem' display='flex' alignItems='center' mb='0.75rem'>
                                <ArrowIcon />

                                <Box flex={1} sx={{
                                    padding: '0.625rem 0.875rem',
                                    borderRadius: '0.5rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    border: '0.0625rem solid #E4E5E7',
                                }}>
                                    <GlobeIcon />
                                    <Typography sx={{
                                        fontSize: '0.875rem',
                                        fontWeight: 500,
                                        lineHeight: '142.857%',
                                        color: '#070808'
                                    }}>
                                        SmallSpeciesStrainTyp
                                    </Typography>
                                    <Typography sx={{
                                        fontSize: '0.875rem',
                                        fontWeight: 400,
                                        lineHeight: '142.857%',
                                        color: '#676C74'
                                    }}>
                                        Strain of the mouse
                                    </Typography>
                                </Box>
                            </Box>
                            <Box sx={{
                                border: '0.0625rem solid #E4E5E7',
                                borderRadius: '0.5rem'
                            }}>
                                <Typography sx={{
                                    fontSize: '0.75rem',
                                    fontWeight: 500,
                                    lineHeight: '150%',
                                    color: '#373A3E',
                                    padding: '0.625rem 0.875rem',
                                    borderBottom: '0.0625rem solid #E4E5E7',
                                }}>CDE Details</Typography>

                                <Box p="0.875rem">
                                    <Grid container spacing='1.5rem'>
                                        {[
                                            {
                                                heading: 'CDE Abbrev',
                                                text: 'SmallSpeciesStrainTyp'
                                            },
                                            {
                                                heading: 'VariableName',
                                                text: 'Strain'
                                            },
                                            {
                                                heading: 'Title',
                                                text: 'Strain of the mouse'
                                            },
                                            {
                                                heading: 'Description',
                                                text: 'Strain of the mouse'
                                            },
                                            {
                                                heading: 'Unit of measure',
                                                text: '-'
                                            },
                                            {
                                                heading: 'Data type',
                                                text: 'Alphanumeric'
                                            },
                                            {
                                                heading: 'Comments',
                                                text: '-'
                                            },
                                            {
                                                heading: 'InterLex ID',
                                                text: 'CDE:0369382'
                                            }
                                        ].map((item: any) => (
                                            <Grid item md={3}>
                                                <Typography sx={{
                                                    color: '#676C74',
                                                    fontWeight: 400,
                                                    lineHeight: '150%',
                                                    marginBottom: '0.25rem',
                                                    fontSize: '0.75rem',
                                                }}>
                                                    {item.heading}
                                                </Typography>
                                                <Typography sx={{
                                                    color: '#070808',
                                                    fontWeight: 400,
                                                    lineHeight: '142.857%',
                                                    fontSize: '0.875rem',
                                                }}>
                                                    {item.text}
                                                </Typography>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Box>
                            </Box>
                        </Box>
                    </Box>

                    <Button variant='text' onClick={() =>  setShowOtherSuggestions(!showOtherSuggestions)} disableRipple sx={{
                        p: 0, gap: '0.25rem', color: '#19418F',

                        '& svg': {
                            transform: showOtherSuggestions ? 'rotate(90deg)' : 'rotate(0deg)'
                        }
                    }}>
                        <ArrowDropDown />
                        4 other suggestions available for this column. Expand all suggestions.
                    </Button>
                </Box>


                {showOtherSuggestions && (
                    <Box display='flex' alignItems='start' flexDirection='column' mt='3rem' gap='3rem'>
                        <Box gap='1.5rem' display='flex' alignItems='start'>
                            <Box height='2.625rem' display='flex' alignItems='center'>
                                <Checkbox sx={{ mt: '0rem' }} disableRipple icon={<CheckboxDefault />} checkedIcon={<CheckboxSelected />} />
                            </Box>
                            <Box flex={1}>
                                <Box gap='1.5rem' display='flex' alignItems='center' mb='0.75rem'>
                                    <ArrowIcon />

                                    <Box flex={1} sx={{
                                        padding: '0.625rem 0.875rem',
                                        borderRadius: '0.5rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        border: '0.0625rem solid #E4E5E7',
                                    }}>
                                        <GlobeIcon />
                                        <Typography sx={{
                                            fontSize: '0.875rem',
                                            fontWeight: 500,
                                            lineHeight: '142.857%',
                                            color: '#070808'
                                        }}>
                                            SmallSpeciesStrainTyp
                                        </Typography>
                                        <Typography sx={{
                                            fontSize: '0.875rem',
                                            fontWeight: 400,
                                            lineHeight: '142.857%',
                                            color: '#676C74'
                                        }}>
                                            Strain of the mouse
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box sx={{
                                    border: '0.0625rem solid #E4E5E7',
                                    borderRadius: '0.5rem'
                                }}>
                                    <Typography sx={{
                                        fontSize: '0.75rem',
                                        fontWeight: 500,
                                        lineHeight: '150%',
                                        color: '#373A3E',
                                        padding: '0.625rem 0.875rem',
                                        borderBottom: '0.0625rem solid #E4E5E7',
                                    }}>CDE Details</Typography>

                                    <Box p="0.875rem">
                                        <Grid container spacing='1.5rem'>
                                            {[
                                                {
                                                    heading: 'CDE Abbrev',
                                                    text: 'SmallSpeciesStrainTyp'
                                                },
                                                {
                                                    heading: 'VariableName',
                                                    text: 'Strain'
                                                },
                                                {
                                                    heading: 'Title',
                                                    text: 'Strain of the mouse'
                                                },
                                                {
                                                    heading: 'Description',
                                                    text: 'Strain of the mouse'
                                                },
                                                {
                                                    heading: 'Unit of measure',
                                                    text: '-'
                                                },
                                                {
                                                    heading: 'Data type',
                                                    text: 'Alphanumeric'
                                                },
                                                {
                                                    heading: 'Comments',
                                                    text: '-'
                                                },
                                                {
                                                    heading: 'InterLex ID',
                                                    text: 'CDE:0369382',
                                                    link: true
                                                }
                                            ].map((item: any) => (
                                                <Grid item md={3}>
                                                    <Typography sx={{
                                                        color: '#676C74',
                                                        fontWeight: 400,
                                                        lineHeight: '150%',
                                                        marginBottom: '0.25rem',
                                                        fontSize: '0.75rem',
                                                    }}>
                                                        {item.heading}
                                                    </Typography>
                                                    <Typography sx={{
                                                        color: '#070808',
                                                        fontWeight: 400,
                                                        lineHeight: '142.857%',
                                                        fontSize: '0.875rem',
                                                        '& a': {
                                                            color: '#2155BA',
                                                            fontWeight: 500,
                                                            cursor: 'pointer',
                                                            textDecoration: 'none',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '0.25rem'
                                                        }
                                                    }}>
                                                        {item?.link ? <Link>{item.text}<LinkIcon /></Link> : item.text}
                                                    </Typography>

                                                </Grid>
                                            ))}
                                        </Grid>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>

                        <Box gap='1.5rem' display='flex' alignItems='start'>
                            <Box height='2.625rem' display='flex' alignItems='center'>
                                <Checkbox sx={{ mt: '0rem' }} disableRipple icon={<CheckboxDefault />} checkedIcon={<CheckboxSelected />} />
                            </Box>
                            <Box flex={1}>
                                <Box gap='1.5rem' display='flex' alignItems='center' mb='0.75rem'>
                                    <ArrowIcon />

                                    <Box flex={1} sx={{
                                        padding: '0.625rem 0.875rem',
                                        borderRadius: '0.5rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        border: '0.0625rem solid #E4E5E7',
                                    }}>
                                        <GlobeIcon />
                                        <Typography sx={{
                                            fontSize: '0.875rem',
                                            fontWeight: 500,
                                            lineHeight: '142.857%',
                                            color: '#070808'
                                        }}>
                                            SmallSpeciesStrainTyp
                                        </Typography>
                                        <Typography sx={{
                                            fontSize: '0.875rem',
                                            fontWeight: 400,
                                            lineHeight: '142.857%',
                                            color: '#676C74'
                                        }}>
                                            Strain of the mouse
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box sx={{
                                    border: '0.0625rem solid #E4E5E7',
                                    borderRadius: '0.5rem'
                                }}>
                                    <Typography sx={{
                                        fontSize: '0.75rem',
                                        fontWeight: 500,
                                        lineHeight: '150%',
                                        color: '#373A3E',
                                        padding: '0.625rem 0.875rem',
                                        borderBottom: '0.0625rem solid #E4E5E7',
                                    }}>CDE Details</Typography>

                                    <Box p="0.875rem">
                                        <Grid container spacing='1.5rem'>
                                            {[
                                                {
                                                    heading: 'CDE Abbrev',
                                                    text: 'SmallSpeciesStrainTyp'
                                                },
                                                {
                                                    heading: 'VariableName',
                                                    text: 'Strain'
                                                },
                                                {
                                                    heading: 'Title',
                                                    text: 'Strain of the mouse'
                                                },
                                                {
                                                    heading: 'Description',
                                                    text: 'Strain of the mouse'
                                                },
                                                {
                                                    heading: 'Unit of measure',
                                                    text: '-'
                                                },
                                                {
                                                    heading: 'Data type',
                                                    text: 'Alphanumeric'
                                                },
                                                {
                                                    heading: 'Comments',
                                                    text: '-'
                                                },
                                                {
                                                    heading: 'InterLex ID',
                                                    text: 'CDE:0369382'
                                                }
                                            ].map((item: any) => (
                                                <Grid item md={3}>
                                                    <Typography sx={{
                                                        color: '#676C74',
                                                        fontWeight: 400,
                                                        lineHeight: '150%',
                                                        marginBottom: '0.25rem',
                                                        fontSize: '0.75rem',
                                                    }}>
                                                        {item.heading}
                                                    </Typography>
                                                    <Typography sx={{
                                                        color: '#070808',
                                                        fontWeight: 400,
                                                        lineHeight: '142.857%',
                                                        fontSize: '0.875rem',
                                                    }}>
                                                        {item.text}
                                                    </Typography>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                )}
            </Box>

            <Box width='calc(100% - 3rem)' mx='auto' justifyContent='space-between' display='flex' alignItems='center' sx={{ background: '#fff', zIndex: 9 }} py='1rem' borderTop='0.0625rem solid #ECEDEE'>
                <Box gap='0.75rem' display='flex' alignItems='center'>
                    <Box gap='0.25rem' display='flex' alignItems='center'>
                        <IconButton disabled sx={{
                            borderRadius: '0.5rem',
                            padding: '0.5rem',
                            border: '0.0625rem solid #E4E5E7',
                            boxShadow: '0rem 0.0625rem 0.125rem 0rem rgba(7, 8, 8, 0.05)'
                        }}>
                            <LeftIcon color="#D6D8DB" />
                        </IconButton>
                        <IconButton sx={{
                            borderRadius: '0.5rem',
                            padding: '0.5rem',
                            border: '0.0625rem solid #D6D8DB',
                            boxShadow: '0rem 0.0625rem 0.125rem 0rem rgba(7, 8, 8, 0.05)'
                        }}>
                            <RightIcon />
                        </IconButton>
                    </Box>
                    <Chip label='Displaying 1/3 suggestions' color='primary' />
                </Box>

                <Box gap='0.5rem' display='flex' alignItems='center'>
                    <Button variant='outlined'>Ignore suggestions</Button>
                    <Button variant='contained'>Accept selected mapping</Button>
                </Box>
            </Box>
        </>
    );
}

export default StepTwo;
