import {createContext, PropsWithChildren, useContext, useState} from 'react';
import {Config, CDEMapping, InitParams, InputMappingRow, STEPS, DatasetRow} from "./models.ts";
import theme from "./theme/index.tsx";
import {ThemeProvider} from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';

export const CdeContext = createContext<{
    // Inputs Module
    labName: string;
    config: Config;
    mappings: InputMappingRow[];
    datasetSample: DatasetRow[];

    // Data Module
    cdeMapping: CDEMapping;
    setCDEMapping: (mapping: CDEMapping) => void;

    // UI Module
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
}>({
    labName: '',
    config: {
        width: "100%",
        height: "100%",
    },
    datasetSample: [],
    mappings: [],
    cdeMapping: {} as CDEMapping,
    setCDEMapping: () => {},
    step: 0,
    setStep: () => {},
    loadingMessage: null,
    setLoadingMessage: () => {},
    errorMessage: null,
    setErrorMessage: () => {},
    isOpen: true,
    handleClose: () => { },
    infoOpen: false,
    setInfoOpen: () => {}
});

export const useCdeContext = () => useContext(CdeContext);

export const CdeContextProvider = ({children, labName, callback, mappings, datasetSample, config}: PropsWithChildren<InitParams>) => {
    const [cdeMapping, setCDEMapping] = useState<CDEMapping>({});
    const [step, setStep] = useState<number>(STEPS.HOME);
    const [loadingMessage, setLoadingMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [isOpen, setIsOpen] = useState<boolean>(true)
    const [infoOpen, setInfoOpen] = useState<boolean>(false)


    const handleClose = () => {
        callback(null);
        setIsOpen(false)
    };


    // Context value
    const contextValue = {
        config,
        labName,
        mappings: mappings,
        datasetSample: datasetSample,
        step,
        setStep,
        loadingMessage,
        setLoadingMessage,
        errorMessage,
        setErrorMessage,
        cdeMapping,
        setCDEMapping,
        isOpen,
        handleClose,
        infoOpen,
        setInfoOpen
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
