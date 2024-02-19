import React, {useState} from 'react';
import {FormControl, InputAdornment, MenuItem, Popper, Select, SelectChangeEvent, Stack, Tooltip} from "@mui/material";
import {TextField, Box, Typography, Button, ListSubheader, Chip} from '@mui/material';
import {AddIcon, CheckIcon, ChevronDown, DownIcon, GlobeIcon, MagicWandIcon, MagnifyGlassIcon} from "../../icons";
import HoveredOptionContent from "./HoveredOptionContent";
import NoResultField from './NoResultField';
import {vars} from '../../theme/variables';

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

const transition = {
    transition: 'all ease-in-out .3s'
}

const styles = {
    root: {
        zIndex: '1000000000',
        gap: '0.5rem',
        minHeight: '2.25rem',
        boxSizing: 'border-box',
        borderRadius: '0.5rem',
        border: `0.0625rem solid ${buttonOutlinedBorderColor}`,
        cursor: 'pointer',
        background: baseWhite,
        display: 'flex',
        alignItems: 'center',
        padding: '0 0.625rem 0 0.875rem',
        position: 'relative',
        boxShadow: '0 0.0625rem 0.125rem 0 rgba(16, 24, 40, 0.05)',
        ...transition,
        '&:after': {
            content: '""',
            width: '4.125rem',
            height: 'calc(100% - 0.125rem)',
            position: 'absolute',
            right: '0.0625rem',
            top: '0.0625rem',
            pointerEvents: 'none',
            background: 'linear-gradient(270deg, #FFF 67.69%, rgba(255, 255, 255, 0.00) 116.94%)',
            borderRadius: '0 0.5rem 0.5rem 0'
        }
    },

    rootHover: {
        '&:hover': {
            borderColor: dropdownBorderColor,
            boxShadow: '0rem 0rem 0rem 0.25rem #CEDDED, 0rem 0.0625rem 0.125rem 0rem rgba(16, 24, 40, 0.05)'
        }
    },

    rootOpen: {
        borderColor: dropdownBorderColor,
        boxShadow: '0rem 0rem 0rem 0.25rem #CEDDED, 0rem 0.0625rem 0.125rem 0rem rgba(16, 24, 40, 0.05)'
    },

    chip: {
        padding: '0.125rem 0.25rem 0.125rem 0.3125rem',
        gap: '0.1875rem',
        height: '1.5rem',
        borderRadius: '0.375rem',
        fontSize: '0.875rem',
        maxWidth: '8rem',
        fontWeight: 500,

        '&.MuiChip-filled': {
            borderRadius: '1rem',
            background: lightBlue,
            color: darkBlue,
            mixBlendMode: 'multiply',
        },

        '&.MuiChip-outlined': {
            color: buttonOutlinedColor,
            background: baseWhite,
            border: `0.0625rem solid ${buttonOutlinedBorderColor}`,
        },


        '& .MuiChip-label': {
            padding: 0
        },

        '& .MuiChip-deleteIcon': {
            margin: 0,
            color: grey400,
            fontSize: '0.75rem',
            // zIndex: 10000
        }
    },

    toggleIcon: {
        marginLeft: 'auto',
        position: 'relative',
        zIndex: 9,
        fontSize: '1.25rem',
        color: captionColor
    } as const,

    placeholder: {
        color: captionColor,
        fontSize: '0.875rem',
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
            fontSize: '0.75rem',
            fontWeight: 500,
            lineHeight: '150%',
            padding: 0
        },

        '& .MuiTypography-body1': {
            color: gray400,
            fontSize: '0.75rem',
            fontWeight: 500,
            lineHeight: '150%',
            padding: 0,
        }
    }
}

export type OptionDetail = {
    title: string; // What to display as the title/label for the property.
    value: string; // The actual value/content for the property.
};

export type Option = {
    id: string;
    label: string;
    group: string;
    content: OptionDetail[];
}

interface Header {
    label: string;
    values: string[];
}

