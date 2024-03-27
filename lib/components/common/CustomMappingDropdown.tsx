import React, {useContext, useEffect, useState} from 'react';
import {nanoid} from 'nanoid';
import {InputAdornment, ListSubheader, Popper, Tooltip} from "@mui/material";
import {TextField, Box, Typography, Button, Chip} from '@mui/material';
import {AddIcon, CheckIcon, ChevronDown, GlobeIcon, MagnifyGlassIcon} from "../../icons";
import HoveredOptionContent from "./HoveredOptionContent.tsx";
import {vars} from '../../theme/variables.ts';
import SearchCollectionSelector from "../steps/mapping/SearchCollectionSelector.tsx";
import {Option, OptionDetail, SelectableCollection} from "../../models.ts";
import CircularProgress from "@mui/material/CircularProgress";
import CreateCustomDictionaryFieldBody from "./CreateCustomDictionaryFieldBody.tsx";
import {
    CUSTOM_DATA_FIELD_CDE_LEVEL,
    CUSTOM_DICTIONARY_FIELD_OPTIONS_GROUP,
} from '../../settings.ts';
import {CreateCustomDictionaryFieldHeader} from "./CreateCustomDictionaryFieldHeader.tsx";
import {DataContext} from "../../contexts/data/DataContext.ts";
import NoResultField from "./NoResultField.tsx";
import {useUIContext} from "../../contexts/ui/UIContext.ts";
import {getAbbreviationFromOption} from "../../helpers/optionsHelpers.ts";
import { isCustomDictionaryValid } from '../../services/validatorsService.ts';

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


interface Header {
    label: string;
    values: string[];
}

interface CustomEntitiesDropdownProps {
    placeholder?: string;
    options: {
        errors?: string;
        searchPlaceholder?: string;
        noResultReason?: string;
        onSearch: (searchValue: string) => Promise<Option[]>;
        onSelection: (option: Option, newIsSelectedState: boolean) => void;
        value: Option | null;
        header?: Header;
        collections: SelectableCollection[];
        onCollectionSelect: (collection: SelectableCollection) => void;
    };
    variableName: string
    onCustomDictionaryFieldCreation: (option: Option, newIsSelectedState: boolean) => void;

}

type GroupedOptions = {
    [group: string]: Option[];
};


