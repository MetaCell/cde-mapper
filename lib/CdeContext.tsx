import {createContext, PropsWithChildren, useContext, useState} from 'react';
import {CDE, Collection, Config, CustomDictionaryField, DatasetMapping, InitParams, STEPS} from "./models.ts";
import theme from "./theme/index.tsx";
import {ThemeProvider} from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';
import {validateDatasetMapping,} from "./services/validatorsService.ts";
import {mapStringTableToDatasetMapping} from "./services/initialMappingService.ts";
import {updateDatasetMappingRow} from "./services/updateMappingService.ts";
import ErrorPage from "./components/ErrorPage.tsx";
import {ABBREVIATION_INDEX, INTERLEX_INDEX, VARIABLE_NAME_INDEX} from "./settings.ts";

export const CdeContext = createContext<{

    name: string;
    datasetSample: string[][];
    datasetMapping: DatasetMapping;
    datasetMappingHeader: string[];
    collections: Collection[]
    config: Config


    // UI Module
    step: number;
    setStep: (step: number) => void;
    loadingMessage: string | null;
    setLoadingMessage: (loadingMessage: string | null) => void;
    errorMessage: string | null;
    setErrorMessage: (errorMessage: string | null) => void;
    handleClose: () => void;
}>({

    name: '',
    datasetSample: [],
    datasetMapping: {},
    datasetMappingHeader: [],
    collections: [],
    config: {
        width: "100%",
        height: "100%",
    },

    step: 0,
    setStep: () => {
    },
    loadingMessage: null,
    setLoadingMessage: () => {
    },
    errorMessage: null,
    setErrorMessage: () => {
    },
    handleClose: () => {
    },
});

export const useCdeContext = () => useContext(CdeContext);

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
    let areFilesValid = true;

    // Process and validate datasetMapping
    let initialDatasetMapping: DatasetMapping = {};
    let initialDatasetMappingHeader: string[] = [];

    if (rawDatasetMapping && rawDatasetMapping.length > 0) {
        try {
            validateDatasetMapping(rawDatasetMapping);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'An unknown error occurred';
            const errorMessage = `Invalid dataset mapping: ${message}`
            console.error(errorMessage);
            areFilesValid = false;
        }
        const datasetMappingData = mapStringTableToDatasetMapping(rawDatasetMapping, headerMapping);
        initialDatasetMapping = datasetMappingData[0]
        initialDatasetMappingHeader = datasetMappingData[1]
    }

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
    console.log(additionalDatasetMappings)

    const [datasetMapping, setDatasetMapping] = useState<DatasetMapping>(initialDatasetMapping);
    const [datasetMappingHeader, setDatasetMappingHeader] = useState<string[]>(initialDatasetMappingHeader);

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
