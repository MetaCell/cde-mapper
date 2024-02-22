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
import {useCdeContext} from "../../../CdeContext.ts";
import {PairingTooltip} from "./PairingTooltip.tsx";
import {PairingSuggestion} from "./PairingSuggestion.tsx";
import {EntityType, Option, SelectableCollection} from "../../../models.ts";
import {getId, getType} from "../../../helpers/getters.ts";
import Tour from "../../common/Tour.tsx";
import { tutorial, TourSteps } from "../../common/tutorial.tsx";

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

    const {datasetMapping, headerIndexes, collections, handleUpdateDatasetMappingRow, isTourOpen} = useCdeContext();
    const [visibleRows, setVisibleRows] = useState([]);
    const [selectableCollections, setSelectableCollections] = useState<SelectableCollection[]>([]);
    const [searchResultsDictionary, setSearchResultsDictionary] = useState<{ [id: string]: Option }>({});
    const [stepIndex, setStepIndex] = useState(0);
    const [togglePreview, setTogglePreview] = useState(false);


    useEffect(() => {
        // Initialize the selected collections state
        const initialSelectedCollections = Object.keys(collections).map(key => ({
            id: key,
            name: collections[key].name,
            selected: key === defaultCollection
        }));

        setSelectableCollections(initialSelectedCollections);
    }, [collections, defaultCollection]);

    const handleTourNextStepClick = () => {
        if(isTourOpen){
            setStepIndex((prevStepIndex) => prevStepIndex + 1)
        }
    };

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

                    setSearchResultsDictionary(prev => ({...prev, ...searchResultsDictionary}));

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
        const option = searchResultsDictionary[optionId];
        if (option) {
            handleUpdateDatasetMappingRow(variableName, newIsSelectedState ? option.content : []);
        } else {
            console.error("Option not found: " + optionId);
        }
    }


    const handleFiltering = () => {
        // TODO: to implement
        console.log("To be implemented " + visibleRows)
        setVisibleRows([])
    }

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
            case EntityType.CustomDataDictionary:
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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const getPairingSuggestions = (key: string) => {
        return []
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const hasPairingSuggestions = (key: string) => {
        return false
    };

    const searchText = "Search in " + (selectableCollections.length === 1 ? `${selectableCollections[0].name} collection` : 'multiple collections');

    return (
        <Box className='mapping-step'>
            <ModalHeightWrapper pb={10} height='15rem'>
                <MappingSearch onChange={handleFiltering} handleTourNextStepClick={handleTourNextStepClick}/>

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
                            {Object.keys(datasetMapping).map((variableName, index) => (
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
                                            handleTourNextStepClick={handleTourNextStepClick}
                                            options={{
                                                searchPlaceholder: searchText,
                                                noResultReason: "We couldn’t find any results.",
                                                onSearch: searchInCollections,
                                                onSelection: (optionId, newIsSelectedState) => handleSelection(variableName, optionId, newIsSelectedState),
                                                collections: selectableCollections,
                                                onCollectionSelect: handleCollectionSelect,
                                                value: searchResultsDictionary[getId(datasetMapping[variableName], headerIndexes)] || null
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

            <PreviewBox togglePreview={togglePreview} setTogglePreview={setTogglePreview} handleTourNextStepClick={handleTourNextStepClick}/>
            <Tour
                steps={tutorial[TourSteps.Mapping]}
                stepIndex={stepIndex}
                setStepIndex={setStepIndex}
                // isSpotlightOpen={togglePreview}
                // handleSpotlightClose={() => setTogglePreview(false)}
            />
        </Box>
    )
}

export default MappingTab;