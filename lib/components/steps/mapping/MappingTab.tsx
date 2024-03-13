import {useCallback, useEffect, useState} from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Chip, ChipProps,
    TextField,
    Typography
} from "@mui/material"
import ModalHeightWrapper from "../../common/ModalHeightWrapper.tsx"
import {
    ArrowIcon,
    BulletIcon,
    PairIcon,
    SortIcon
} from "../../../icons";
import CustomEntitiesDropdown from "../../common/CustomMappingDropdown.tsx";
import PreviewBox from "../../common/PreviewBox.tsx";
import MappingSearch from "./MappingSearch.tsx";
import {useDataContext} from "../../../contexts/data/DataContext.ts";
import {PairingTooltip} from "./PairingTooltip.tsx";
import {PairingSuggestion} from "./PairingSuggestion.tsx";
import {EntityType, Option, SelectableCollection} from "../../../models.ts";
import {getId, getType, isRowMapped} from "../../../helpers/getters.ts";
import {useServicesContext} from "../../../contexts/services/ServicesContext.ts";
import {useUIContext} from "../../../contexts/ui/UIContext.ts";
import Tour from "../../common/Tour.tsx";
import { tutorial, TourSteps } from "../../common/tutorial.tsx";
import {mapRowToOption} from "../../../helpers/mappers.ts";

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


interface MappingProps {
    defaultCollection: string;
}


