import {FC} from 'react';
import {Box, Typography, Button} from '@mui/material';
import {useCdeContext} from "../CdeContext.tsx";


const StepOne: FC = () => {
    const {labName} = useCdeContext()

    return (
        <Box>
            <Typography variant="h6">Create mapping(s) with selected dataset?</Typography>
            <Typography variant="subtitle1">
                You’ve selected column headers from the {labName}’s dataset on ODC’s website to map.
            </Typography>

            <div className="modal-actions">
                <Button variant="contained" color="primary">Start mapping</Button>
                <Button variant="outlined">No, create an empty template with CDEs instead</Button>
            </div>
        </Box>
    );
};

export default StepOne;
