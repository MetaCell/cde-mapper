import {FC, ReactElement, useEffect, useState, Dispatch, SetStateAction} from 'react';
import {Snackbar} from '@mui/material';
import Home from "./steps/Home.tsx";
import {STEPS} from "../models.ts";
import Modal from './common/Modal.tsx'
import MappingStep from './steps/mapping/MappingStep.tsx';
import TemplateStep from './steps/TemplateStep.tsx';
import Header from "./common/Header.tsx";
import {useCdeContext} from "../CdeContext.ts";
import {CommonCircularProgress} from "./common/CommonCircularProgress.tsx";

const CdeModal: FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [isInfoOpen, setIsInfoOpen] = useState(false);
    const [homeStepIndex, setHomeStepIndex] = useState(0);

    const {step, errorMessage, setErrorMessage, loadingMessage, handleClose, isTourOpen, setIsTourOpen} = useCdeContext();

    const onClose = () => {
        setIsModalOpen(false)
        handleClose()
    }

    const handleTourNextStepClick = () => {
        if(isTourOpen){
            setHomeStepIndex((prevStepIndex) => prevStepIndex + 1)
        }
    }

    useEffect(() => {
        if (errorMessage) {
            const timer = setTimeout(() => {
                setErrorMessage(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [errorMessage, setErrorMessage]);

    const renderStepComponent = (homeStepIndex: number, setHomeStepIndex: Dispatch<SetStateAction<number>>): ReactElement => {
        switch (step) {
            case STEPS.HOME:
                return <Home homeStepIndex={homeStepIndex} setHomeStepIndex={setHomeStepIndex}/>;
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
                <Header onClose={onClose} isInfoOpen={isInfoOpen} setIsInfoOpen={setIsInfoOpen} step={step} setIsTourOpen={setIsTourOpen} handleTourNextStepClick={handleTourNextStepClick}/>
                {loadingMessage ? <CommonCircularProgress label='Processing data...'/> : renderStepComponent(homeStepIndex, setHomeStepIndex)}
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