const MappingTab = ({defaultCollection}: MappingProps) => {

    const {datasetMapping, headerIndexes, collections, datasetMappingHeader} = useDataContext();
    const {updateDatasetMappingRow} = useServicesContext();
    const {isTourOpen} = useUIContext();

    const [visibleRows, setVisibleRows] = useState<string[]>([]);
    const [selectableCollections, setSelectableCollections] = useState<SelectableCollection[]>([]);
    const [stepIndex, setStepIndex] = useState(0);
    const [togglePreview, setTogglePreview] = useState(false);
    const [optionsMap, setOptionsMap] = useState<{ [id: string]: Option }>({});


    useEffect(() => {
        const initialSelectedCollections = Object.keys(collections).map(key => ({
            id: key,
            name: collections[key].name,
            selected: key === defaultCollection
        }));

        setSelectableCollections(initialSelectedCollections);
    }, [collections, defaultCollection]);

    const handleTourNextStepClick = () => isTourOpen && setStepIndex(prevStepIndex => prevStepIndex + 1);
    
    useEffect(() => {
        const initialSearchResults = Object.keys(datasetMapping).reduce((acc, variableName) => {
            const row = datasetMapping[variableName];
            if (isRowMapped(row, headerIndexes)) {
                const option = mapRowToOption(row, datasetMappingHeader, headerIndexes);
                acc[option.id] = option;
            }
            return acc;
        }, {} as { [id: string]: Option });


        setOptionsMap(initialSearchResults);
    }, [datasetMapping, datasetMappingHeader, headerIndexes]);



    const handleCollectionSelect = (selectedCollection: SelectableCollection) => {
        setSelectableCollections(prevCollections =>
            prevCollections.map(collection => {
                if (collection.id === selectedCollection.id) {
                    // Toggle the 'selected' state
                    return {...collection, selected: !collection.selected};
                } else {
                    return collection;
                }
            })
        );
    };


    const searchInCollections = useCallback(
        async (queryString: string): Promise<Option[]> => {
            const selectedCollections = selectableCollections
                .filter(collection => collection.selected)
                .map(collection => collections[collection.id]);

            try {
                const fetchPromises = selectedCollections.map(async (collection) => {
                    const searchResults = await collection.fetch(queryString);

                    const searchResultsDictionary = searchResults.reduce((acc, option) => {
                        acc[option.id] = option;
                        return acc;
                    }, {} as { [id: string]: Option });

                    setOptionsMap(prev => ({...prev, ...searchResultsDictionary}));

                    return searchResults;
                });
                const results = await Promise.all(fetchPromises);
                return results.flat();
            } catch (error) {
                console.error("Error searching collections:", error);
                return [];
            }
        },
        [selectableCollections, collections]
    );

    const handleSelection = (variableName: string, optionId: string, newIsSelectedState: boolean) => {
        const option = optionsMap[optionId];
        if (option) {
            updateDatasetMappingRow(variableName, newIsSelectedState ? option.content : []);
        } else {
            console.error("Option not found: " + optionId);
        }
    }


    const handleFiltering = useCallback((searchTerm: string) => {
        const filteredData = Object.keys(datasetMapping).filter(variableName => {
            const variableNameMatch = variableName.toLowerCase().includes(searchTerm.toLowerCase());
            const preciseAbbreviation = datasetMapping[variableName][headerIndexes.preciseAbbreviation] || '';
            const preciseAbbreviationMatch = preciseAbbreviation.toLowerCase().includes(searchTerm.toLowerCase());

            return variableNameMatch || preciseAbbreviationMatch;
        });
        setVisibleRows(filteredData);
    }, [datasetMapping, headerIndexes]);

    const getChipComponent = (key: string) => {
        const row = datasetMapping[key];
        const entityType = getType(row, headerIndexes);

        let label: string;
        let color: ChipProps['color'];
        let iconColor: string;

        switch (entityType) {
            case EntityType.CDE:
                label = "Mapped to CDE";
                color = "success";
                iconColor = "#12B76A";
                break;
            case EntityType.CustomDictionaryField:
                label = "Mapped to Custom Data Dictionary";
                color = "success";
                iconColor = "#346DDB";
                break;
            default:
                label = "Unmapped";
                color = "default";
                iconColor = "#676C74";
                break;
        }

        return (
            <Chip
                label={label}
                size="small"
                color={color}
                icon={<BulletIcon color={iconColor}/>}
            />
        );
    };

    const getPairingSuggestions = (key: string) => {
        void key
        return []
    };

    const hasPairingSuggestions = (key: string) => {
        void key
        return false
    };

    const onPreviewBoxToggle = () => {
        setTogglePreview(!togglePreview)
        handleTourNextStepClick();
    }

    const searchText = "Search in " + (selectableCollections.length === 1 ? `${selectableCollections[0].name} collection` : 'multiple collections');


    return (
        <Box className='mapping-step'>
            <ModalHeightWrapper pb={10} height='15rem'>
                <MappingSearch onChange={handleFiltering} onAfterChange={handleTourNextStepClick}/>

                <Box px={1.5}>
                    <Box sx={styles.root}>
                        <Box sx={styles.head}>
                            <Box sx={styles.col}>
                                <SortIcon className="mapping__sort-icon"/>
                            </Box>
                            <Box sx={styles.col}>
                                <Typography>Column headers from dataset</Typography>
                                <SortIcon/>
                            </Box>
                            <Box sx={styles.col}/>
                            <Box sx={styles.col}>
                                <Typography>CDEs/ Data Dictionary fields</Typography>
                                <SortIcon/>
                            </Box>
                        </Box>
                        <Box sx={styles.wrap}>
                            {visibleRows.map((variableName, index) => (
                                <Box key={index} sx={styles.row}>
                                    <Box sx={styles.col} className="mapping-chip">
                                        {getChipComponent(variableName)}
                                    </Box>
                                    <Box sx={styles.col} className="mapping__column-header">
                                        <TextField
                                            disabled
                                            fullWidth
                                            value={variableName}
                                        />
                                    </Box>
                                    <Box sx={styles.col}>
                                        <ArrowIcon/>
                                    </Box>
                                    <Box sx={styles.col} className="cde-fields__item-first">
                                        <CustomEntitiesDropdown
                                            placeholder={"Choose CDE or Data Dictionary fields... "}
                                            options={{
                                                searchPlaceholder: searchText,
                                                noResultReason: "We couldn’t find any results.",
                                                onSearch: searchInCollections,
                                                onSelection: (optionId, newIsSelectedState) => handleSelection(variableName, optionId, newIsSelectedState),
                                                collections: selectableCollections,
                                                onCollectionSelect: handleCollectionSelect,
                                                onDropdownToggle: handleTourNextStepClick,
                                                dropdownClassname: "cde-field__popper",
                                                value: optionsMap[getId(datasetMapping[variableName], headerIndexes)]
                                            }}/>
                                    </Box>

                                    {hasPairingSuggestions(variableName) && (
                                        <Box sx={styles.row}>
                                            <Accordion>
                                                <AccordionSummary>
                                                    <PairIcon/>
                                                    <Typography sx={{
                                                        fontSize: '0.75rem',
                                                        color: '#4F5359',
                                                        fontWeight: 500,
                                                        lineHeight: '150%'
                                                    }}>Pairing suggestions</Typography>
                                                    <PairingTooltip datasetMapping={datasetMapping} key={variableName}
                                                                    headerMapping={headerIndexes}/>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <Box pl='2.5625rem'>
                                                        {getPairingSuggestions(variableName).map(() => (
                                                            <PairingSuggestion
                                                                value='0'
                                                                onChange={() => {
                                                                }}
                                                                selectOptions={[]}
                                                                subjectName="To be implemented"
                                                                subjectDescription="To be implemented"
                                                            />
                                                        ))}
                                                    </Box>
                                                </AccordionDetails>
                                            </Accordion>
                                        </Box>
                                    )}
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Box>
            </ModalHeightWrapper>

            <PreviewBox togglePreview={togglePreview} onToggle={onPreviewBoxToggle}/>
            <Tour
                steps={tutorial[TourSteps.Mapping]}
                stepIndex={stepIndex}
                setStepIndex={setStepIndex}
            />
        </Box>
    )
}

export default MappingTab;