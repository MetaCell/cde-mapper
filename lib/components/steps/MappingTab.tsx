import {useEffect, useState} from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Chip, ChipProps,
    TextField,
    Typography
} from "@mui/material"
import ModalHeightWrapper from "../common/ModalHeightWrapper"
import {
    ArrowIcon,
    BulletIcon,
    PairIcon,
    SortIcon
} from "../../icons";
import CustomEntitiesDropdown, {Option} from "../common/CustomMappingDropdown.tsx";
import PreviewBox from "../common/PreviewBox";
import MappingSearch from "./Mapping/MappingSearch.tsx";
import {useCdeContext} from "../../CdeContext.ts";
import {getOptionFromEntity, getTypeFromRow} from "../../helpers/functions.ts";
import {PairingTooltip} from "./Mapping/PairingTooltip.tsx";
import {PairingSuggestion} from "./Mapping/PairingSuggestion.tsx";
import {EntityType, SelectableCollection} from "../../models.ts";

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

    const {datasetMapping, headerMapping, collections} = useCdeContext();
    const [visibleRows, setVisibleRows] = useState([]);
    const [selectableCollections, setSelectableCollections] = useState<SelectableCollection[]>([]);

    useEffect(() => {
        // Initialize the selected collections state
        const initialSelectedCollections = Object.keys(collections).map(key => ({
            id: key,
            name: collections[key].name,
            selected: key === defaultCollection
        }));

        setSelectableCollections(initialSelectedCollections);
    }, [collections, defaultCollection]);


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


    const handleFiltering = () => {
        // TODO: to implement
        console.log("To be implemented " + visibleRows)
        setVisibleRows([])
    }

    const getChipComponent = (key: string) => {
        const row = datasetMapping[key];
        const type = getTypeFromRow(row, headerMapping);
        let label: string;
        let color: ChipProps['color'];
        let iconColor: string;


        switch (type) {
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

    const getPairingSuggestions = (key: string) => {
        // TODO: to implement
        console.log("To be implemented " + key)
        return []
    };

    const hasPairingSuggestions = (key: string) => {
        // TODO: to implement
        console.log("To be implemented " + key)
        return false
    };

    const searchInCollections = async (queryString: string): Promise<Option[]> => {
        const selectedCollections = selectableCollections
            .filter(collection => collection.selected)
            .map(collection => collections[collection.id]);

        try {
            const fetchPromises = selectedCollections.map(async (collection) => {
                    const entities = await collection.fetch(queryString);
                    return entities.map(entity => getOptionFromEntity(entity, collection.name))
                }
            );

            const results = await Promise.all(fetchPromises);

            return results.flat();

        } catch (error) {
            console.error("Error searching collections:", error);
            return []
        }
    }

    const searchText = "Search in " + (selectableCollections.length === 1 ? `${selectableCollections[0].name} collection` : 'multiple collections');

    // FIXME: CustomMappingDropdown is triggering a search for each field on mount
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
                            {Object.keys(datasetMapping).map((key, index) => (
                                <Box key={index} sx={styles.row}>
                                    <Box sx={styles.col}>
                                        {getChipComponent(key)}
                                    </Box>
                                    <Box sx={styles.col}>
                                        <TextField
                                            disabled
                                            fullWidth
                                            value={key}
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
                                                onSearch: (queryString) => searchInCollections(queryString),
                                                collections: selectableCollections,
                                                onCollectionSelect: handleCollectionSelect,
                                                value: null,
                                            }}/>
                                    </Box>

                                    {hasPairingSuggestions(key) && (
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
                                                    <PairingTooltip datasetMapping={datasetMapping} key={key}
                                                                    headerMapping={headerMapping}/>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <Box pl='2.5625rem'>
                                                        {getPairingSuggestions(key).map(() => (
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

            <PreviewBox/>
        </>
    )
}

export default MappingTab;