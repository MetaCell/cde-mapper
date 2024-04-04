import React, { Fragment, useState, useEffect, useCallback } from 'react';
import { Box, Typography, Button, Stack, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import CustomEntitiesDropdown from '../common/CustomMappingDropdown.tsx';
import ModalHeightWrapper from '../common/ModalHeightWrapper.tsx';
import { SelectableCollection, Option } from '../../models.ts';
import { useDataContext } from '../../contexts/data/DataContext.ts';
import { useServicesContext } from '../../contexts/services/ServicesContext.ts';
import { getCustomDictionaryFieldSelectableCollection } from '../../services/customDictionaryFieldService.ts';
import { CUSTOM_DICTIONARY_FIELD_COLLECTION_ID } from '../../settings.ts';
import { usePairingSuggestions } from '../../hooks/usePairingSuggestions.ts';
import { PairingTooltip } from './mapping/PairingTooltip.tsx';
import { PairingSuggestion } from './mapping/PairingSuggestion.tsx';
import { optionDetailsToCdeDetails, getAbbreviationFromOption, getDescriptionFromOption } from '../../helpers/optionsHelpers.ts';
import { mapRowToOption } from '../../helpers/mappers.ts';
import { isRowMapped } from '../../helpers/rowHelpers.ts';
import { PlusIcon, PairIcon } from '../../icons/index.tsx';
import { vars } from '../../theme/variables.ts';
const { gray100, gray500, gray600 } = vars

function TemplateStep() {
    const [dropdowns, setDropdowns] = React.useState([1]);

    const { datasetMapping, headerIndexes, collections, datasetMappingHeader } = useDataContext();
    const { updateDatasetMappingRow, getUnmappedVariableNames, searchCustomDictionaryFields } = useServicesContext();
    const collectionKeys = Object.keys(collections);
    const defaultCollection = collectionKeys.length > 0 ? collectionKeys[0] : '';

    const {
        updateAvailableSuggestions,
        getPairingSuggestions,
        hasPairingSuggestions,
        markSuggestionAsProcessed,
    } = usePairingSuggestions();

    const [selectableCollections, setSelectableCollections] = useState<SelectableCollection[]>([]);
    const [selectedOptionsMap, setSelectedOptionsMap] = useState<{ [id: string]: Option }>({});
    const [createdCustomDictionaryFields, setCreatedCustomDictionaryFields] = useState<{ [id: string]: Option }>({});

    useEffect(() => {
        const initialSelectedCollections = Object.keys(collections).map(key => ({
            id: key,
            name: collections[key].name,
            selected: key === defaultCollection
        }));

        setSelectableCollections([...initialSelectedCollections, getCustomDictionaryFieldSelectableCollection()]);
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


        setSelectedOptionsMap(initialSearchResults);
    }, [datasetMapping, datasetMappingHeader, headerIndexes]);


    const handleCollectionSelect = (selectedCollection: SelectableCollection) => {
        setSelectableCollections(prevCollections =>
            prevCollections.map(collection => {
                if (collection.id === selectedCollection.id) {
                    // Toggle the 'selected' state
                    return { ...collection, selected: !collection.selected };
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

            try {
                const fetchPromises = selectedCollections.map(async (collection) => {
                    if (collection.id === CUSTOM_DICTIONARY_FIELD_COLLECTION_ID) {
                        return searchCustomDictionaryFields(queryString, createdCustomDictionaryFields)
                    } else {
                        return await collections[collection.id].fetch(queryString);
                    }

                });
                const results = await Promise.all(fetchPromises);
                return results.flat();
            } catch (error) {
                console.error("Error searching collections:", error);
                return [];
            }
        },
        [selectableCollections, collections, createdCustomDictionaryFields, searchCustomDictionaryFields]
    );

    const handleSelection = async (variableName: string, option: Option, newIsSelectedState: boolean) => {

        if (option && newIsSelectedState) {
            // Update optionsMap with the new selected option
            setSelectedOptionsMap(prevOptionsMap => ({
                ...prevOptionsMap,
                [option.id]: option,
            }));

            updateDatasetMappingRow(variableName, option.content);

            // Get all selected collections
            const selectedCollections = selectableCollections
                .filter(collection => collection.selected)

            // Fetch pairing suggestions from all selected collections
            let aggregatedPairingSuggestions: Option[] = [];
            for (const selectableCollection of selectedCollections) {
                const collection = collections[selectableCollection.id]
                if (collection && collection.getPairingSuggestions) {
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
    };

    const onCustomDictionaryFieldCreation = async (variableName: string, option: Option, newIsSelectedState: boolean) => {
        setCreatedCustomDictionaryFields(prev => ({
            ...prev,
            [option.id]: option,
        }));
        await handleSelection(variableName, option, newIsSelectedState)
    };

    const addAnotherField = () => {
        setDropdowns(prevDropdowns => {
            return [...prevDropdowns, prevDropdowns.length + 1]
        })
    };

    const searchText = "Search in " + (selectableCollections.length === 1 ? `${selectableCollections[0].name} collection` : 'multiple collections');
    
    return (
        <>
            <ModalHeightWrapper height="15rem">
                <Box p={1.5} display="flex" flexDirection="column" gap={6}>
                    <Stack>
                        <Typography variant='h6'>Create template</Typography>
                        <Typography sx={{ color: gray600, fontSize: '0.875rem', mt: "0.25rem" }}>Generate a template with CDEs or data dictionary fields before data collection for accurate mapping. Start by selecting CDEs to create template with.</Typography>
                    </Stack>

                    <Stack spacing={3}>
                        <Box mt={6} py={1.5} sx={{ borderBottom: `1px solid ${gray100}` }}>
                            <Typography variant='caption' sx={{ color: gray500 }}>CDE / Data Dictionary field</Typography>
                        </Box>
                        {
                            dropdowns.map((dropdownIndex) => (
                                <Fragment key={dropdownIndex}>
                                    <CustomEntitiesDropdown
                                        placeholder={"Choose CDE or Data Dictionary fields... "}
                                        options={{
                                            searchPlaceholder: searchText,
                                            noResultReason: "We couldn’t find any results.",
                                            onSearch: searchInCollections,
                                            onSelection: (option, newIsSelectedState) => handleSelection("", option, newIsSelectedState),
                                            collections: selectableCollections,
                                            onCollectionSelect: handleCollectionSelect,
                                            value: null,
                                        }}
                                        variableName={""}
                                        onCustomDictionaryFieldCreation={(option, newIsSelectedState) => onCustomDictionaryFieldCreation("", option, newIsSelectedState)}
                                    />
                                    {hasPairingSuggestions("") && (
                                        <Box
                                            display="flex"
                                            sx={{
                                                boxSizing: 'border-box',
                                                columnGap: '1.5rem',
                                                flexWrap: 'wrap',
                                                padding: '1.5rem 0',
                                                borderBottom: '0.0625rem solid #ECEDEE',
                                            }}
                                        >
                                            <Accordion>
                                                <AccordionSummary>
                                                    <PairIcon />
                                                    <Typography sx={{
                                                        fontSize: '0.75rem',
                                                        color: '#4F5359',
                                                        fontWeight: 500,
                                                        lineHeight: '150%'
                                                    }}>Pairing suggestions</Typography>
                                                    <PairingTooltip />
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <Box pl='2.5625rem'>
                                                        {getPairingSuggestions("").map((suggestion) => {
                                                            const headerOptions = getUnmappedVariableNames().map((label, index) => ({
                                                                label,
                                                                index
                                                            }));

                                                            const rowContent = optionDetailsToCdeDetails(suggestion.content);
                                                            const abbreviation = getAbbreviationFromOption(suggestion, headerIndexes);
                                                            const description = getDescriptionFromOption(suggestion);

                                                            return (
                                                                <PairingSuggestion
                                                                    key={suggestion.id}
                                                                    onChange={(selectedColumn) => handlePairingSuggestion("", suggestion, selectedColumn)}
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
                                </Fragment>
                            ))
                        }

                        <Button
                            variant='text'
                            startIcon={<PlusIcon />}
                            sx={{ maxWidth: '10.875rem', '&:hover': { backgroundColor: 'transparent', color: gray500 } }}
                            onClick={addAnotherField}
                        >
                            Add another field
                        </Button>
                    </Stack>
                </Box>
            </ModalHeightWrapper>
        </>
    );
}

export default TemplateStep;