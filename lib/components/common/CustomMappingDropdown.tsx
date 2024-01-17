import React, { useState } from 'react';
import { FormControl, InputAdornment, MenuItem, Popper, Select, SelectChangeEvent, Stack, Tooltip } from "@mui/material";
import { TextField, Box, Typography, Button, ListSubheader, Chip } from '@mui/material';
import { AddIcon, CheckIcon, ChevronDown, DownIcon, GlobeIcon, MagicWandIcon, MagnifyGlassIcon } from "../../icons";
import HoveredOptionContent from "./HoveredOptionContent";
import NoResultField from './NoResultField';
import { vars } from '../../theme/variables';

type OptionDetail = {
  title: string; // What to display as the title/label for the property.
  value: string; // The actual value/content for the property.
};

const {
  buttonOutlinedBorderColor,
  darkBlue,
  baseWhite,
  dropdownBorderColor,
  buttonOutlinedColor,
  lightBlue,
  gray500,
  dropdownChipColor,
  captionColor,
  bodyBgColor,
  drodownDetailBg,
  gray400,
  grey400,
  gray100
} = vars;


type Option = {
  id: string;
  label: string;
  group: string;
  content: OptionDetail[];
}

const transition = {
  transition: 'all ease-in-out .3s'
}

const styles = {
  root: {
    zIndex: '1000000000',
    gap: '8px',
    minHeight: '36px',
    boxSizing: 'border-box',
    borderRadius: '8px',
    border: `1px solid ${buttonOutlinedBorderColor}`,
    cursor: 'pointer',
    background: baseWhite,
    display: 'flex',
    alignItems: 'center',
    padding: '0 10px 0 14px',
    position: 'relative',
    boxShadow: '0 1px 2px 0 rgba(16, 24, 40, 0.05)',
    ...transition,
    '&:after': {
      content: '""',
      width: '66px',
      height: 'calc(100% - 2px)',
      position: 'absolute',
      right: '1px',
      top: '1px',
      pointerEvents: 'none',
      background: 'linear-gradient(270deg, #FFF 67.69%, rgba(255, 255, 255, 0.00) 116.94%)',
      borderRadius: '0 8px 8px 0'
    }
  },

  rootHover: {
    '&:hover': {
      borderColor: dropdownBorderColor,
      boxShadow: '0px 0px 0px 4px #CEDDED, 0px 1px 2px 0px rgba(16, 24, 40, 0.05)'
    }
  },

  rootOpen: {
    borderColor: dropdownBorderColor,
    boxShadow: '0px 0px 0px 4px #CEDDED, 0px 1px 2px 0px rgba(16, 24, 40, 0.05)'
  },

  chip: {
    padding: '2px 4px 2px 5px',
    gap: '3px',
    height: '24px',
    borderRadius: '6px',
    fontSize: '14px',
    maxWidth: '128px',
    fontWeight: 500,

    '&.MuiChip-filled': {
      borderRadius: '16px',
      background: lightBlue,
      color: darkBlue,
      mixBlendMode: 'multiply',
    },

    '&.MuiChip-outlined': {
      color: buttonOutlinedColor,
      background: baseWhite,
      border: `1px solid ${buttonOutlinedBorderColor}`,
    },


    '& .MuiChip-label': {
      padding: 0
    },

    '& .MuiChip-deleteIcon': {
      margin: 0,
      color: grey400,
      fontSize: '12px',
      // zIndex: 10000
    }
  },

  toggleIcon: {
    marginLeft: 'auto',
    position: 'relative',
    zIndex: 9,
    fontSize: '20px',
    color: captionColor
  },

  placeholder: {
    color: captionColor,
    fontSize: '14px',
    fontWeight: 400,
    userSelect: 'none'
  },

  list: {
    width: '50%',
    flexShrink: 0,
    display: 'flex',
    flexDirection: 'column'
  },

  details: {
    background: drodownDetailBg,
    width: '60%',
    overflow: 'auto',
    flexShrink: 0,
    '& .MuiTypography-body2': {
      color: gray400,
      fontSize: '12px',
      fontWeight: 500,
      lineHeight: '150%',
      padding: 0
    },

    '& .MuiTypography-body1': {
      color: gray400,
      fontSize: '12px',
      fontWeight: 500,
      lineHeight: '150%',
      padding: 0,
    }
  }
}

