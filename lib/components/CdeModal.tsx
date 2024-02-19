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
import CommonJoyride from './common/CommonJoyride.tsx';
import WalkthroughStartDialog from './common/WalkthroughStartDialog.tsx';


const CdeModal: FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [isInfoOpen, setIsInfoOpen] = useState(false);

    const {step, errorMessage, setErrorMessage, loadingMessage, handleClose, tutorialStep, tutorialSteps, setTutorialSteps} = useCdeContext();

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

    useEffect(() => {
        setTutorialSteps(prevTutorialSteps => ({
            ...prevTutorialSteps,
            [tutorialStep]: {
                ...prevTutorialSteps[tutorialStep],
                stepIndex: 0
            }
        }));
    },[tutorialStep])

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
        setTutorialSteps(prevTutorialSteps => ({
            ...prevTutorialSteps,
            [tutorialStep]: {
                ...prevTutorialSteps[tutorialStep],
                run: true
            }
        }));
    }

    const handleNextStepTutorial = () => {
        if (tutorialSteps["home"].run) {
            setTutorialSteps(prevTutorialSteps => ({
                ...prevTutorialSteps,
                [tutorialStep]: {
                    ...prevTutorialSteps[tutorialStep],
                    stepIndex: prevTutorialSteps[tutorialStep].stepIndex += 1
                }
            }));
        }
    }

    const handleSkipTutorial = () => {
        setTutorialSteps(prevTutorialSteps => ({
            ...prevTutorialSteps,
            collection: { ...prevTutorialSteps.collection, run: false },
            suggestions: { ...prevTutorialSteps.suggestions, run: false },
            mapping: { ...prevTutorialSteps.mapping, run: false }
        }));
    } 

    return (
        <>
            <Modal open={isModalOpen} onClose={onClose} maxWidth="xl" isInfoOpen={isInfoOpen}>
                <Header onClose={onClose} isInfoOpen={isInfoOpen} setIsInfoOpen={setIsInfoOpen} step={step} handleStartTutorial={handleStartTutorial} handleNextStepTutorial={handleNextStepTutorial}/>
                {loadingMessage ? <CommonCircularProgress label='Processing data...'/> : renderStepComponent()}
                <CommonJoyride/>
                {tutorialStep==="home" ? <WalkthroughStartDialog handleNextStepTutorial={handleNextStepTutorial} handleSkipTutorial={handleSkipTutorial}/> : <></>}
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
