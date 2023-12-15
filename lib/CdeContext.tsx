import {createContext, PropsWithChildren, useContext, useState} from 'react';
import {Config, DatasetCDEMapping, InitParams, STEPS} from "./models.ts";
import theme from "./theme.ts";
import {ThemeProvider} from "@mui/material";

export const CdeContext = createContext({
    labName: '',
    config: {
        width: "100%",
        height: "100%",
    } as Config,
    cdeFileMapping: null as File | null,
    mapping: {} as DatasetCDEMapping,
    setMapping: (_mapping: DatasetCDEMapping) => {},
    step: 0,
    setStep: (_step: number) => {},
    loadingMessage: null as string | null,
    setLoadingMessage: (_loadingMessage: string | null) => {},
    errorMessage: null as string | null,
    setErrorMessage: (_errorMessage: string | null) => {},
    isOpen: true,
    handleClose: () => {}
});

export const useCdeContext = () => useContext(CdeContext);

export const CdeContextProvider = ({children, labName, callback, cdeFileMapping, config}: PropsWithChildren<InitParams>) => {
    const [mapping, setMapping] = useState<DatasetCDEMapping>({});
    const [step, setStep] = useState<number>(STEPS.HOME);
    const [loadingMessage, setLoadingMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [isOpen, setIsOpen] = useState<boolean>(true)


    const handleClose = () => {
        callback(null);
        setIsOpen(false)
    };


    // Context value
    const contextValue = {
        config,
        labName,
        cdeFileMapping,
        step,
        setStep,
        loadingMessage,
        setLoadingMessage,
        errorMessage,
        setErrorMessage,
        mapping,
        setMapping,
        isOpen,
        handleClose
    };


    return (
        <ThemeProvider theme={theme}>
            <CdeContext.Provider value={contextValue}>
                {children}
            </CdeContext.Provider>
        </ThemeProvider>

    );
};
