import { Box, Button, Chip, FormControl, FormGroup, Grid, IconButton, InputAdornment, Link, MenuItem, Popover, Select, SelectChangeEvent, TextField, Typography } from "@mui/material"
import ModalHeightWrapper from "../common/ModalHeightWrapper"
import { ArrowDropDown, ArrowIcon, BulletIcon, CheckIcon, CrossIcon, FilterIcon, GlobeIcon, InfoIcon, LinkIcon, PairIcon, SearchIcon, SortIcon } from "../../icons";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React, { useState } from "react";
import Checkbox from "../common/CheckBox";
import CustomEntitiesDropdown from "./CustomMappingDropdown";

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
  const [togglePreview, setTogglePreview] = useState(false);
  const [age, setAge] = React.useState('0');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const mockEntities = [
    {
      "id": "5304",
      "group": 'Origins',
      "label": "('Aortic arch', 'arch of aorta')",
      "content": [
        {
          "title": "Name",
          "value": "('Aortic arch', 'arch of aorta')"
        },
        {
          "title": "Ontology URI",
          "value": "http://purl.obolibrary.org/obo/UBERON_0001508"
        }
      ]
    },
    {
      "id": "32845",
      "group": 'Origins',
      "label": "(embryonic) hindbrain flexure",
      "content": [
        {
          "title": "Name",
          "value": "(embryonic) hindbrain flexure"
        },
        {
          "title": "Ontology URI",
          "value": "http://purl.obolibrary.org/obo/UBERON_0005820"
        }
      ]
    },
    {
      "id": "47428",
      "group": 'Origins',
      "label": "(mid-third) lateral capsular ligament",
      "content": [
        {
          "title": "Name",
          "value": "(mid-third) lateral capsular ligament"
        },
        {
          "title": "Ontology URI",
          "value": "http://purl.obolibrary.org/obo/UBERON_0014899"
        }
      ]
    },
    {
      "id": "12822",
      "group": 'Origins',
      "label": "(pre-)piriform cortex",
      "content": [
        {
          "title": "Name",
          "value": "(pre-)piriform cortex"
        },
        {
          "title": "Ontology URI",
          "value": "http://purl.obolibrary.org/obo/UBERON_0002590"
        }
      ]
    },
    {
      "id": "1798",
      "group": 'Origins',
      "label": "02 optic nerve",
      "content": [
        {
          "title": "Name",
          "value": "02 optic nerve"
        },
        {
          "title": "Ontology URI",
          "value": "http://purl.obolibrary.org/obo/UBERON_0000941"
        }
      ]
    },
    {
      "id": "53259",
      "group": 'Origins',
      "label": "10 R+L thoracic",
      "content": [
        {
          "title": "Name",
          "value": "10 R+L thoracic"
        },
        {
          "title": "Ontology URI",
          "value": "http://purl.obolibrary.org/obo/UBERON_0039167"
        }
      ]
    },
    {
      "id": "6604",
      "group": 'Origins',
      "label": "10n",
      "content": [
        {
          "title": "Name",
          "value": "10n"
        },
        {
          "title": "Ontology URI",
          "value": "http://purl.obolibrary.org/obo/UBERON_0001759"
        }
      ]
    },
    {
      "id": "52948",
      "group": 'Origins',
      "label":"11 R+L thoracic",
      "content": [
        {
          "title": "Name",
          "value": "11 R+L thoracic"
        },
        {
          "title": "Ontology URI",
          "value": "http://purl.obolibrary.org/obo/UBERON_0038635"
        }
      ]
    },
    {
      "id": "52950",
      "group": 'Origins',
      "label": "11 thoracic lymph node",
      "content": [
        {
          "title": "Name",
          "value": "11 thoracic lymph node"
        },
        {
          "title": "Ontology URI",
          "value": "http://purl.obolibrary.org/obo/UBERON_0038635"
        }
      ]
    },
    {
      "id": "52956",
      "group": 'Origins',
      "label": "12R+L thoracic lymph node",
      "content": [
        {
          "title": "Name",
          "value": "12R+L thoracic lymph node"
        },
        {
          "title": "Ontology URI",
          "value": "http://purl.obolibrary.org/obo/UBERON_0038638"
        }
      ]
    },
    {
      "id": "6050",
      "group": 'Origins',
      "label": "12n",
      "content": [
        {
          "title": "Name",
          "value": "12n"
        },
        {
          "title": "Ontology URI",
          "value": "http://purl.obolibrary.org/obo/UBERON_0001650"
        }
      ]
    }
  ];


  const getEntities = (searchValue: string) => mockEntities;


  const updateOriginsInStatment = (options: any, id: string) => {
  return false;
  }
  return (
    <>
      <ModalHeightWrapper pb={10}>
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
            onClick={handleClick}
          >
            <FilterIcon />
            Filter
          </Button>

          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <Box sx={{
              borderBottom: '0.0625rem solid #ECEDEE',
              padding: '1rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <Typography sx={{
                fontSize: '0.75rem',
                fontWeight: 500,
                lineHeight: '150%',
                color: '#676C74'
              }}>Filter by</Typography>
              <Button
                variant="text"
                sx={{
                  p: 0,
                  '&:hover': {
                    background: 'transparent'
                  }
                }}
              >
                Reset filters
              </Button>
            </Box>

            <Box p='1rem' sx={{borderBottom: '0.0625rem solid #ECEDEE'}}>
              <Typography sx={{fontSize: '0.75rem', fontWeight: 500, lineHeight: '150%', color: '#676C74', mb: '0.75rem'}}>Status</Typography>
              <Checkbox label="All" />

              <Box pl={3} mt="0.75rem" sx={{
                position: 'relative',
                '&:before': {
                  content: '""',
                  width: '0.0625rem',
                  height: '100%',
                  background: '#ECEDEE',
                  position: 'absolute',
                  top: 0,
                  left: '0.4688rem'
                }
              }}>
                <FormGroup>
                  <Checkbox label="Mapped to CDE" />
                  <Checkbox label="Mapped to Data Dictionary field" />
                  <Checkbox label="Unmapped" />
                </FormGroup>
              </Box>
            </Box>
            <Box p='1rem' sx={{borderBottom: '0.0625rem solid #ECEDEE'}}>
              <Typography sx={{fontSize: '0.75rem', fontWeight: 500, lineHeight: '150%', color: '#676C74', mb: '0.75rem'}}>Type of mapping</Typography>
              <Checkbox label="All" />
              <Box pl={3} mt="0.75rem" sx={{
                position: 'relative',
                '&:before': {
                  content: '""',
                  width: '0.0625rem',
                  height: '100%',
                  background: '#ECEDEE',
                  position: 'absolute',
                  top: 0,
                  left: '0.4688rem'
                }
              }}>
                <FormGroup>
                  <Checkbox label="Mapped to CDE" />
                  <Checkbox label="Mapped to Data Dictionary field" />
                  <Checkbox label="Unmapped" />
                </FormGroup>
              </Box>
            </Box>

            <Box sx={{
              padding: '1rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <Checkbox label="Hide previously mapped columns" />
            </Box>
          </Popover>
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
                  <TextField fullWidth placeholder="Choose CDE or Data Dictionary fields..." />
                </Box>

                <Box width='100%' mt={1.5}>
                  <Box mb={3} display='inline-flex' alignItems='center' gap={1} sx={{ cursor: 'pointer', userSelect: 'none' }}>
                    <PairIcon />
                    <Typography sx={{ fontSize: '0.75rem', color: '#4F5359', fontWeight: 500, lineHeight: '150%' }}>Pairing suggestions</Typography>
                    <InfoIcon style={{ marginLeft: '0.25rem' }} />
                  </Box>

                  <Box pl='2.5625rem'>
                    <Box sx={{
                      position: 'relative',
                      '&:before': {
                        content: '""',
                        position: 'absolute',
                        left: '-1.375rem',
                        height: 'calc(100% + 0.625rem)',
                        bottom: 0,
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

                  <Box pl='2.5625rem'>
                    <Box sx={{
                      position: 'relative',
                      '&:before': {
                        content: '""',
                        position: 'absolute',
                        left: '-1.375rem',
                        height: 'calc(100% + 0.625rem)',
                        bottom: 0,
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
                  <CustomEntitiesDropdown options= {{
                    placeholder: "Look for Origins",
                    searchPlaceholder: "Search for Origins",
                    noResultReason: "We couldn’t find any record with these origin in the database.",
                    disabledReason: "Add Destination entity to get access to the forward connection form",
                    onSearch: (searchValue: string) => getEntities(searchValue),
                    onUpdate: (selectedOptions: any) => updateOriginsInStatment(selectedOptions, statement?.id),
                    // statement: statement,
                    // errors: statement?.errors?.includes("Invalid origin")
                    //   ? statement.errors
                    //   : "",
                    value: mockEntities[0] ?? "",
                    CustomFooter : () => <Box sx={{mt: '1.5rem', display: 'flex', gap: 1, flexWrap: 'wrap', pt: '1.5rem', borderTop: '0.0625rem solid #F2F4F7'}}>
                      {/* <Chip variant="filled" color="error" label={"https://google.com"} /> */}
                      <Chip variant="outlined" label={"https://google.com"} />
                    </Box>,
                  }}/>
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

      <Box sx={{
        position: 'absolute',
        background: '#fff',
        zIndex: 9,
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
                  padding: '0.375rem 0.5rem'
                }}>No mapping yet</Typography>
              </Box>
              <Box>
                <Typography sx={{
                  color: '#A9ACB2',
                  border: '0.0938rem dashed #E4E5E7',
                  borderRadius: '0.25rem',
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
                  padding: '0.375rem 0.5rem'
                }}>No mapping yet</Typography>
              </Box>
              <Box>
                <Typography sx={{
                  color: '#A9ACB2',
                  border: '0.0938rem dashed #E4E5E7',
                  borderRadius: '0.25rem',
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
                  padding: '0.375rem 0.5rem'
                }}>No mapping yet</Typography>
              </Box>
              <Box>
                <Typography sx={{
                  color: '#A9ACB2',
                  border: '0.0938rem dashed #E4E5E7',
                  borderRadius: '0.25rem',
                  lineHeight: '142.857%',
                  padding: '0.375rem 0.5rem'
                }}>No mapping yet</Typography>
              </Box>
            </Box>

            <Table sx={{
              '& .MuiTableCell-root': {
                boxSizing: 'border-box',
                minWidth: '10rem',
                width: '10rem',
                padding: '0.75rem 1.5rem',
                borderTop: '0.0625rem solid',
                borderColor: '#E4E5E7',
                borderLeft: '0.0625rem solid #E4E5E7',

                '&:last-of-type': {
                  borderRight: '0.0625rem solid #E4E5E7'
                }
              },


              '& .MuiTableCell-body': {
                fontSize: '0.875rem',
                color: '#4F5359',
                lineHeight: '142.857%'
              },
            }}>
              <TableHead>
                <TableRow sx={{
                  '& .MuiTableCell-root': {
                    background: '#F4F5F5',
                  },
                }}>
                  <TableCell>Subject</TableCell>
                  <TableCell>Species</TableCell>
                  <TableCell>Strain</TableCell>
                  <TableCell>Sex</TableCell>
                  <TableCell>Age</TableCell>
                  <TableCell>Group</TableCell>
                  <TableCell>StudyInjModelTyp</TableCell>
                  <TableCell>Subject</TableCell>
                  <TableCell>Species</TableCell>
                  <TableCell>Strain</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                <TableRow>
                  <TableCell>Subject</TableCell>
                  <TableCell>Species</TableCell>
                  <TableCell>Strain</TableCell>
                  <TableCell>Sex</TableCell>
                  <TableCell>Age</TableCell>
                  <TableCell>Group</TableCell>
                  <TableCell>StudyInjModelTyp</TableCell>
                  <TableCell>Subject</TableCell>
                  <TableCell>Species</TableCell>
                  <TableCell>Strain</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Subject</TableCell>
                  <TableCell>Species</TableCell>
                  <TableCell>Strain</TableCell>
                  <TableCell>Sex</TableCell>
                  <TableCell>Age</TableCell>
                  <TableCell>Group</TableCell>
                  <TableCell>StudyInjModelTyp</TableCell>
                  <TableCell>Subject</TableCell>
                  <TableCell>Species</TableCell>
                  <TableCell>Strain</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Subject</TableCell>
                  <TableCell>Species</TableCell>
                  <TableCell>Strain</TableCell>
                  <TableCell>Sex</TableCell>
                  <TableCell>Age</TableCell>
                  <TableCell>Group</TableCell>
                  <TableCell>StudyInjModelTyp</TableCell>
                  <TableCell>Subject</TableCell>
                  <TableCell>Species</TableCell>
                  <TableCell>Strain</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Subject</TableCell>
                  <TableCell>Species</TableCell>
                  <TableCell>Strain</TableCell>
                  <TableCell>Sex</TableCell>
                  <TableCell>Age</TableCell>
                  <TableCell>Group</TableCell>
                  <TableCell>StudyInjModelTyp</TableCell>
                  <TableCell>Subject</TableCell>
                  <TableCell>Species</TableCell>
                  <TableCell>Strain</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Subject</TableCell>
                  <TableCell>Species</TableCell>
                  <TableCell>Strain</TableCell>
                  <TableCell>Sex</TableCell>
                  <TableCell>Age</TableCell>
                  <TableCell>Group</TableCell>
                  <TableCell>StudyInjModelTyp</TableCell>
                  <TableCell>Subject</TableCell>
                  <TableCell>Species</TableCell>
                  <TableCell>Strain</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Subject</TableCell>
                  <TableCell>Species</TableCell>
                  <TableCell>Strain</TableCell>
                  <TableCell>Sex</TableCell>
                  <TableCell>Age</TableCell>
                  <TableCell>Group</TableCell>
                  <TableCell>StudyInjModelTyp</TableCell>
                  <TableCell>Subject</TableCell>
                  <TableCell>Species</TableCell>
                  <TableCell>Strain</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Subject</TableCell>
                  <TableCell>Species</TableCell>
                  <TableCell>Strain</TableCell>
                  <TableCell>Sex</TableCell>
                  <TableCell>Age</TableCell>
                  <TableCell>Group</TableCell>
                  <TableCell>StudyInjModelTyp</TableCell>
                  <TableCell>Subject</TableCell>
                  <TableCell>Species</TableCell>
                  <TableCell>Strain</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Subject</TableCell>
                  <TableCell>Species</TableCell>
                  <TableCell>Strain</TableCell>
                  <TableCell>Sex</TableCell>
                  <TableCell>Age</TableCell>
                  <TableCell>Group</TableCell>
                  <TableCell>StudyInjModelTyp</TableCell>
                  <TableCell>Subject</TableCell>
                  <TableCell>Species</TableCell>
                  <TableCell>Strain</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Subject</TableCell>
                  <TableCell>Species</TableCell>
                  <TableCell>Strain</TableCell>
                  <TableCell>Sex</TableCell>
                  <TableCell>Age</TableCell>
                  <TableCell>Group</TableCell>
                  <TableCell>StudyInjModelTyp</TableCell>
                  <TableCell>Subject</TableCell>
                  <TableCell>Species</TableCell>
                  <TableCell>Strain</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Box>
        )}
      </Box>
    </>
  )
}

export default StepThree;