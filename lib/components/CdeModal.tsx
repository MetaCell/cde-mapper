import {FC, ReactElement, useEffect, useState} from 'react';
import {Snackbar} from '@mui/material';
import Home from "./steps/Home.tsx";
import {STEPS} from "../models.ts";
import Modal from './common/Modal.tsx'
import MappingStep from './steps/mapping/MappingStep.tsx';
import TemplateStep from './steps/TemplateStep.tsx';
import Header from "./common/Header.tsx";
import {CommonCircularProgress} from "./common/CommonCircularProgress.tsx";
import {useUIContext} from "../contexts/ui/UIContext.ts";

const CdeModal: FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [isInfoOpen, setIsInfoOpen] = useState(false);

    const {step, errorMessage, setErrorMessage, loadingMessage, handleClose} = useUIContext();

    const onClose = () => {
        setIsModalOpen(false)
        handleClose()
    }

    useEffect(() => {
        if (errorMessage) {
            const timer = setTimeout(() => {
                setErrorMessage(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [errorMessage, setErrorMessage]);

    const renderStepComponent = (): ReactElement => {
        switch (step) {
            case STEPS.HOME:
                return <Home/>;
            case STEPS.COLLECTION:
                return <MappingStep/>;
            // Add cases for other steps
            default:
                return <TemplateStep/>
        }
    };

    return (
        <>
            <Modal open={isModalOpen} onClose={onClose} maxWidth="xl" isInfoOpen={isInfoOpen}>
                <Header onClose={onClose} isInfoOpen={isInfoOpen} setIsInfoOpen={setIsInfoOpen} step={step}/>
                {loadingMessage ? <CommonCircularProgress label='Processing data...'/> : renderStepComponent()}
            </Modal>
            <Snackbar
                open={!!errorMessage}
                message={errorMessage}
                anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
            />
        </>
    );
};

export default CdeModal;
