import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Chip, FormControl, IconButton, InputAdornment, MenuItem, Select, SelectChangeEvent, TextField, Tooltip, Typography } from "@mui/material"
import ModalHeightWrapper from "../common/ModalHeightWrapper"
import { ArrowIcon, BulletIcon, CheckIcon, CrossIcon, FilterIcon, GlobeIcon, InfoIcon, PairIcon, SearchIcon, SortIcon } from "../../icons";
import React, { useState } from "react";
import CustomEntitiesDropdown from "../common/CustomMappingDropdown";
import CdeDetails from "../common/CdeDetails";
import Filters from "../common/Filters";
import PreviewBox from "../common/PreviewBox";

const styles = {
  root: {
    boxSizing: 'border-box',
  },
  head: {
    display: 'flex',
    boxSizing: 'border-box',
    columnGap: '1.5rem',
    padding: '0.75rem 0',
    borderBottom: '0.0625rem solid #ECEDEE',
  },
  wrap: {},
  row: {
    display: 'flex',
    boxSizing: 'border-box',
    columnGap: '1.5rem',
    flexWrap: 'wrap',
    padding: '1.5rem 0',
    borderBottom: '0.0625rem solid #ECEDEE',
  },
  col: {
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
    gap: '0.75rem',
    boxSizing: 'border-box',

    '&:first-of-type': {
      width: '11.25rem',
      boxSizing: 'border-box',
    },

    '&:nth-child(2)': {
      width: '18.75rem',
      boxSizing: 'border-box',
    },

    '&:nth-child(3)': {
      width: '1rem',
      boxSizing: 'border-box',
    },

    '&:nth-child(4)': {
      width: 'calc(100% - (11.25rem + 18.75rem + 1rem + 1.5rem + 1.5rem + 1.5rem))',
      boxSizing: 'border-box',
    },

    '& p': {
      fontSize: '0.75rem',
      fontWeight: 500,
      lineHeight: '150%',
      color: '#676C74',
    },

    '& svg': {
      cursor: 'pointer',
    }
  }
}

