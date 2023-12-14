import {createContext, PropsWithChildren, useContext, useState} from 'react';
import {Config, DatasetCDEMapping, InitParams} from "./models.ts";
import theme from "./theme.ts";
import {ThemeProvider} from "@mui/material";

export const CdeContext = createContext({
    mapping: {} as DatasetCDEMapping,
    setMapping: (_mapping: DatasetCDEMapping) => {
    },
    labName: '',
    step: 0,
    setStep: (_step: number) => {
    },
    loadingMessage: null as string | null,
    setLoadingMessage: (_loadingMessage: string | null) => {
    },
    errorMessage: null as string | null,
    setErrorMessage: (_errorMessage: string | null) => {
    },
    config: {
        width: "100%",
        height: "100%",
    } as Config
});

export const useCdeContext = () => useContext(CdeContext);

export const CdeContextProvider = ({children, labName, config}: PropsWithChildren<InitParams>) => {
    const [mapping, setMapping] = useState<DatasetCDEMapping>({});
    const [step, setStep] = useState<number>(0);
    const [loadingMessage, setLoadingMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    // Context value
    const contextValue = {
        config,
        labName,
        step,
        setStep,
        loadingMessage,
        setLoadingMessage,
        errorMessage,
        setErrorMessage,
        mapping,
        setMapping
    };

    return (
        <ThemeProvider theme={theme}>
            <CdeContext.Provider value={contextValue}>
                {children}
            </CdeContext.Provider>
        </ThemeProvider>

    );
};
