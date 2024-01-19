import {FC, useEffect} from 'react';
import {Snackbar} from '@mui/material';
import Home from "./steps/Home.tsx";
import {useCdeContext} from "../CdeContext.tsx";
import {STEPS} from "../models.ts";
import Modal from './common/Modal.tsx'
import MappingStep from './steps/MappingStep.tsx';
import TemplateStep from './steps/TemplateStep.tsx';

const CdeModal: FC = () => {
    const {step, errorMessage,
        setErrorMessage, handleClose, isOpen} = useCdeContext();

    useEffect(() => {
        if (errorMessage) {
            const timer = setTimeout(() => {
                setErrorMessage(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [errorMessage, setErrorMessage]);

    const renderStepComponent = () => {
        switch (step) {
            case STEPS.HOME:
                return <Home/>;
            case STEPS.REPOSITORY:
                return <MappingStep/>;
            // Add cases for other steps
            default:
                return <TemplateStep/>
        }
    };


    return (
        <>
            <Modal open={isOpen} onClose={handleClose} maxWidth="xl">
                {renderStepComponent()}
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
