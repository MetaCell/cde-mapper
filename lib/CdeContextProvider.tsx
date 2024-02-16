import {PropsWithChildren, useMemo, useState} from 'react';
import {Collection, DatasetMapping, Entity, InitParams, STEPS} from "./models.ts";
import theme from "./theme/index.tsx";
import {ThemeProvider} from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';
import {validateDataset, validateDatasetMapping,} from "./services/validatorsService.ts";
import {mapStringTableToDatasetMapping} from "./services/initialMappingService.ts";
import {updateDatasetMappingRow} from "./services/updateMappingService.ts";
import ErrorPage from "./components/ErrorPage.tsx";
import {ABBREVIATION_INDEX, INTERLEX_ID_INDEX, TITLE_INDEX, VARIABLE_NAME_INDEX} from "./settings.ts";
import {CdeContext} from './CdeContext.ts';
import {computeSuggestions} from "./services/suggestionsService.ts";


const defaultHeaderMapping = {
    variableNameIndex: VARIABLE_NAME_INDEX,
    preciseAbbreviationIndex: ABBREVIATION_INDEX,
    titleIndex: TITLE_INDEX,
    interlexIdIndex: INTERLEX_ID_INDEX,
};

export const CdeContextProvider = ({
                                       datasetSample,
                                       datasetMapping: rawDatasetMapping,
                                       additionalDatasetMappings: rawAdditionalDatasetMappings = [],
                                       headerMapping: providedHeaderMapping = defaultHeaderMapping,
                                       collections: rawCollections,
                                       config,
                                       name,
                                       callback,
                                       children
                                   }: PropsWithChildren<InitParams>) => {

    const [step, setStep] = useState(STEPS.HOME);
    const [loadingMessage, setLoadingMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const headerMapping = useMemo(() => {
        // Check if rawDatasetMapping is provided and has content
        if (!rawDatasetMapping || rawDatasetMapping.length === 0) {
            return defaultHeaderMapping;
        }
        // Merge providedHeaderMapping with defaultHeaderMapping if rawDatasetMapping is valid
        return {
            ...defaultHeaderMapping,
            ...providedHeaderMapping
        };
    }, [providedHeaderMapping, rawDatasetMapping]);



    // validate dataset sample

    const isDatasetInvalid = useMemo(() => {
        let tmpIsDatasetInvalid = false;

        try {
            validateDataset(datasetSample);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'An unknown error occurred';
            const errorMessage = `Invalid dataset: ${message}`;
            console.error(errorMessage);
            tmpIsDatasetInvalid = true;
        }

        return tmpIsDatasetInvalid;
    }, [datasetSample]);

    // Process and validate datasetMapping
    const [initialDatasetMapping, initialDatasetMappingHeader, isDatasetMappingInvalid] = useMemo(() => {
        let tmpDatasetMapping = {};
        let tmpDatasetHeader: string[] = [];

        try {
            validateDatasetMapping(rawDatasetMapping, headerMapping.variableNameIndex);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'An unknown error occurred';
            const errorMessage = `Invalid dataset mapping: ${message}`;
            console.error(errorMessage);
            return [tmpDatasetMapping, tmpDatasetHeader, true]
        }
        const datasetHeader = datasetSample[0]
        const datasetMappingData = mapStringTableToDatasetMapping(rawDatasetMapping, headerMapping, datasetHeader);

        tmpDatasetMapping = datasetMappingData[0];
        tmpDatasetHeader = datasetMappingData[1]

        return [tmpDatasetMapping, tmpDatasetHeader, false];
    }, [rawDatasetMapping, headerMapping, datasetSample]);


    const [datasetMapping, setDatasetMapping] = useState<DatasetMapping>(initialDatasetMapping);
    const [datasetMappingHeader, setDatasetMappingHeader] = useState<string[]>(initialDatasetMappingHeader);


    const additionalDatasetMappings: DatasetMapping[] = rawAdditionalDatasetMappings.map((additionalMapping, index) => {
        try {
            validateDatasetMapping(additionalMapping, headerMapping.variableNameIndex);
        } catch (error) {
            if (error instanceof Error) {
                console.warn(`Skipping invalid additionalDatasetMapping at index ${index}: ${error.message}`);
            } else {
                console.warn(`Skipping invalid additionalDatasetMapping at index ${index}: Unknown error`);
            }
            return null;
        }
        const mappedAdditionalMappingData = mapStringTableToDatasetMapping(additionalMapping, headerMapping);
        return mappedAdditionalMappingData[0];
    }).filter(mapping => mapping !== null) as DatasetMapping[];

    const suggestions = useMemo(() => {
        return computeSuggestions(initialDatasetMapping, additionalDatasetMappings, datasetMappingHeader, headerMapping);
    }, [initialDatasetMapping, additionalDatasetMappings, datasetMappingHeader, headerMapping]);

    const getSuggestions = () => {
        return suggestions
    };

    const collectionsDictionary = useMemo(() => {
        return rawCollections.reduce((acc, collection, index) => {
            acc[collection.id] = {
                ...collection,
                suggested: index === 0 // Set 'suggested' to true for the first collection, false for others
            };
            return acc;
        }, {} as { [key: string]: Collection });
    }, [rawCollections]);

    const handleClose = () => {
        setErrorMessage(null);
        setLoadingMessage(null);
        callback(datasetMapping)
    };

    const handleUpdateDatasetMappingRow = (key: string, newData: Entity) => {
        updateDatasetMappingRow(
            key,
            newData,
            datasetMapping,
            datasetMappingHeader,
            setDatasetMapping,
            setDatasetMappingHeader
        );
    };

    const contextValue = {
        name,
        datasetSample,
        datasetMapping,
        datasetMappingHeader,
        handleUpdateDatasetMappingRow,
        getSuggestions,
        headerMapping,
        collections: collectionsDictionary,
        config,
        step,
        setStep,
        loadingMessage,
        setLoadingMessage,
        errorMessage,
        setErrorMessage,
        handleClose
    };

    const hasErrors = isDatasetInvalid || isDatasetMappingInvalid || rawCollections.length == 0
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            {hasErrors ? <ErrorPage/> : (
                <CdeContext.Provider value={contextValue}>
                    {children}
                </CdeContext.Provider>
            )}

        </ThemeProvider>

    );
};
