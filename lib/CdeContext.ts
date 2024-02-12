import {createContext, useContext, Dispatch, SetStateAction} from "react";
import {
    Collection,
    Config,
    DatasetMapping, Entity,
    HeaderMapping,
    Suggestions
} from "./models.ts";
import {ABBREVIATION_INDEX, INTERLEX_ID_INDEX, TITLE_INDEX, VARIABLE_NAME_INDEX} from "./settings.ts";
import { TutorialSteps } from "./components/common/tutorial.tsx";

export const CdeContext = createContext<{

    name: string;
    datasetSample: string[][];
    datasetMapping: DatasetMapping;
    datasetMappingHeader: string[];
    handleUpdateDatasetMappingRow: (key: string, newData: Entity) => void;
    getSuggestions: () => Suggestions;
    headerMapping: HeaderMapping;
    collections: Collection[];
    config: Config;


    // UI Module
    step: number;
    setStep: (step: number) => void;
    loadingMessage: string | null;
    setLoadingMessage: (loadingMessage: string | null) => void;
    errorMessage: string | null;
    setErrorMessage: (errorMessage: string | null) => void;
    handleClose: () => void;
    tutorialSteps: TutorialSteps,
    setTutorialSteps: Dispatch<SetStateAction<TutorialSteps>>;
    tutorialStep: keyof TutorialSteps;
    setTutorialStep: Dispatch<SetStateAction<keyof TutorialSteps>>;
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
    headerMapping: {
        variableNameIndex: VARIABLE_NAME_INDEX,
        preciseAbbreviationIndex: ABBREVIATION_INDEX,
        titleIndex: TITLE_INDEX,
        interlexIdIndex: INTERLEX_ID_INDEX,
    },
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
    tutorialSteps: {
        home: {
            run: false,
            stepIndex: 0,
            steps: []
        },
        collection: {
            run: false,
            stepIndex: 0,
            steps: []
        },
        suggestions: {
            run: false,
            stepIndex: 0,
            steps: []
        },
        mapping: {
            run: false,
            stepIndex: 0,
            steps: []
        }
    },
    setTutorialSteps: () => {
    },
    tutorialStep: 'home',
    setTutorialStep: () => {
    }
});

export const useCdeContext = () => useContext(CdeContext);