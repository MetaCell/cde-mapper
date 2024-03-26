import {useCallback, useEffect, useState} from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    TextField,
    Typography
} from "@mui/material"
import ModalHeightWrapper from "../../common/ModalHeightWrapper.tsx"
import {
    ArrowIcon,
    PairIcon,
    SortIcon
} from "../../../icons";
import CustomEntitiesDropdown from "../../common/CustomMappingDropdown.tsx";
import PreviewBox from "../../common/PreviewBox.tsx";
import MappingSearch from "./MappingSearch.tsx";
import {useDataContext} from "../../../contexts/data/DataContext.ts";
import {PairingTooltip} from "./PairingTooltip.tsx";
import {PairingSuggestion} from "./PairingSuggestion.tsx";
import {Option, SelectableCollection, FiltersState} from "../../../models.ts";
import {getId, getPreciseAbbreviation, getType, isRowMapped} from "../../../helpers/getters.ts";
import {useServicesContext} from "../../../contexts/services/ServicesContext.ts";
import {mapRowToOption} from "../../../helpers/mappers.ts";
import {usePairingSuggestions} from "../../../hooks/usePairingSuggestions.ts";
import {
    getAbbreviationFromOption,
    getDescriptionFromOption,
    optionDetailsToCdeDetails
} from "../../../helpers/optionsHelper.ts";
import {getCustomDictionaryFieldCollection} from "../../../helpers/customDictionaryFieldCollection.ts";
import ChipComponent, {getChipComponent} from "./ChipComponent.tsx";

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
    const {updateDatasetMappingRow, getUnmappedVariableNames} = useServicesContext();
    const {
        updateAvailableSuggestions,
        getPairingSuggestions,
        hasPairingSuggestions,
        markSuggestionAsProcessed,
    } = usePairingSuggestions();

    const [visibleRows, setVisibleRows] = useState<string[]>([]);
    const [selectableCollections, setSelectableCollections] = useState<SelectableCollection[]>([]);
    const [optionsMap, setOptionsMap] = useState<{ [id: string]: Option }>({});


    useEffect(() => {
        const initialSelectedCollections = Object.keys(collections).map(key => ({
            id: key,
            name: collections[key].name,
            selected: key === defaultCollection
        }));

        setSelectableCollections([...initialSelectedCollections, getCustomDictionaryFieldCollection()]);
    }, [collections, defaultCollection]);

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

    const handleSelection = async (variableName: string, option: Option, newIsSelectedState: boolean) => {
        if (option && newIsSelectedState) {
            updateDatasetMappingRow(variableName, option.content);

            // Get all selected collections
            const selectedCollections = selectableCollections
                .filter(collection => collection.selected)
                .map(collection => collections[collection.id]);

            // Fetch pairing suggestions from all selected collections
            let aggregatedPairingSuggestions: Option[] = [];
            for (const collection of selectedCollections) {
                if (collection.getPairingSuggestions) {
                    const pairingSuggestions: Option[] = await collection.getPairingSuggestions(option.id);
                    aggregatedPairingSuggestions = [...aggregatedPairingSuggestions, ...pairingSuggestions];
                }
            }
            updateAvailableSuggestions(variableName, aggregatedPairingSuggestions);
        } else if (option && !newIsSelectedState) {
            updateAvailableSuggestions(variableName, []);
            updateDatasetMappingRow(variableName, []);

        } else {
            console.error("No option provided");
        }
    };

    const handlePairingSuggestion = (variableName: string, suggestion: Option, selectedColumn: string | null) => {
        markSuggestionAsProcessed(variableName, suggestion.id);
        if (selectedColumn !== null) {
            updateDatasetMappingRow(selectedColumn, suggestion.content);
        }
    }

    const handleFiltering = useCallback((searchTerm: string, checked: FiltersState) => {
        const allTrue = Object.values(checked).every(value => value === true);

        const filteredData = Object.keys(datasetMapping).filter(variableName => {
            const variableNameMatch = variableName.toLowerCase().includes(searchTerm.toLowerCase());
            const row = datasetMapping[variableName]
            const preciseAbbreviation = row[headerIndexes.preciseAbbreviation] || '';
            const preciseAbbreviationMatch = preciseAbbreviation.toLowerCase().includes(searchTerm.toLowerCase());

            const entityType = getType(row, headerIndexes);
            const isAnyTrue = Object.values(checked).some(value => value === true);

            if (isAnyTrue && !allTrue) {
                return checked[entityType];
            }

            return variableNameMatch || preciseAbbreviationMatch;
        });
        setVisibleRows(filteredData);
    }, [datasetMapping, headerIndexes]);


    const onCustomDictionaryFieldCreation = async (variableName: string, option: Option) => {
        // Update optionsMap with the new custom dictionary field
        setOptionsMap(prevOptionsMap => ({
            ...prevOptionsMap,
            [option.id]: option,
        }));

        // Select the newly created option
        await handleSelection(variableName, option, true);
    }


    const searchText = "Search in " + (selectableCollections.length === 1 ? `${selectableCollections[0].name} collection` : 'multiple collections');

    return (
        <>
            <ModalHeightWrapper pb={10} height='15rem'>
                <MappingSearch onChange={handleFiltering}/>

                <Box px={1.5}>
                    <Box sx={styles.root}>
                        <Box sx={styles.head}>
                            <Box sx={styles.col}>
                                <SortIcon/>
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
                                    <Box sx={styles.col}>
                                        <ChipComponent variableName={variableName}/>
                                    </Box>
                                    <Box sx={styles.col}>
                                        <TextField
                                            disabled
                                            fullWidth
                                            value={variableName}
                                        />
                                    </Box>
                                    <Box sx={styles.col}>
                                        <ArrowIcon/>
                                    </Box>
                                    <Box sx={styles.col}>
                                        <CustomEntitiesDropdown
                                            placeholder={"Choose CDE or Data Dictionary fields... "}
                                            options={{
                                                searchPlaceholder: searchText,
                                                noResultReason: "We couldn’t find any results.",
                                                onSearch: searchInCollections,
                                                onSelection: (optionId, newIsSelectedState) => handleSelection(variableName, optionsMap[optionId], newIsSelectedState),
                                                collections: selectableCollections,
                                                onCollectionSelect: handleCollectionSelect,
                                                value: optionsMap[getId(datasetMapping[variableName], headerIndexes)]
                                            }}
                                            variableName={variableName}
                                            onCustomDictionaryFieldCreation={(option) => onCustomDictionaryFieldCreation(variableName, option)}
                                        />
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
                                                    <PairingTooltip
                                                        selectedCdeAbbreviation={getPreciseAbbreviation(datasetMapping[variableName], headerIndexes)}/>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <Box pl='2.5625rem'>
                                                        {getPairingSuggestions(variableName).map((suggestion) => {
                                                            const headerOptions = getUnmappedVariableNames().map((label, index) => ({
                                                                label,
                                                                index
                                                            }));

                                                            const rowContent = optionDetailsToCdeDetails(suggestion.content);
                                                            const abbreviation = getAbbreviationFromOption(suggestion.content);
                                                            const description = getDescriptionFromOption(suggestion.content);

                                                            return (
                                                                <PairingSuggestion
                                                                    key={suggestion.id}
                                                                    onChange={(selectedColumn) => handlePairingSuggestion(variableName, suggestion, selectedColumn)}
                                                                    headerOptions={headerOptions}
                                                                    label={abbreviation}
                                                                    description={description}
                                                                    rowContent={rowContent}
                                                                />
                                                            );
                                                        })}
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

            <PreviewBox/>
        </>
    )
}

export default MappingTab;