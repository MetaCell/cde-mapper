import React, {useState} from 'react';
import {STEPS} from "../../models.ts";
import {UIContext} from './UIContext.ts';
import {useServicesContext} from "../services/ServicesContext.ts";
import {useDataContext} from '../data/DataContext.ts';
import { localStorageTourKey } from '../../settings.ts';


export const UIContextProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {

    const {
        onClose,
    } = useServicesContext();

    const {
        datasetSample
    } = useDataContext();
    const isDatasetSampleEmpty = datasetSample.length === 0;
    const [step, setStep] = useState(isDatasetSampleEmpty ? -1 : STEPS.HOME);
    const [loadingMessage, setLoadingMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const checked = JSON.parse(localStorage.getItem(localStorageTourKey) || 'false');
    const [isTourOpen, setIsTourOpen] = useState<boolean>(!checked);



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
        handleClose,
        isTourOpen,
        setIsTourOpen
    };

    return (
        <UIContext.Provider value={contextValue}>
            {children}
        </UIContext.Provider>
    );
};
