import {createContext, PropsWithChildren, useContext, useState} from 'react';
import {
    CDE,
    Collection,
    Config,
    CustomDictionaryField,
    DatasetMapping,
    InitParams,
    STEPS
} from "./models.ts";
import theme from "./theme/index.tsx";
import {ThemeProvider} from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';
import {
    validateDatasetMapping,
} from "./services/validatorsService.ts";
import {mapStringTableToDatasetMapping} from "./services/initialMappingService.ts";
import {updateDatasetMappingRow} from "./services/updateMappingService.ts";

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
                                       additionalDatasetMappings: rawAdditionalDatasetMappings,
                                       collections,
                                       config,
                                       name,
                                       callback,
                                       children
                                   }: PropsWithChildren<InitParams>) => {


    // Process and validate datasetMapping
    let initialDatasetMapping;
    let initialDatasetMappingHeader;
    // TODO: initialDatasetMapping can be optional
    try {
        validateDatasetMapping(rawDatasetMapping);
        const datasetMappingData = mapStringTableToDatasetMapping(rawDatasetMapping);
        initialDatasetMapping = datasetMappingData[0]
        initialDatasetMappingHeader = datasetMappingData[1]
    } catch (error) {
        const message = error instanceof Error ? error.message : 'An unknown error occurred';
        const errorMessage = `Invalid dataset mapping: ${message}`
        console.error(errorMessage);
        // TODO: No throw, just move to a exit step
        throw new Error(errorMessage);
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
