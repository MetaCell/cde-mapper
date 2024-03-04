import React, {useState} from 'react';
import {STEPS} from "../../models.ts";
import {UIContext} from './UIContext.ts';
import {useServicesContext} from "../services/ServicesContext.ts";


export const UIContextProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {

    const {
        onClose,
    } = useServicesContext();

    const [step, setStep] = useState(STEPS.HOME);
    const [loadingMessage, setLoadingMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);



    const handleClose = () => {
        setErrorMessage(null);
        setLoadingMessage(null);
        onClose()
    };


    const contextValue = {
        step,
        setStep,
        loadingMessage,
        setLoadingMessage,
        errorMessage,
        setErrorMessage,
        handleClose
    };

    return (
        <UIContext.Provider value={contextValue}>
            {children}
        </UIContext.Provider>
    );
};
