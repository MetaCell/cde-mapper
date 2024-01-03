import {FC, useEffect} from 'react';
import {Snackbar} from '@mui/material';
import Home from "./steps/Home.tsx";
import {useCdeContext} from "../CdeContext.tsx";
import {useTheme} from '@mui/material/styles';
import {STEPS} from "../models.ts";
import StepTwo from "./steps/StepOne.tsx";
import Modal from './common/Modal.tsx'

const CdeModal: FC = () => {
    const theme = useTheme();
    const {config, step, loadingMessage, errorMessage,
        setErrorMessage, handleClose, isOpen} = useCdeContext();
    // const {width, height} = config;

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
                return <StepTwo/>;
            // Add cases for other steps
            default:
                return <div>Unknown step</div>;
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
