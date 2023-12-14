import {FC, useEffect} from 'react';
import {Modal, Box, CircularProgress, Snackbar} from '@mui/material';
import StepOne from "./StepOne.tsx";
import {useCdeContext} from "../CdeContext.tsx";


const CdeModal: FC = () => {
    const { config, step, loadingMessage, errorMessage, setErrorMessage } = useCdeContext();
    const { width, height } = config;

    useEffect(() => {
        if (errorMessage) {
            const timer = setTimeout(() => {
                setErrorMessage(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [errorMessage, setErrorMessage]);

    const renderStepComponent = () => {
        switch(step) {
            case 0:
                return <StepOne />;
            // Add cases for other steps
            default:
                return <div>Unknown step</div>;
        }
    };

    return (
        <Modal open={true} onClose={() => { /* handle close */ }}>
            <Box style={{ width, height }}>
                {loadingMessage && <CircularProgress />}
                {!loadingMessage && renderStepComponent()}
                <Snackbar
                    open={!!errorMessage}
                    message={errorMessage}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                />
            </Box>
        </Modal>
    );
};

export default CdeModal;

