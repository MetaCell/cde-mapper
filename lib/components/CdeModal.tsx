import {FC, useEffect} from 'react';
import {Modal, Box, CircularProgress, Snackbar} from '@mui/material';
import Home from "./steps/Home.tsx";
import {useCdeContext} from "../CdeContext.tsx";
import {useTheme} from '@mui/material/styles';
import {STEPS} from "../models.ts";
import StepTwo from "./steps/StepTwo.tsx";

const CdeModal: FC = () => {
    const theme = useTheme();
    const {config, step, loadingMessage, errorMessage,
        setErrorMessage, handleClose, isOpen} = useCdeContext();
    const {width, height} = config;

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
        <Modal open={isOpen} onClose={handleClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: width,
                    height: height,
                    bgcolor: 'background.paper',
                    boxShadow: theme.shadows[5],
                    p: 4,
                    outline: 'none'
                }}
            >
                {loadingMessage && <CircularProgress/>}
                {!loadingMessage && renderStepComponent()}
                <Snackbar
                    open={!!errorMessage}
                    message={errorMessage}
                    anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                />
            </Box>
        </Modal>
    );
};

export default CdeModal;
