import React, { Fragment, useState, useEffect, useCallback } from 'react';
import { Box, Typography, Button, Stack, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import CustomEntitiesDropdown from '../../common/CustomMappingDropdown.tsx';
import ModalHeightWrapper from '../../common/ModalHeightWrapper.tsx';
import { SelectableCollection, Option } from '../../../models.ts';
import { useDataContext } from '../../../contexts/data/DataContext.ts';
import { useServicesContext } from '../../../contexts/services/ServicesContext.ts';
import { getCustomDictionaryFieldSelectableCollection } from '../../../services/customDictionaryFieldService.ts';
import { CUSTOM_DICTIONARY_FIELD_COLLECTION_ID, VARIABLE_NAME_UI } from '../../../settings.ts';
import { usePairingSuggestions } from '../../../hooks/usePairingSuggestions.ts';
import { PairingTooltip } from '../mapping/PairingTooltip.tsx';
import { PairingSuggestion } from './PairingSuggestion.tsx';
import { getType } from '../../../helpers/rowHelpers.ts';
import { optionDetailsToCdeDetails, getAbbreviationFromOption, getTitleFromOption } from '../../../helpers/optionsHelpers.ts';
import { PlusIcon, PairIcon } from '../../../icons/index.tsx';
import { vars } from '../../../theme/variables.ts';
const { gray100, gray500, gray600 } = vars


function TemplateStep({ onCloseModal }: { onCloseModal: () => void }) {
    const [visibleRows, setVisibleRows] = React.useState<Option[]>([{
        id: '',
        label: '',
        group: '',
        content: []
    }]);
    const { headerIndexes, collections, datasetMapping, datasetMappingHeader } = useDataContext();
    const { getUnmappedVariableNames, searchCustomDictionaryFields, updateDatasetMappingRowTemplate, onClose } = useServicesContext();
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
    const [visiblePairingSuggestions, setVisiblePairingSuggestions] = useState<boolean[]>([false]);
    const [acceptedSuggestions, setAcceptedSuggestions] = useState<string[]>([]);

    useEffect(() => {
        const initialSelectedCollections = Object.keys(collections).map(key => ({
            id: key,
            name: collections[key].name,
            selected: key === defaultCollection
        }));

        setSelectableCollections([...initialSelectedCollections, getCustomDictionaryFieldSelectableCollection()]);
    }, [collections, defaultCollection]);

    useEffect(() => {
        const updateState = async () => {
            setSelectedOptionsMap(prevSelectedOptionsMap => {
                const updatedOptionsMap = Object.keys(prevSelectedOptionsMap).reduce((acc, key) => {
                    const label = prevSelectedOptionsMap[key].label;
                    const found = Object.values(datasetMapping).some(arr => arr.includes(label));
                    if (found) {
                        acc[key] = prevSelectedOptionsMap[key];
                    }
                    return acc;
                }, {} as { [id: string]: Option });
                return updatedOptionsMap;
            });

            setVisibleRows(prevVisibleRows => {
                const labelsToRemove = Object.values(datasetMapping).reduce((acc, val) => acc.concat(val), []);
                const updatedVisibleRows = prevVisibleRows.length > 1
                    ? prevVisibleRows.filter(row => labelsToRemove.includes(row.label))
                    : prevVisibleRows;
                return updatedVisibleRows;
            });
        };

        updateState();
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

    const beforeHandleSelection = async (option: Option, newIsSelectedState: boolean, rowIndex: number) => {
        if (!option) {
            console.error("No option provided");
            return;
        }
        const variableName = getAbbreviationFromOption(option, headerIndexes);
        setVisibleRows(prevState => {
            const newArray = [...prevState];
            newArray[rowIndex] = option;
            return newArray;
        });
        setVisiblePairingSuggestions(prevState => prevState.map((_, index) => index === rowIndex));
        setAcceptedSuggestions(prevState => prevState.includes(option.id) ? prevState.filter(id => id !== option.id) : prevState);
        handleSelection(variableName || option.label, option, newIsSelectedState, rowIndex);
    };

    const handleSelection = async (variableName: string, option: Option, newIsSelectedState: boolean, rowIndex: number) => {
        if (option && newIsSelectedState) {
            // Update optionsMap with the new selected option
            setSelectedOptionsMap(prevOptionsMap => ({
                ...prevOptionsMap,
                [option.id]: option,
            }));

            updateDatasetMappingRowTemplate(variableName, option.content, rowIndex);

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
            const mappedIds = Object.keys(selectedOptionsMap).map(item => item.toLowerCase().replace(':', '_'));
            const filteredSuggestions = aggregatedPairingSuggestions.filter(suggestion => !mappedIds.includes(suggestion.id));
            updateAvailableSuggestions(variableName, filteredSuggestions);
        } else if (option && !newIsSelectedState) {
            // updateAvailableSuggestions(variableName, []);
            updateDatasetMappingRowTemplate(variableName, [], rowIndex);

        } else {
            console.error("No option provided");
        }
    };

    const replaceOrAddSuggestion = (suggestion: Option, emptyObjectIndex: number | -1) => {
        if (emptyObjectIndex !== -1) {
            setVisibleRows(prevState => {
                const updatedRows = [...prevState];
                updatedRows[emptyObjectIndex] = suggestion;
                return updatedRows;
            });
            return emptyObjectIndex;
        } else {
            setVisibleRows(prevState => [...prevState, suggestion]);
            return visibleRows.length; // newIndex
        }
    };

    const handlePairingSuggestion = (variableName: string, suggestion: Option, selectedColumn: string | null) => {
        if (selectedColumn !== null) {
            const emptyObjectIndex = visibleRows.findIndex(row => row.id === "" && row.label === "");
            const newIndex = replaceOrAddSuggestion(suggestion, emptyObjectIndex);
            setAcceptedSuggestions((prevAcceptedSuggestion) => [...prevAcceptedSuggestion, suggestion.id]);
            setVisiblePairingSuggestions(prevState => {
                return [...prevState, false];
            });
            setSelectedOptionsMap(prevOptionsMap => ({
                ...prevOptionsMap,
                [suggestion.id]: suggestion,
            }));
            updateDatasetMappingRowTemplate(selectedColumn || suggestion.label, suggestion.content, newIndex);
        } else {
            markSuggestionAsProcessed(variableName, suggestion.id);
        }
    };

    const onCustomDictionaryFieldCreation = async (variableName: string, option: Option, newIsSelectedState: boolean, index: number) => {
        setCreatedCustomDictionaryFields(prev => ({
            ...prev,
            [option.id]: option,
        }));
        await handleSelection(variableName, option, newIsSelectedState, index)
    };

    const getEntityType = () => {
        const row = datasetMapping[VARIABLE_NAME_UI];
        const entityType = getType(row, headerIndexes);
        return entityType;
    }

    const addAnotherField = () => {
        setVisibleRows(prevState => {
            return [...prevState, {
                id: '',
                label: '',
                group: '',
                content: []
            }];
        });
        setVisiblePairingSuggestions(prevState => {
            return [...prevState.map(() => false), false];
        });
    };

    const searchText = "Search in " + (selectableCollections.length === 1 ? `${selectableCollections[0].name} collection` : 'multiple collections');
    const hasOneEmptyItem = (
        visibleRows.reduce((count, row) => count + (row.id === '' && row.label === '' ? 1 : 0), 0) === 1 ||
        Object.keys(selectedOptionsMap).length === 0
    );
    const hasNoItems = (visibleRows.length===1 && Object.keys(selectedOptionsMap).length === 0);
    return (
        <Box display="flex" flexDirection="column" justifyContent="space-between" height={1}>
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
                            visibleRows.map((row, rowIndex) => (
                                <Fragment key={`${row.label + rowIndex}`}>
                                    <CustomEntitiesDropdown
                                        placeholder={"Choose CDE or Data Dictionary fields... "}
                                        options={{
                                            searchPlaceholder: searchText,
                                            noResultReason: "We couldn’t find any results.",
                                            onSearch: searchInCollections,
                                            onSelection: (option, newIsSelectedState) => beforeHandleSelection(option, newIsSelectedState, rowIndex),
                                            collections: selectableCollections,
                                            onCollectionSelect: handleCollectionSelect,
                                            value: selectedOptionsMap[row.id],
                                            entityType: getEntityType()
                                        }}
                                        variableName={row.label}
                                        onCustomDictionaryFieldCreation={(option, newIsSelectedState) => onCustomDictionaryFieldCreation(row.label, option, newIsSelectedState, rowIndex)}
                                    />
                                    {visiblePairingSuggestions[rowIndex] && hasPairingSuggestions(row.label) && selectedOptionsMap[row.id] && (
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
                                                        {getPairingSuggestions(row.label).filter((suggestion) => !acceptedSuggestions.includes(suggestion.id)).map((suggestion) => {
                                                            const headerOptions = getUnmappedVariableNames().map((label, index) => ({
                                                                label,
                                                                index
                                                            }));
                                                            const rowContent = optionDetailsToCdeDetails(suggestion.content);
                                                            const abbreviation = getAbbreviationFromOption(suggestion, headerIndexes);
                                                            const title = getTitleFromOption(suggestion, headerIndexes);

                                                            return (
                                                                <PairingSuggestion
                                                                    key={suggestion.id}
                                                                    onChange={(selectedColumn) => handlePairingSuggestion(row.label, suggestion, selectedColumn)}
                                                                    headerOptions={headerOptions}
                                                                    label={abbreviation}
                                                                    title={title}
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
                        <Box width={1} justifyContent="start">
                            <Button
                                variant='text'
                                startIcon={<PlusIcon />}
                                sx={{ '&:hover': { backgroundColor: 'transparent', color: gray500 } }}
                                onClick={addAnotherField}
                                disabled={hasOneEmptyItem}
                            >
                                Add another field
                            </Button>
                        </Box>
                    </Stack>
                </Box>
            </ModalHeightWrapper>
            <Box px={3} py={2} display="flex" justifyContent="end" gap={1} sx={{ borderTop: '1px solid #ECEDEE' }}>
                <Button variant='text' onClick={onCloseModal}>Cancel</Button>
                <Button variant='contained' onClick={onClose} disabled={hasNoItems}>Create template</Button>
            </Box>
        </Box>
    );
}

export default TemplateStep;