import {FC, ReactElement, useEffect, useState} from 'react';
import {Snackbar} from '@mui/material';
import Home from "./steps/Home.tsx";
import {STEPS} from "../models.ts";
import Modal from './common/Modal.tsx'
import MappingStep from './steps/MappingStep.tsx';
import TemplateStep from './steps/TemplateStep.tsx';
import Header from "./common/Header.tsx";
import {useCdeContext} from "../CdeContext.ts";
import {CommonCircularProgress} from "./common/CommonCircularProgress.tsx";
import Tour from './common/Tour.tsx';
import WalkthroughStartDialog from './common/WalkthroughStartDialog.tsx';

const CdeModal: FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [isInfoOpen, setIsInfoOpen] = useState(false);

    const {step, errorMessage, setErrorMessage, loadingMessage, handleClose, tourStepName, tourSteps, setTourSteps} = useCdeContext();

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

    const handleStartTutorial = () => {
        setTourSteps(prevTutorialSteps => ({
            ...prevTutorialSteps,
            [tourStepName]: {
                ...prevTutorialSteps[tourStepName],
                run: true
            }
        }));
    }

    const handleNextStepTutorial = () => {
        if (tourSteps[tourStepName].run) {
            setTourSteps(prevTutorialSteps => ({
                ...prevTutorialSteps,
                [tourStepName]: {
                    ...prevTutorialSteps[tourStepName],
                    stepIndex: prevTutorialSteps[tourStepName].stepIndex + 1
                }
            }));
        }
    }

    const handleSkipTutorial = () => {
        setTourSteps(prevTutorialSteps => ({
            ...prevTutorialSteps,
            collection: { ...prevTutorialSteps.collection, run: false },
            suggestions: { ...prevTutorialSteps.suggestions, run: false },
            mapping: { ...prevTutorialSteps.mapping, run: false }
        }));
    } 

    useEffect(() => {
        setTourSteps(prevTutorialSteps => ({
            ...prevTutorialSteps,
            [tourStepName]: {
                ...prevTutorialSteps[tourStepName],
                stepIndex: 0
            }
        }));
    },[tourStepName])
    
    return (
        <>
            <Modal open={isModalOpen} onClose={onClose} maxWidth="xl" isInfoOpen={isInfoOpen}>
                <Header onClose={onClose} isInfoOpen={isInfoOpen} setIsInfoOpen={setIsInfoOpen} step={step} handleStartTutorial={handleStartTutorial} handleNextStepTutorial={handleNextStepTutorial}/>
                {loadingMessage ? <CommonCircularProgress label='Processing data...'/> : renderStepComponent()}
                <Tour tourStepName={tourStepName} tourSteps={tourSteps} setTourSteps={setTourSteps}/>
                {tourStepName==="home" ? <WalkthroughStartDialog handleStartTutorial={handleStartTutorial} handleSkipTutorial={handleSkipTutorial}/> : <></>}
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
