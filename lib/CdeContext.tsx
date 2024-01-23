import {createContext, PropsWithChildren, useContext, useState} from 'react';
import {
    CDE,
    Collection,
    Config,
    CustomDictionaryField,
    DatasetMapping,
    DatasetSample,
    InitParams,
    STEPS
} from "./models.ts";
import theme from "./theme/index.tsx";
import {ThemeProvider} from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';
import {
    validateDatasetMapping,
    validateDatasetSample
} from "./services/validatorsService.ts";
import {mapDatasetSample, mapStringTableToDatasetMapping} from "./services/initialMappingService.ts";
import {updateDatasetMappingRow} from "./services/updateMappingService.ts";

export const CdeContext = createContext<{

    name: string;
    datasetSample: DatasetSample;
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
                                       datasetSample: rawDatasetSample,
                                       datasetMapping: rawDatasetMapping,
                                       additionalDatasetMappings: rawAdditionalDatasetMappings,
                                       collections,
                                       config,
                                       name,
                                       callback,
                                       children
                                   }: PropsWithChildren<InitParams>) => {

    let datasetSample;
    // Process and validate datasetSample
    try {
        validateDatasetSample(rawDatasetSample);
        datasetSample = mapDatasetSample(rawDatasetSample);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'An unknown error occurred';
        // TODO: Check if it's fine to throw or should we show an error in the UI
        throw new Error(`Invalid dataset sample: ${message}`);
    }

    // Process and validate datasetMapping
    let initialDatasetMapping;
    let initialDatasetMappingHeader;
    try {
        validateDatasetMapping(rawDatasetMapping);
        const datasetMappingData = mapStringTableToDatasetMapping(rawDatasetMapping);
        initialDatasetMapping = datasetMappingData[0]
        initialDatasetMappingHeader = datasetMappingData[1]
    } catch (error) {
        const message = error instanceof Error ? error.message : 'An unknown error occurred';
        throw new Error(`Invalid dataset mapping: ${message}`);
    }

    const additionalDatasetMappings: DatasetMapping[] = [];
    rawAdditionalDatasetMappings.forEach((additionalMapping, index) => {
        try {
            validateDatasetMapping(additionalMapping);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const [mappedAdditionalMapping, _] = mapStringTableToDatasetMapping(additionalMapping);
            additionalDatasetMappings.push(mappedAdditionalMapping);
        } catch (error) {
            if (error instanceof Error) {
                console.warn(`Skipping invalid additionalDatasetMapping at index ${index}: ${error.message}`);
            } else {
                console.warn(`Skipping invalid additionalDatasetMapping at index ${index}: Unknown error`);
            }
        }
    });

    const [datasetMapping, setDatasetMapping] = useState<DatasetMapping>(initialDatasetMapping);
    const [datasetMappingHeader, setDatasetMappingHeader] = useState<string[]>(initialDatasetMappingHeader);

    const [step, setStep] = useState(STEPS.HOME);
    const [loadingMessage, setLoadingMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
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
            <CdeContext.Provider value={contextValue}>
                {children}
            </CdeContext.Provider>
        </ThemeProvider>

    );
};