export default function CustomEntitiesDropdown({
  placeholder,
  options: { errors, searchPlaceholder, noResultReason, onSearch, value, header = {} },
}: any) {
  const [searchValue] = useState("");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [toggleMenu, setToggleMenu] = useState(false);
  const [age, setAge] = React.useState('0');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  const [hoveredOption, setHoveredOption] = useState<Option | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<Option[]>(
    [value] || []
  );
  const [autocompleteOptions, setAutocompleteOptions] = useState<Option[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [toggleCustomView, setToggleCustomView] = useState(false)

  React.useEffect(() => {
    searchValue !== undefined &&
      setAutocompleteOptions(onSearch(searchValue));
  }, [searchValue, onSearch, autocompleteOptions]);

  const groupedOptions = autocompleteOptions.reduce((grouped: any, option: Option) => {
    const group = option.group;
    if (!grouped[group]) {
      grouped[group] = [];
    }
    grouped[group].push(option);
    return grouped;
  }, {});

  const handleOptionSelection = (option: Option) => {
    const isOptionAlreadySelected = selectedOptions.some((selected) => selected.id === option.id);
    if (isOptionAlreadySelected) {
      const updatedSelectedOptions = selectedOptions.filter((selected) => selected.id !== option.id);
      setSelectedOptions(updatedSelectedOptions);
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };


  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  };

  const isOptionSelected = (option: Option) => {
    return selectedOptions.some((selected) => selected.id === option.id);
  };

  return (
    <>
        <Box
          width={1}
          aria-describedby={id}
          sx={
            open ?
              { ...styles.root, ...styles.rootOpen } : selectedOptions.length === 0 ? styles.root : { ...styles.root, ...styles.rootHover }}
          onClick={handleClick}
        >
          {selectedOptions.length === 0 ? (
            <Typography sx={styles.placeholder}>{placeholder ?? 'Choose mapping...'}</Typography>
          ) : (
            <Box gap={1} minWidth={0} display='flex' flexWrap='wrap'>
              {selectedOptions?.map(() => (
                <Box
                  minWidth={0}
                  display='flex'
                  alignItems='center'
                  gap={1}
                  sx={{
                    '& .MuiTypography-root': {
                      fontSize: '14px',
                      lineHeight: '142.857%',
                      fontWeight: 500
                    },

                    '& .MuiTypography-body1': {
                      color: '#070808'
                    },

                    '& .MuiTypography-body2': {
                      fontWeight: 400,
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      minWidth: 0,
                      color: '#676C74',
                      maxWidth: '80%'
                    },
                  }}
                >
                  <GlobeIcon />
                  <Typography variant='body1'>{value?.label}</Typography>
                  <Typography variant='body2'>Unique identifiers for each subject in the dataset</Typography>
                </Box>
              ))}
            </Box>
          )}
          <ChevronDown style={styles.toggleIcon} />
        </Box>

      <Popper
        id={id}
        open={open}
        placement='bottom-end'
        anchorEl={anchorEl}
        sx={{
            height: "350px",
            borderRadius: '8px',
            border: `1px solid ${gray100}`,
            background: baseWhite,
            boxShadow: '0 8px 8px -4px rgba(7, 8, 8, 0.03), 0 20px 24px -4px rgba(7, 8, 8, 0.08)',
            m: '4px 0  !important',
            width: autocompleteOptions.length > 0 ? '888px' : '444px',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 99999
        }}
      >
        {header?.values?.length > 0 && (
          <Box
            display="flex"
            alignItems="center"
            flexWrap='wrap'
            gap={1}
            sx={{
              borderBottom: `1px solid ${gray100}`,
              height: autocompleteOptions.length > 0 ? '44px' : 'auto',
              padding: autocompleteOptions.length > 0 ? '0 14px' : '14px'
            }}
          >
            <Typography variant="body2">
              {header?.label}
            </Typography>
            {header?.values?.map((item: any, index: number) => (
              <Tooltip title={item} placement='top' arrow>
                <Chip
                  key={item?.id}
                  sx={{
                    ...styles.chip,
                    display: 'flex',
                  }}
                  variant='outlined'
                  label={
                    <>
                      <Typography
                        sx={{ verticalAlign: 'text-bottom', display: 'inline-block', mr: '4px', borderRadius: '3px', background: dropdownChipColor, px: '4px', fontSize: '12px', color: buttonOutlinedColor, fontWeight: 600, height: '18px' }}
                        component='span'
                      >
                        {index + 1}
                      </Typography>
                      {item}
                    </>
                  }
                />
              </Tooltip>
            ))}
          </Box>
        )}
        <Box display='flex' flex={1} height={autocompleteOptions.length > 0 ? 'calc(100% - 44px)' : 'auto'}>
        {autocompleteOptions.length > 0 && ( !toggleCustomView ?
            (<Box sx={styles.details}>
              {autocompleteOptions.length > 0 && (hoveredOption ? (
                <HoveredOptionContent
                  entity={hoveredOption}
                />
              ) : (
                <Box height={1} display='flex' alignItems='center' justifyContent='center'>
                  <Typography variant='body2'>
                    Hover over each CDE to its details
                  </Typography>
                </Box>
              ))}
            </Box>) : (<Box sx={styles.details}>
            <HoveredOptionContent
              entity={'Connections'}
              padding={0}
              BodyComponent={() => (
                <Box p={3}>
                  <Stack spacing={2} flexGrow={1}>
                    <Stack direction='row' spacing={1} sx={{ mt: 0 }}>
                      <Stack flexGrow={1}>
                        <Typography variant="body1">VariableName</Typography>
                        <Typography sx={{ p: '4px !important' }} variant="body2">MotorForceApplied</Typography>
                      </Stack>
                      <Stack>
                        <Chip size='small' variant='filled' color='secondary' label="Data dictionary" />
                      </Stack>
                    </Stack>
                    <Stack spacing={1} sx={{ mt: 3 }}>
                      <Typography variant="body1">Title</Typography>
                      <Typography variant="body2">
                        <TextField fullWidth placeholder='Insert here...' />
                      </Typography>
                    </Stack>
                    <Stack spacing={1} sx={{ mt: 3 }}>
                      <Typography variant="body1">Description</Typography>
                      <Typography variant="body2">
                        <TextField fullWidth placeholder='Insert here...' />
                      </Typography>
                    </Stack>
                    <Stack direction='row' spacing={4} sx={{ mt: 3 }}>
                      <Stack flexGrow={1}>
                        <Typography variant="body1">Unit of measure</Typography>
                        <Typography variant="body2">
                          <TextField fullWidth placeholder='Insert here...' />
                        </Typography>
                      </Stack>
                      <Stack flexGrow={1}>
                        <Typography variant="body1">Data type</Typography>
                        <Typography variant="body2">
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
                        </Typography>
                      </Stack>
                    </Stack>
                    <Stack spacing={1} sx={{ mt: 3 }}>
                      <Typography variant="body1">Comments</Typography>
                      <Typography variant="body2">
                        <TextField fullWidth placeholder='Insert here...' />
                      </Typography>
                    </Stack>
                  </Stack>
                </Box>
              )}
              HeaderComponent={() => (
                <Box 
                  position='sticky'
                  top={0}
                  display='flex'
                  alignItems='center'
                  justifyContent='space-between'
                  sx={{ background: '#FCFCFD', px: '24px', py: '7px', borderBottom: '1px solid #F2F4F7' }}
                >
                  <Chip size='small' variant='filled' color='warning' label="Draft" />
                  <Box
                    gap="4px"
                    display='flex'
                    alignItems='center'
                  >
                    <Button onClick={() => setToggleCustomView(false)}>Cancel</Button>
                    <Button variant='contained' color='info' onClick={() => setToggleCustomView(false)}>Confirm</Button>
                  </Box>
                </Box>
              )}
            />
          </Box>)
          )}
          
          <Box sx={{
            ...styles.list,
            width: autocompleteOptions.length > 0 ? '40%' : '100%'
          }}>
            <Box sx={{
              borderBottom: `1px solid ${gray100}`,
              height: '50px',
              padding: '0 14px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              flexWrap: 'wrap',

              '& .MuiOutlinedInput-input': {
                padding: 0,
                fontSize: '12px',
                color: gray500,
                fontWeight: '400',
                height: '50px',

                '&::placeholder': {
                  fontSize: '12px',
                  color: gray500,
                  fontWeight: '400',
                }
              },

              '& .MuiOutlinedInput-notchedOutline': {
                display: 'none'
              },

              '& .MuiOutlinedInput-root': {
                border: 'none',
                boxShadow: 'none',
                padding: '0'
              }
            }}>
              <TextField
                fullWidth
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder={searchPlaceholder}
                InputProps={{
                  startAdornment: <InputAdornment position='start'><MagnifyGlassIcon /></InputAdornment>
                }}
              />
            </Box>
            {autocompleteOptions.length > 0 ? (
              <>
                <Box overflow='auto' height='calc(100% - (44px + 50px))'>
                  {Object.keys(groupedOptions).map((group) => (
                    <Box sx={{
                      padding: '0 6px',
                      '& .MuiListSubheader-root': {
                        padding: '0 10px',
                        height: '30px',
                        margin: '6px 0 2px',

                        // '& .MuiTypography-root': {
                        //   fontSize: '12px',
                        //   lineHeight: '18px',
                        //   fontWeight: 600,
                        //   color: buttonOutlinedColor
                        // },
                      },
                      // '& .MuiCheckbox-root': {
                      //   padding: 0
                      // },
                      '& .MuiButton-root': {
                        padding: 0,
                        height: '26px',
                        width: '81px',
                        fontSize: '12px',
                        lineHeight: '18px',
                        fontWeight: 600,
                        color: darkBlue
                      },

                      '& ul': {
                        margin: 0,
                        listStyle: 'none',
                        padding: '0',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '6px',

                        '& li': {
                          padding: '11px 10px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          cursor: 'pointer',

                          '&:hover': {
                            borderRadius: '6px',
                            background: '#F4F5F5'
                          },

                          '&.selected': {
                            borderRadius: '6px',
                            background: '#F4F5F5'
                          },

                          '& .MuiTypography-body1': {
                            color: '#070808',
                            fontSize: '14px',
                            fontWeight: 500,
                            lineHeight: '142.857%',
                            padding: 0
                          },

                          '& .MuiTypography-body2': {
                            color: captionColor,
                            fontSize: '12px',
                            fontWeight: 400,
                            lineHeight: '150%',
                            padding: 0,
                            whiteSpace: 'nowrap'
                          }
                        }
                      }
                    }} key={group}>
                      <Box>
                        <ListSubheader
                          component="div"
                          onClick={() => setToggleMenu(!toggleMenu)}
                          style={{
                            position: 'relative',
                            display: "flex",
                            alignItems: "center",
                            cursor: 'pointer',
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography
                            sx={{
                              color: '#373A3E',
                              fontSize: "12px",
                              fontWeight: 500,
                              lineHeight: "18px",
                            }}
                          >
                            Spinal Cord Injury (SCI)
                          </Typography>
                          <DownIcon />
                          {toggleMenu && (
                            <Box onClick={(e) => e.stopPropagation()} sx={{
                              borderRadius: '8px',
                              overflow: 'hidden',
                              position: 'absolute',
                              width: 'calc(100% - 30px)',
                              top: '34px',
                              left: '15px',
                              border: '1px solid #E4E5E7',
                              background: '#FFF',
                              boxShadow: '0px 4px 6px -2px rgba(7, 8, 8, 0.03), 0px 12px 16px -4px rgba(7, 8, 8, 0.08)',

                              '& .simple-list': {
                                gap: 0,
                                '& li': {
                                  borderRadius: 0,
                                  paddingLeft: '16px',
                                  paddingRight: '16px',
                                  borderBottom: '1px solid #ECEDEE',
                                  '&:hover': {
                                    borderRadius: 0,
                                  },
                                  '& .MuiTypography-root': {
                                    fontWeight: '500 !important',
                                  },
                                }
                              }
                            }}>
                              <ul className='simple-list'>
                                <li>
                                  <Typography
                                    sx={{ width: 1, height: 1, padding: "10px" }}
                                  >Spinal Cord Injury (SCI)</Typography>
                                </li>
                                <li>
                                  <Typography
                                    sx={{ width: 1, height: 1, padding: "10px" }}
                                  >Trauma Brain Injury (TBI)</Typography>
                                </li>
                              </ul>
                              <ListSubheader
                                component="div"
                                style={{
                                  cursor: 'auto',
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                }}
                              >
                                <Typography
                                  sx={{
                                    color: '#676C74 !important',
                                    fontSize: "12px",
                                    fontWeight: '400 !important',
                                    lineHeight: "18px",
                                  }}
                                >
                                  Common Data Element (CDE)
                                </Typography>
                              </ListSubheader>
                              <Box p="6px">
                                <ul>
                                  <li className='selected'>
                                    <Typography
                                      sx={{ width: 1, height: 1, padding: "10px" }}
                                    >Spinal Cord Injury (SCI)</Typography>
                                    <CheckIcon color="#19418F" />
                                  </li>
                                  <li>
                                    <Typography
                                      sx={{ width: 1, height: 1, padding: "10px" }}
                                    >Trauma Brain Injury (TBI)</Typography>
                                  </li>
                                </ul>
                              </Box>
                            </Box>
                          )}
                        </ListSubheader>
                      </Box>

                      <Box mt={0.5} mx="-6px" p='6px' mb='6px'
                        sx={{
                          background: '#EEF2FC',
                          '& ul': {
                            '& li': {
                              '& svg': {
                                marginLeft: 'auto'
                              },
                              '& .MuiTypography-body1': {
                                color: '#2155BA'
                              },
                              '& .MuiTypography-body2': {
                                color: '#346DDB',
                                fontWeight: 400
                              },
                              '&.selected': {
                                background: 'rgba(194, 212, 244, 0.30)'
                              },
                              '&:hover': {
                                background: 'rgba(194, 212, 244, 0.30)'
                              }
                            },
                          }
                        }}
                      >
                          <Typography sx={{
                            fontSize: '12px',
                            fontWeight: 500,
                            lineHeight: '150%',
                            padding: '11px 10px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            color: '#122E64'
                          }}>
                            <MagicWandIcon />
                            Suggestions
                          </Typography>
                          <ul>
                            <li className='selected'>
                              <Typography
                                sx={{ height: 1, padding: "10px" }}
                              >GUID</Typography>
                              <Typography variant='body2'>SCI</Typography>
                              <CheckIcon color="#2155BA" />
                            </li>
                            <li>
                              <Typography
                                sx={{ height: 1, padding: "10px" }}
                              >SmallSpeciesStrainTyp</Typography>
                              <Typography variant='body2'>SCI</Typography>
                            </li>
                          </ul>
                      </Box>


                      { toggleCustomView && <Box>
                        <ListSubheader
                          component="div"
                          style={{
                            position: 'relative',
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography
                            sx={{
                              color: '#676C74',
                              fontSize: "12px",
                              fontWeight: 500,
                              lineHeight: "18px",
                            }}
                          >
                            Data dictionary
                          </Typography>
                        </ListSubheader>
                        <ul>
                          <li className="selected">
                            <Typography
                              sx={{ width: 1, height: 1, padding: "10px" }}
                            >
                              MotorForceApplied
                            </Typography>
                            <Chip color='secondary' label="Data dictionary" />
                            <CheckIcon style={{flexShrink: 0}} color="#070808" />
                          </li> 
                        </ul>
                      </Box> }


                      <Box>
                        <ListSubheader
                          component="div"
                          style={{
                            position: 'relative',
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography
                            sx={{
                              color: '#676C74',
                              fontSize: "12px",
                              fontWeight: 500,
                              lineHeight: "18px",
                            }}
                          >
                            Spinal Cord Injury (SCI)
                          </Typography>
                        </ListSubheader>

                        <ul>
                          {groupedOptions[group]
                            .filter((option: Option) =>
                              option.label.toLowerCase().includes(inputValue.toLowerCase())
                            )
                            .map((option: Option) => (
                              <li
                                key={option.id}
                                onMouseEnter={() => setHoveredOption(option)}
                                onClick={() => handleOptionSelection(option)}
                                className={isOptionSelected(option) ? 'selected' : ''}
                              >
                                <Typography
                                  sx={{ width: 1, height: 1, padding: "10px" }}
                                >
                                  {option?.label?.length > 100 ? option?.label.slice(0, 100) + "..." : option?.label}
                                </Typography>
                                {isOptionSelected(option) ? <CheckIcon color="#070808" /> : null}
                              </li>
                            ))}
                        </ul>
                      </Box>
                    </Box>
                  ))}
                </Box>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  sx={{
                    borderTop: `1px solid ${gray100}`,
                    height: '44px',

                    '& .MuiButton-root': {
                      color: gray500,
                      fontSize: "14px",
                      fontWeight: 600,
                      height: '100%',
                      lineHeight: "20px",
                      zIndex: 200000,
                      width: '100%',
                      borderRadius: 0,
                      p: 0,
                      '&:hover': {
                        background: bodyBgColor
                      }
                    }
                  }}
                >
                  <Button
                    disableRipple
                    startIcon={<AddIcon />}
                    variant="text"
                    onClick={(e) => {
                      e.preventDefault();
                      setToggleCustomView((toggleCustomView) => !toggleCustomView)
                    }}
                  >
                    Add custom dictionary field
                  </Button>
                </Box>
              </>
            ) : (
              <NoResultField noResultReason={noResultReason} />
            )}
          </Box>
        </Box>
      </Popper>
      {errors && (
        <Typography color={"#B42318"} mt={1}>
          {errors}
        </Typography>
      )}
    </>
  )
}
