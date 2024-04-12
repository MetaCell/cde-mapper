import {createContext, useContext} from "react";
export const UIContext = createContext<{

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
    isTourOpen: false,
    setIsTourOpen: () => {
    }
});

export const useUIContext = () => useContext(UIContext);