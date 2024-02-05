import {PropsWithChildren, useMemo, useState} from 'react';
import {CDE, CustomDictionaryField, DatasetMapping, InitParams, STEPS} from "./models.ts";
import theme from "./theme/index.tsx";
import {ThemeProvider} from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';
import {validateDatasetMapping,} from "./services/validatorsService.ts";
import {mapStringTableToDatasetMapping} from "./services/initialMappingService.ts";
import {updateDatasetMappingRow} from "./services/updateMappingService.ts";
import ErrorPage from "./components/ErrorPage.tsx";
import {ABBREVIATION_INDEX, INTERLEX_INDEX, VARIABLE_NAME_INDEX} from "./settings.ts";
import {CdeContext} from './CdeContext.ts';
import {computeMappingFrequency} from "./services/suggestionsService.ts";


export const CdeContextProvider = ({
                                       datasetSample,
                                       datasetMapping: rawDatasetMapping,
                                       additionalDatasetMappings: rawAdditionalDatasetMappings = [],
                                       headerMapping = {
                                           variableNameIndex: VARIABLE_NAME_INDEX,
                                           preciseAbbreviationIndex: ABBREVIATION_INDEX,
                                           interlexIdIndex: INTERLEX_INDEX,
                                       },
                                       collections,
                                       config,
                                       name,
                                       callback,
                                       children
                                   }: PropsWithChildren<InitParams>) => {

    const [step, setStep] = useState(STEPS.HOME);
    const [loadingMessage, setLoadingMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // Process and validate datasetMapping
    const [initialDatasetMapping, initialDatasetMappingHeader, areFilesValid] = useMemo(() => {
        let localDatasetMapping = {};
        let localDatasetMappingHeader : string[] = [];
        let localAreFilesValid = true;

        if (rawDatasetMapping && rawDatasetMapping.length > 0) {
            try {
                validateDatasetMapping(rawDatasetMapping);
            } catch (error) {
                const message = error instanceof Error ? error.message : 'An unknown error occurred';
                const errorMessage = `Invalid dataset mapping: ${message}`;
                console.error(errorMessage);
                localAreFilesValid = false;
            }
            const datasetMappingData = mapStringTableToDatasetMapping(rawDatasetMapping, headerMapping);
            localDatasetMapping = datasetMappingData[0];
            localDatasetMappingHeader = datasetMappingData[1]
        }

        return [localDatasetMapping, localDatasetMappingHeader, localAreFilesValid];
    }, [rawDatasetMapping, headerMapping]);


    const [datasetMapping, setDatasetMapping] = useState<DatasetMapping>(initialDatasetMapping);
    const [datasetMappingHeader, setDatasetMappingHeader] = useState<string[]>(initialDatasetMappingHeader);


    const additionalDatasetMappings: DatasetMapping[] = rawAdditionalDatasetMappings.map((additionalMapping, index) => {
        try {
            validateDatasetMapping(additionalMapping);
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

    const mappingFrequency = useMemo(() => {
        return computeMappingFrequency(initialDatasetMapping, additionalDatasetMappings, headerMapping);
    }, [initialDatasetMapping, additionalDatasetMappings, headerMapping]);

    const getSuggestions = () => {
        return mappingFrequency
    };


    const handleClose = () => {
        setErrorMessage(null);
        setLoadingMessage(null);
        callback(datasetMapping)
    };

    const handleUpdateDatasetMappingRow = (key: string, newData: CDE | CustomDictionaryField) => {
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
        collections,
        config,
        step,
        setStep,
        loadingMessage,
        setLoadingMessage,
        errorMessage,
        setErrorMessage,
        handleClose
    };
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            {areFilesValid ? (
                <CdeContext.Provider value={contextValue}>
                    {children}
                </CdeContext.Provider>
            ) : <ErrorPage/>}

        </ThemeProvider>

    );
};
