import {createContext, PropsWithChildren, useContext, useState} from 'react';
import {Config, DatasetCDEMapping, InitParams, InputMapping, STEPS} from "./models.ts";
import theme from "./theme/index.tsx";
import {ThemeProvider} from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';

export const CdeContext = createContext<{
    labName: string;
    config: Config;
    inputMappings: InputMapping[][];
    mapping: DatasetCDEMapping;
    setMapping: (mapping: DatasetCDEMapping) => void;
    step: number;
    setStep: (step: number) => void;
    loadingMessage: string | null;
    setLoadingMessage: (loadingMessage: string | null) => void;
    errorMessage: string | null;
    setErrorMessage: (errorMessage: string | null) => void;
    isOpen: boolean;
    handleClose: () => void;
    infoOpen: boolean;
    setInfoOpen: (open: boolean) => void;
    tutorialStepIndex: number;
    setTutorialStepIndex: (tutorialStepIndex: number) => void;
    runTutorial: boolean;
    setRunTutorial: (runTutorial: boolean) => void;
}>({
    labName: '',
    config: {
        width: "100%",
        height: "100%",
    },
    inputMappings: [],
    mapping: {} as DatasetCDEMapping,
    setMapping: () => {},
    step: 0,
    setStep: () => {},
    loadingMessage: null,
    setLoadingMessage: () => {},
    errorMessage: null,
    setErrorMessage: () => {},
    isOpen: true,
    handleClose: () => { },
    infoOpen: false,
    setInfoOpen: () => {},
    tutorialStepIndex: 0,
    setTutorialStepIndex: () => {},
    runTutorial: false,
    setRunTutorial: () => {}
});

export const useCdeContext = () => useContext(CdeContext);

export const CdeContextProvider = ({children, labName, callback, inputMappings, config}: PropsWithChildren<InitParams>) => {
    const [mapping, setMapping] = useState<DatasetCDEMapping>({});
    const [step, setStep] = useState<number>(STEPS.HOME);
    const [loadingMessage, setLoadingMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [isOpen, setIsOpen] = useState<boolean>(true)
    const [infoOpen, setInfoOpen] = useState<boolean>(false)
    const [tutorialStepIndex, setTutorialStepIndex] = useState<number>(0);
    const [runTutorial, setRunTutorial] = useState<boolean>(false);

    const handleClose = () => {
        callback(null);
        setIsOpen(false)
    };


    // Context value
    const contextValue = {
        config,
        labName,
        inputMappings,
        step,
        setStep,
        loadingMessage,
        setLoadingMessage,
        errorMessage,
        setErrorMessage,
        mapping,
        setMapping,
        isOpen,
        handleClose,
        infoOpen,
        setInfoOpen,
        tutorialStepIndex,
        setTutorialStepIndex,
        runTutorial,
        setRunTutorial
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