const StepThree = () => {
  const [age, setAge] = React.useState('0');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const filterToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'filter-popover' : undefined;

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

  const searchCDE = () => mockCDE;

  return (
    <>
      <ModalHeightWrapper pb={10} height='15rem'>
        <Box alignItems='center' display='flex' gap={1.5} mb={3}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search column headers or mapped CDEs..."
            InputProps={{
              startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>
            }}
          />
          <Button
            variant="outlined"
            aria-describedby={id}
            onClick={filterToggle}
          >
            <FilterIcon />
            Filter
          </Button>

          <Filters anchorEl={anchorEl} handleClose={handleClose} open={open} id={id} />
        </Box>

        <Box px={1.5}>
          <Box sx={styles.root}>
            <Box sx={styles.head}>
              <Box sx={styles.col}>
                <SortIcon />
              </Box>
              <Box sx={styles.col}>
                <Typography>Column headers from dataset</Typography>
                <SortIcon />
              </Box>
              <Box sx={styles.col} />
              <Box sx={styles.col}>
                <Typography>CDEs/ Data Dictionary fields</Typography>
                <SortIcon />
              </Box>
            </Box>
            <Box sx={styles.wrap}>
              <Box sx={styles.row}>
                <Box sx={styles.col}>
                  <Chip
                    label={'Unmapped'}
                    size="small"
                    icon={<BulletIcon color={'#676C74'} />}
                  />
                </Box>
                <Box sx={styles.col}>
                  <TextField
                    disabled
                    fullWidth
                    value={'MotorForceApplied'}
                  />
                </Box>
                <Box sx={styles.col}>
                  <ArrowIcon />
                </Box>
                <Box sx={styles.col}>
                  <CustomEntitiesDropdown options= {{
                    placeholder: "Choose CDE or Data Dictionary fields...",
                    searchPlaceholder: "Search Spinal Cord Injury (SCI)",
                    noResultReason: "We couldn’t find any record with this in the database.",
                    onSearch: () => searchCDE(),
                    value: mockCDE[1] ?? "",
                  }}/>
                </Box>  
              </Box>

              <Box sx={styles.row}>
                <Box sx={styles.col}>
                  <Chip
                    label={'Unmapped'}
                    size="small"
                    icon={<BulletIcon color={'#676C74'} />}
                  />
                </Box>
                <Box sx={styles.col}>
                  <TextField
                    disabled
                    fullWidth
                    value={'Age'}
                  />
                </Box>
                <Box sx={styles.col}>
                  <ArrowIcon />
                </Box>
                <Box sx={styles.col}>
                  <CustomEntitiesDropdown options= {{
                    placeholder: "Choose CDE or Data Dictionary fields...",
                    searchPlaceholder: "Search Spinal Cord Injury (SCI)",
                    noResultReason: "We couldn’t find any record with this in the database.",
                    onSearch: () => searchCDE(),
                    value: mockCDE[2] ?? "",
                  }}/>
                </Box>  
              </Box>

              <Box sx={styles.row}>
                <Box sx={styles.col}>
                  <Chip
                    label={'Unmapped'}
                    size="small"
                    icon={<BulletIcon color={'#676C74'} />}
                  />
                </Box>
                <Box sx={styles.col}>
                  <TextField
                    disabled
                    fullWidth
                    value={'Group'}
                  />
                </Box>
                <Box sx={styles.col}>
                  <ArrowIcon />
                </Box>
                <Box sx={styles.col}>
                  <CustomEntitiesDropdown options= {{
                    placeholder: "Choose CDE or Data Dictionary fields...",
                    searchPlaceholder: "Search Spinal Cord Injury (SCI)",
                    noResultReason: "We couldn’t find any record with this in the database.",
                    onSearch: () => searchCDE(),
                    value: mockCDE[3] ?? "",
                  }}/>
                </Box>  
              </Box>

              <Box sx={styles.row}>
                <Box sx={styles.col}>
                  <Chip
                    label="Mapped to CDE"
                    color="success"
                    size="small"
                    icon={<BulletIcon color="#12B76A" />}
                  />
                </Box>
                <Box sx={styles.col}>
                  <TextField
                    disabled
                    fullWidth
                    value='MotorForceApplied'
                  />
                </Box>
                <Box sx={styles.col}>
                  <ArrowIcon />
                </Box>
                <Box sx={styles.col}>
                  <CustomEntitiesDropdown options= {{
                    placeholder: "Choose CDE or Data Dictionary fields...",
                    searchPlaceholder: "Search Spinal Cord Injury (SCI)",
                    noResultReason: "We couldn’t find any record with this in the database.",
                    onSearch: () => searchCDE(),
                    value: mockCDE[0] ?? "",
                  }}/>
                </Box>

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
                            height: 'calc(100% + 3.75rem)',
                            bottom: '-2.625rem',
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
                            <Box sx={{ width: '18.75rem' }}>
                            <FormControl fullWidth>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={age}
                                placeholder=""
                                onChange={handleChange}
                              >
                                <MenuItem disabled value={0} sx={{
                                  color: '#A9ACB2'
                                }}>
                                  <em>Choose column header to map...</em>
                                </MenuItem>
                                <MenuItem value={1}>MotorFoceApplied</MenuItem>
                                <MenuItem value={2}>Subject</MenuItem>
                                <MenuItem value={3}>Age</MenuItem>
                              </Select>
                            </FormControl>
                            </Box>
                            <Box><ArrowIcon /></Box>
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

                      <Box pl='2.5625rem' mt={3}>
                        <Box sx={{
                          position: 'relative',
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
                            <Box sx={{ width: '18.75rem' }}>
                            <FormControl fullWidth>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={age}
                                placeholder=""
                                onChange={handleChange}
                              >
                                <MenuItem disabled value={0}>
                                  Choose column header to map...
                                </MenuItem>
                                <MenuItem value={1}>Ten</MenuItem>
                                <MenuItem value={2}>Twenty</MenuItem>
                                <MenuItem value={3}>Thirty</MenuItem>
                              </Select>
                            </FormControl>
                            </Box>
                            <Box><ArrowIcon /></Box>
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
                                    // border: '0.0625rem solid #E4E5E7',
                                    // boxShadow: '0rem 0.0625rem 0.125rem 0rem rgba(7, 8, 8, 0.05)'
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
                </Box>
              </Box>

              <Box sx={styles.row}>
                <Box sx={styles.col}>
                  <Chip
                    color="secondary"
                    label="Mapped to Data Dictionary"
                    size="small"
                    icon={<BulletIcon color="#7A5AF8" />}
                  />
                </Box>
                <Box sx={styles.col}>
                  <TextField
                    disabled
                    fullWidth
                    value='MotorForceApplied'
                  />
                </Box>
                <Box sx={styles.col}>
                  <ArrowIcon />
                </Box>
                <Box sx={styles.col}>
                  <TextField fullWidth placeholder="Choose CDE or Data Dictionary fields..." />
                </Box>
              </Box>

              <Box sx={styles.row}>
                <Box sx={styles.col}>
                  <Chip
                    label="Suggested"
                    color="info"
                    size="small"
                    icon={<BulletIcon color="#346DDB" />}
                  />
                </Box>
                <Box sx={styles.col}>
                  <TextField
                    disabled
                    fullWidth
                    value='MotorForceApplied'
                  />
                </Box>
                <Box sx={styles.col}>
                  <ArrowIcon />
                </Box>
                <Box sx={styles.col}>
                  <TextField fullWidth placeholder="Choose CDE or Data Dictionary fields..." />
                </Box>
              </Box>

              <Box sx={styles.row}>
                <Box sx={styles.col}>
                  <Chip
                    label="Unmapped"
                    size="small"
                    icon={<BulletIcon color="#676C74" />}
                  />
                </Box>
                <Box sx={styles.col}>
                  <TextField
                    disabled
                    fullWidth
                    value='MotorForceApplied'
                  />
                </Box>
                <Box sx={styles.col}>
                  <ArrowIcon />
                </Box>
                <Box sx={styles.col}>
                  <TextField fullWidth placeholder="Choose CDE or Data Dictionary fields..." />
                </Box>
              </Box>

            </Box>
          </Box>
        </Box>
      </ModalHeightWrapper>

      <PreviewBox/>
    </>
  )
}

export default StepThree;