interface CustomEntitiesDropdownProps {
    placeholder?: string;
    handleNextStepTutorial?: () => void | undefined;
    options: {
        errors?: string;
        searchPlaceholder?: string;
        noResultReason?: string;
        onSearch: (searchValue: string) => Option[];
        value: Option;
        header?: Header;
    };
}

export default function CustomEntitiesDropdown({
                                                   placeholder,
                                                   handleNextStepTutorial,
                                                   options: {
                                                       errors,
                                                       searchPlaceholder,
                                                       noResultReason,
                                                       onSearch,
                                                       value,
                                                       header
                                                   },
                                               }: CustomEntitiesDropdownProps) {
    const [searchValue] = useState("");
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [toggleMenu, setToggleMenu] = useState(false);
    const [age, setAge] = React.useState('0');

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
    };

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
        handleNextStepTutorial?.();
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

    type GroupedOptions = {
        [group: string]: Option[];
    };

    const groupedOptions = autocompleteOptions.reduce((grouped: GroupedOptions, option: Option) => {
        const group = option.group;
        if (!grouped[group]) {
            grouped[group] = [];
        }
        grouped[group].push(option);
        return grouped;
    }, {} as GroupedOptions);

    const handleOptionSelection = (option: Option) => {
        const isOptionAlreadySelected = selectedOptions.some((selected) => selected.id === option.id);
        if (isOptionAlreadySelected) {
            const updatedSelectedOptions = selectedOptions.filter((selected) => selected.id !== option.id);
            setSelectedOptions(updatedSelectedOptions);
        } else {
            setSelectedOptions([...selectedOptions, option]);
        }
    };


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
                        {...styles.root, ...styles.rootOpen} : selectedOptions.length === 0 ? styles.root : {...styles.root, ...styles.rootHover}}
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
                                    '& svg': {
                                        flexShrink: 0
                                    },
                                    '& .MuiTypography-root': {
                                        fontSize: '0.875rem',
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
                                        maxWidth: '12.5rem'
                                    },
                                }}
                            >
                                <GlobeIcon/>
                                <Typography variant='body1'>{value?.label}</Typography>
                                <Typography variant='body2'>Unique identifiers for each subject in the
                                    dataset</Typography>
                            </Box>
                        ))}
                    </Box>
                )}
                <ChevronDown style={styles.toggleIcon}/>
            </Box>

            <Popper
                id={id}
                open={open}
                placement='bottom-end'
                anchorEl={anchorEl}
                className='cde-field__popper'
                sx={{
                    height: "21.875rem",
                    borderRadius: '0.5rem',
                    border: `0.0625rem solid ${gray100}`,
                    background: baseWhite,
                    boxShadow: '0 0.5rem 0.5rem -0.25rem rgba(7, 8, 8, 0.03), 0 1.25rem 1.5rem -0.25rem rgba(7, 8, 8, 0.08)',
                    m: '0.25rem 0  !important',
                    width: autocompleteOptions.length > 0 ? '55.5rem' : '27.75rem',
                    display: 'flex',
                    flexDirection: 'column',
                    zIndex: 99999
                }}
            >
                {header && header.values?.length > 0 && (
                    <Box
                        display="flex"
                        alignItems="center"
                        flexWrap='wrap'
                        gap={1}
                        sx={{
                            borderBottom: `0.0625rem solid ${gray100}`,
                            height: autocompleteOptions.length > 0 ? '2.75rem' : 'auto',
                            padding: autocompleteOptions.length > 0 ? '0 0.875rem' : '0.875rem'
                        }}
                    >
                        <Typography variant="body2">
                            {header?.label}
                        </Typography>
                        {header?.values?.map((item: string, index: number) => (
                            <Tooltip title={item} placement='top' arrow>
                                <Chip
                                    sx={{
                                        ...styles.chip,
                                        display: 'flex',
                                    }}
                                    variant='outlined'
                                    label={
                                        <>
                                            <Typography
                                                sx={{
                                                    verticalAlign: 'text-bottom',
                                                    display: 'inline-block',
                                                    mr: '0.25rem',
                                                    borderRadius: '0.1875rem',
                                                    background: dropdownChipColor,
                                                    px: '0.25rem',
                                                    fontSize: '0.75rem',
                                                    color: buttonOutlinedColor,
                                                    fontWeight: 600,
                                                    height: '1.125rem'
                                                }}
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
                <Box display='flex' flex={1} height={autocompleteOptions.length > 0 ? 'calc(100% - 2.75rem)' : 'auto'}>
                    {autocompleteOptions.length > 0 && (!toggleCustomView ?
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
                                    entity={{
                                        id: "placeholder",
                                        label: "Connections",
                                        group: "placeholder",
                                        content: [],
                                    }}
                                    padding={0}
                                    BodyComponent={() => (
                                        <Box p={3}>
                                            <Stack spacing={2} flexGrow={1}>
                                                <Stack direction='row' spacing={1} sx={{mt: 0}}>
                                                    <Stack flexGrow={1}>
                                                        <Typography variant="body1">VariableName</Typography>
                                                        <Typography sx={{p: '0.25rem !important'}}
                                                                    variant="body2">MotorForceApplied</Typography>
                                                    </Stack>
                                                    <Stack>
                                                        <Chip size='small' variant='filled' color='secondary'
                                                              label="Data dictionary"/>
                                                    </Stack>
                                                </Stack>
                                                <Stack spacing={1} sx={{mt: 3}}>
                                                    <Typography variant="body1">Title</Typography>
                                                    <Typography variant="body2">
                                                        <TextField fullWidth placeholder='Insert here...'/>
                                                    </Typography>
                                                </Stack>
                                                <Stack spacing={1} sx={{mt: 3}}>
                                                    <Typography variant="body1">Description</Typography>
                                                    <Typography variant="body2">
                                                        <TextField fullWidth placeholder='Insert here...'/>
                                                    </Typography>
                                                </Stack>
                                                <Stack direction='row' spacing={4} sx={{mt: 3}}>
                                                    <Stack flexGrow={1}>
                                                        <Typography variant="body1">Unit of measure</Typography>
                                                        <Typography variant="body2">
                                                            <TextField fullWidth placeholder='Insert here...'/>
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
                                                <Stack spacing={1} sx={{mt: 3}}>
                                                    <Typography variant="body1">Comments</Typography>
                                                    <Typography variant="body2">
                                                        <TextField fullWidth placeholder='Insert here...'/>
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
                                            sx={{
                                                background: '#FCFCFD',
                                                px: '1.5rem',
                                                py: '0.4375rem',
                                                borderBottom: '0.0625rem solid #F2F4F7'
                                            }}
                                        >
                                            <Chip size='small' variant='filled' color='warning' label="Draft"/>
                                            <Box
                                                gap="0.25rem"
                                                display='flex'
                                                alignItems='center'
                                            >
                                                <Button onClick={() => setToggleCustomView(false)}>Cancel</Button>
                                                <Button variant='contained' color='info'
                                                        onClick={() => setToggleCustomView(false)}>Confirm</Button>
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
                            borderBottom: `0.0625rem solid ${gray100}`,
                            height: '3.125rem',
                            padding: '0 0.875rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            flexWrap: 'wrap',

                            '& .MuiOutlinedInput-input': {
                                padding: 0,
                                fontSize: '0.75rem',
                                color: gray500,
                                fontWeight: '400',
                                height: '3.125rem',

                                '&::placeholder': {
                                    fontSize: '0.75rem',
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
                                    startAdornment: <InputAdornment
                                        position='start'><MagnifyGlassIcon/></InputAdornment>
                                }}
                            />
                        </Box>
                        {autocompleteOptions.length > 0 ? (
                            <>
                                <Box overflow='auto' height='calc(100% - (2.75rem + 3.125rem))'>
                                    {Object.keys(groupedOptions).map((group) => (
                                        <Box sx={{
                                            padding: '0 0.375rem',
                                            '& .MuiListSubheader-root': {
                                                padding: '0 0.625rem',
                                                height: '1.875rem',
                                                margin: '0.375rem 0 0.125rem',

                                                // '& .MuiTypography-root': {
                                                //   fontSize: '0.75rem',
                                                //   lineHeight: '1.125rem',
                                                //   fontWeight: 600,
                                                //   color: buttonOutlinedColor
                                                // },
                                            },
                                            // '& .MuiCheckbox-root': {
                                            //   padding: 0
                                            // },
                                            '& .MuiButton-root': {
                                                padding: 0,
                                                height: '1.625rem',
                                                width: '5.0625rem',
                                                fontSize: '0.75rem',
                                                lineHeight: '1.125rem',
                                                fontWeight: 600,
                                                color: darkBlue
                                            },

                                            '& ul': {
                                                margin: 0,
                                                listStyle: 'none',
                                                padding: '0',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: '0.375rem',

                                                '& li': {
                                                    padding: '0.6875rem 0.625rem',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.5rem',
                                                    cursor: 'pointer',

                                                    '&:hover': {
                                                        borderRadius: '0.375rem',
                                                        background: '#F4F5F5'
                                                    },

                                                    '&.selected': {
                                                        borderRadius: '0.375rem',
                                                        background: '#F4F5F5'
                                                    },

                                                    '&.highlighted': {
                                                        borderRadius: '0.375rem',
                                                        background: '#F4F5F5',
                                                        border: '0.0938rem dashed #5925DC'
                                                    },

                                                    '& .MuiTypography-body1': {
                                                        color: '#070808',
                                                        fontSize: '0.875rem',
                                                        fontWeight: 500,
                                                        lineHeight: '142.857%',
                                                        padding: 0
                                                    },

                                                    '& .MuiTypography-body2': {
                                                        color: captionColor,
                                                        fontSize: '0.75rem',
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
                                                            fontSize: "0.75rem",
                                                            fontWeight: 500,
                                                            lineHeight: "1.125rem",
                                                        }}
                                                    >
                                                        Spinal Cord Injury (SCI)
                                                    </Typography>
                                                    <DownIcon/>
                                                    {toggleMenu && (
                                                        <Box onClick={(e) => e.stopPropagation()} sx={{
                                                            borderRadius: '0.5rem',
                                                            overflow: 'hidden',
                                                            position: 'absolute',
                                                            width: 'calc(100% - 1.875rem)',
                                                            top: '2.125rem',
                                                            left: '0.9375rem',
                                                            border: '0.0625rem solid #E4E5E7',
                                                            background: '#FFF',
                                                            boxShadow: '0rem 0.25rem 0.375rem -0.125rem rgba(7, 8, 8, 0.03), 0rem 0.75rem 1rem -0.25rem rgba(7, 8, 8, 0.08)',

                                                            '& .simple-list': {
                                                                gap: 0,
                                                                '& li': {
                                                                    borderRadius: 0,
                                                                    paddingLeft: '1rem',
                                                                    paddingRight: '1rem',
                                                                    borderBottom: '0.0625rem solid #ECEDEE',
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
                                                                        sx={{width: 1, height: 1, padding: "0.625rem"}}
                                                                    >Spinal Cord Injury (SCI)</Typography>
                                                                </li>
                                                                <li>
                                                                    <Typography
                                                                        sx={{width: 1, height: 1, padding: "0.625rem"}}
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
                                                                        fontSize: "0.75rem",
                                                                        fontWeight: '400 !important',
                                                                        lineHeight: "1.125rem",
                                                                    }}
                                                                >
                                                                    Common Data Element (CDE)
                                                                </Typography>
                                                            </ListSubheader>
                                                            <Box p="0.375rem">
                                                                <ul>
                                                                    <li className='selected'>
                                                                        <Typography
                                                                            sx={{
                                                                                width: 1,
                                                                                height: 1,
                                                                                padding: "0.625rem"
                                                                            }}
                                                                        >Spinal Cord Injury (SCI)</Typography>
                                                                        <CheckIcon color="#19418F"/>
                                                                    </li>
                                                                    <li>
                                                                        <Typography
                                                                            sx={{
                                                                                width: 1,
                                                                                height: 1,
                                                                                padding: "0.625rem"
                                                                            }}
                                                                        >Trauma Brain Injury (TBI)</Typography>
                                                                    </li>
                                                                </ul>
                                                            </Box>
                                                        </Box>
                                                    )}
                                                </ListSubheader>
                                            </Box>

                                            <Box mt={0.5} mx="-0.375rem" p='0.375rem' mb='0.375rem'
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
                                                    fontSize: '0.75rem',
                                                    fontWeight: 500,
                                                    lineHeight: '150%',
                                                    padding: '0.6875rem 0.625rem',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.5rem',
                                                    color: '#122E64'
                                                }}>
                                                    <MagicWandIcon/>
                                                    Suggestions
                                                </Typography>
                                                <ul>
                                                    <li className='selected'>
                                                        <Typography
                                                            sx={{height: 1, padding: "0.625rem"}}
                                                        >GUID</Typography>
                                                        <Typography variant='body2'>SCI</Typography>
                                                        <CheckIcon color="#2155BA"/>
                                                    </li>
                                                    <li>
                                                        <Typography
                                                            sx={{height: 1, padding: "0.625rem"}}
                                                        >SmallSpeciesStrainTyp</Typography>
                                                        <Typography variant='body2'>SCI</Typography>
                                                    </li>
                                                </ul>
                                            </Box>


                                            {toggleCustomView &&
                                                <Box>
                                                    <ListSubheader
                                                        component="div"
                                                        style={{
                                                            position: 'static',
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "space-between",
                                                        }}
                                                    >
                                                        <Typography
                                                            sx={{
                                                                color: '#676C74',
                                                                fontSize: "0.75rem",
                                                                fontWeight: 500,
                                                                lineHeight: "1.125rem",
                                                            }}
                                                        >
                                                            Data dictionary
                                                        </Typography>
                                                    </ListSubheader>
                                                    <ul>
                                                        <li className="selected">
                                                            <Typography
                                                                sx={{width: 1, height: 1, padding: "0.625rem"}}
                                                            >
                                                                MotorForceApplied
                                                            </Typography>
                                                            <Chip color='secondary' label="Data dictionary"/>
                                                            <CheckIcon style={{flexShrink: 0}} color="#070808"/>
                                                        </li>


                                                        <li className="highlighted">
                                                            <Typography
                                                                sx={{width: 1, height: 1, padding: "0.625rem"}}
                                                            >
                                                                MotorForceApplied
                                                            </Typography>
                                                            <Chip color='secondary' label="Data dictionary"/>
                                                            <Chip color='warning' label="Draft"/>
                                                        </li>
                                                    </ul>
                                                </Box>
                                            }


                                            <Box>
                                                <ListSubheader
                                                    component="div"
                                                    style={{
                                                        position: 'static',
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "space-between",
                                                    }}
                                                >
                                                    <Typography
                                                        sx={{
                                                            color: '#676C74',
                                                            fontSize: "0.75rem",
                                                            fontWeight: 500,
                                                            lineHeight: "1.125rem",
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
                                                                    sx={{width: 1, height: 1, padding: "0.625rem"}}
                                                                >
                                                                    {option?.label?.length > 100 ? option?.label.slice(0, 100) + "..." : option?.label}
                                                                </Typography>
                                                                {isOptionSelected(option) ?
                                                                    <CheckIcon color="#070808"/> : null}
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
                                        borderTop: `0.0625rem solid ${gray100}`,
                                        height: '2.75rem',

                                        '& .MuiButton-root': {
                                            color: gray500,
                                            fontSize: "0.875rem",
                                            fontWeight: 600,
                                            height: '100%',
                                            lineHeight: "1.25rem",
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
                                        startIcon={<AddIcon/>}
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
                            <NoResultField noResultReason={noResultReason}/>
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
