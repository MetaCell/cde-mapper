import {createContext, useContext} from "react";
import {
    Collection,
    Config,
    DatasetMapping,
    HeaderIndexes, OptionDetail,
    Suggestions
} from "./models.ts";
import {ABBREVIATION_INDEX, INTERLEX_ID_INDEX, TITLE_INDEX, VARIABLE_NAME_INDEX} from "./settings.ts";

export const CdeContext = createContext<{

    name: string;
    datasetSample: string[][];
    datasetMapping: DatasetMapping;
    datasetMappingHeader: string[];
    handleUpdateDatasetMappingRow: (key: string, newData: OptionDetail[]) => void;
    getSuggestions: () => Suggestions;
    headerIndexes: HeaderIndexes;
    collections: { [key: string]: Collection };
    config: Config;


    // UI Module
    step: number;
    setStep: (step: number) => void;
    loadingMessage: string | null;
    setLoadingMessage: (loadingMessage: string | null) => void;
    errorMessage: string | null;
    setErrorMessage: (errorMessage: string | null) => void;
    handleClose: () => void;
    isTourOpen: boolean;
    setIsTourOpen: (isTourOpen: boolean) => void;
}>({

    name: '',
    datasetSample: [],
    datasetMapping: {},
    datasetMappingHeader: [],
    handleUpdateDatasetMappingRow: () => {
    },
    getSuggestions: () => {
        return {}
    },
    headerIndexes: {
        variableName: VARIABLE_NAME_INDEX,
        preciseAbbreviation: ABBREVIATION_INDEX,
        title: TITLE_INDEX,
        interlexId: INTERLEX_ID_INDEX,
    },
    collections: {},
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
    isTourOpen: true,
    setIsTourOpen: () => {}
});

export const useCdeContext = () => useContext(CdeContext);