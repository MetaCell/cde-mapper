import {PropsWithChildren, useMemo, useState} from 'react';
import {DatasetMapping, Entity, InitParams, STEPS} from "./models.ts";
import theme from "./theme/index.tsx";
import {ThemeProvider} from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';
import {validateDatasetMapping,} from "./services/validatorsService.ts";
import {mapStringTableToDatasetMapping} from "./services/initialMappingService.ts";
import {updateDatasetMappingRow} from "./services/updateMappingService.ts";
import ErrorPage from "./components/ErrorPage.tsx";
import {ABBREVIATION_INDEX, INTERLEX_ID_INDEX, TITLE_INDEX, VARIABLE_NAME_INDEX} from "./settings.ts";
import {CdeContext} from './CdeContext.ts';
import {computeSuggestions} from "./services/suggestionsService.ts";
import { tutorial, TourSteps } from './components/common/tutorial.tsx';


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
                                       collections,
                                       config,
                                       name,
                                       callback,
                                       children
                                   }: PropsWithChildren<InitParams>) => {

    const [step, setStep] = useState(STEPS.HOME);
    const [loadingMessage, setLoadingMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [tourSteps, setTourSteps] = useState(tutorial);
    const [tourStepName, setTourStepName] = useState<keyof TourSteps>("home");

    const headerMapping = useMemo(() => ({
        ...defaultHeaderMapping,
        ...providedHeaderMapping
    }), [providedHeaderMapping]);


    // Process and validate datasetMapping
    const [initialDatasetMapping, initialDatasetMappingHeader, areFilesValid] = useMemo(() => {
        let localDatasetMapping = {};
        let localDatasetMappingHeader: string[] = [];
        let localAreFilesValid = true;

        if (rawDatasetMapping && rawDatasetMapping.length > 0) {
            try {
                validateDatasetMapping(rawDatasetMapping, headerMapping.variableNameIndex);
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
        collections,
        config,
        step,
        setStep,
        loadingMessage,
        setLoadingMessage,
        errorMessage,
        setErrorMessage,
        handleClose,
        tourSteps,
        setTourSteps,
        tourStepName,
        setTourStepName
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