export default function CustomEntitiesDropdown({
                                                   placeholder,
                                                   options: {
                                                       errors,
                                                       searchPlaceholder,
                                                       noResultReason,
                                                       onSearch,
                                                       onSelection,
                                                       value,
                                                       header,
                                                       collections,
                                                       onCollectionSelect,
                                                   },
                                                   variableName,
                                                   onCustomDictionaryFieldCreation,
                                               }: CustomEntitiesDropdownProps) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    const [toggleCustomView, setToggleCustomView] = useState(false)

    const [hoveredOption, setHoveredOption] = useState<Option | null>(null);
    const [selectedOptions, setSelectedOptions] = useState<Option[]>(value ? [value] : []);
    const [searchResults, setSearchResults] = useState<Option[]>([]);
    const [searchInput, setSearchInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const {datasetMappingHeader, headerIndexes} = useContext(DataContext);
    const {setErrorMessage} = useUIContext();


    const getCustomDictionaryFieldOption = () => {
        const customDictionaryFieldId = nanoid();
        const initialCustomDictionaryFieldOption: Option = {
            id: customDictionaryFieldId,
            label: '',
            group: CUSTOM_DICTIONARY_FIELD_OPTIONS_GROUP,
            content: datasetMappingHeader.map((header): OptionDetail => ({
                title: header,
                value: '',
            })),
        };

        // Set specific fields directly using headerIndexes
        initialCustomDictionaryFieldOption.content[headerIndexes.variableName].value = variableName;
        initialCustomDictionaryFieldOption.content[headerIndexes.id].value = customDictionaryFieldId;
        initialCustomDictionaryFieldOption.content[headerIndexes.cdeLevel].value = CUSTOM_DATA_FIELD_CDE_LEVEL;
        initialCustomDictionaryFieldOption.content[headerIndexes.title].value = '';
        initialCustomDictionaryFieldOption.content[headerIndexes.preciseAbbreviation].value = '';

        // Update state
        return initialCustomDictionaryFieldOption
    };

    const [customDictionaryFieldOption, setCustomDictionaryFieldOption] = useState<Option>(getCustomDictionaryFieldOption());


    const handleCustomDictionaryOptionChange = (index: number, value: string) => {
        setCustomDictionaryFieldOption(prevOption => ({
            ...prevOption,
            content: prevOption.content.map((detail, detailIndex) =>
                detailIndex === index ? {...detail, value} : detail
            ),
        }));
    };

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    useEffect(() => {
        setSelectedOptions(value ? [value] : []);
    }, [value]);

    useEffect(() => {
        if (!open) {
            return;
        }

        const fetchOptions = async () => {
            if (searchInput !== undefined) {
                try {
                    const options = await onSearch(searchInput);
                    setSearchResults(options);
                } catch (error) {
                    console.error('Error fetching search options:', error);
                    setSearchResults([]);
                }
            }
        };

        setIsLoading(true);
        fetchOptions().then(() => setIsLoading(false));
    }, [searchInput, onSearch, open]);

    const groupedOptions = searchResults.reduce((grouped: GroupedOptions, option: Option) => {
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
        onSelection(option, !isOptionAlreadySelected)
    };


    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(event.target.value);
    };

    const isOptionSelected = (option: Option) => {
        return selectedOptions.some((selected) => selected.id === option.id);
    };

    const onCustomDictionaryFieldClose = (isConfirm: boolean) => {
        if (isConfirm) {
            if(isCustomDictionaryValid(customDictionaryFieldOption, headerIndexes)){
                customDictionaryFieldOption.label = getAbbreviationFromOption(customDictionaryFieldOption, headerIndexes)
                onCustomDictionaryFieldCreation(customDictionaryFieldOption, true);
            }else{
                setErrorMessage("Missing at least one mandatory property (title or abbreviation) ")
            }
        }

        // Reset view and custom dictionary field option to initial state
        setToggleCustomView(false);
        setCustomDictionaryFieldOption(getCustomDictionaryFieldOption())
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
                        {selectedOptions?.map((option) => (
                            <Box
                                key={option.id}
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
                sx={{
                    height: "21.875rem",
                    borderRadius: '0.5rem',
                    border: `0.0625rem solid ${gray100}`,
                    background: baseWhite,
                    boxShadow: '0 0.5rem 0.5rem -0.25rem rgba(7, 8, 8, 0.03), 0 1.25rem 1.5rem -0.25rem rgba(7, 8, 8, 0.08)',
                    m: '0.25rem 0  !important',
                    width: searchResults.length > 0 ? '55.5rem' : '27.75rem',
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
                            height: searchResults.length > 0 ? '2.75rem' : 'auto',
                            padding: searchResults.length > 0 ? '0 0.875rem' : '0.875rem'
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
                <Box display='flex' flex={1} height={searchResults.length > 0 ? 'calc(100% - 2.75rem)' : 'auto'}>
                    {searchResults.length > 0 && (!toggleCustomView ?
                            (<Box sx={styles.details}>
                                {searchResults.length > 0 && (hoveredOption ? (
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
                                    entity={customDictionaryFieldOption}
                                    padding={0}
                                    BodyComponent={({entity}) => (
                                        <CreateCustomDictionaryFieldBody
                                            entity={entity}
                                            onBlur={handleCustomDictionaryOptionChange}
                                            variableNameIndex={headerIndexes.variableName}
                                            idIndex={headerIndexes.id}
                                            cdeLevelIndex={headerIndexes.cdeLevel}
                                        />
                                    )}
                                    HeaderComponent={() => (
                                        <CreateCustomDictionaryFieldHeader
                                            onClose={onCustomDictionaryFieldClose}
                                        />
                                    )}
                                />
                            </Box>)
                    )}

                    <Box sx={{
                        ...styles.list,
                        width: searchResults.length > 0 ? '40%' : '100%'
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
                                value={searchInput}
                                onChange={handleSearchChange}
                                placeholder={searchPlaceholder}
                                InputProps={{
                                    startAdornment: <InputAdornment
                                        position='start'><MagnifyGlassIcon/>
                                    </InputAdornment>
                                }}
                            />
                        </Box>
                        {isLoading ? (
                            <Box
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                sx={{height: "100%"}}
                            >
                                <CircularProgress/>
                            </Box>
                        ) : (
                            <>
                                <Box overflow='auto' height='calc(100% - (2.75rem + 3.125rem))'
                                     sx={{
                                         '& .MuiListSubheader-root': {
                                             padding: '0 0.625rem',
                                             height: '1.875rem',
                                             margin: '0.375rem 0 0.125rem',
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
                                     }}>
                                    <SearchCollectionSelector collections={collections}
                                                              onCollectionSelect={onCollectionSelect}/>
                                    {Object.keys(groupedOptions).length > 0 ? Object.keys(groupedOptions).map((group) => (
                                        <Box sx={{
                                            padding: '0 0.375rem',
                                            '& .MuiButton-root': {
                                                padding: 0,
                                                height: '1.625rem',
                                                width: '5.0625rem',
                                                fontSize: '0.75rem',
                                                lineHeight: '1.125rem',
                                                fontWeight: 600,
                                                color: darkBlue
                                            },
                                        }}
                                             key={group}>
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
                                                        <li className="highlighted">
                                                            <Typography
                                                                sx={{width: 1, height: 1, padding: "0.625rem"}}
                                                            >
                                                                {variableName}
                                                            </Typography>
                                                            <Chip color='secondary' label="Data dictionary"/>
                                                            <Chip color='warning' label="Draft"/>
                                                        </li>
                                                    </ul>
                                                </Box>
                                            }

                                            <Box>
                                                <ul>
                                                    {groupedOptions[group]
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
                                    )) : <NoResultField noResultReason={noResultReason}/>}
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
