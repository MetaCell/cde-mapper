import {Box, Typography} from '@mui/material';
import {vars} from '../theme/variables.ts';

const {drodownDetailBg} = vars;

// This is just a placeholder component
function ErrorPage() {


    return (
        <Box display='flex' alignItems='center' flexDirection='column' px={3} py={6} sx={{
            background: drodownDetailBg
        }}>
            <Typography sx={{marginBottom: '0.5rem'}} variant='h3'>
                Something went wrong
            </Typography>
        </Box>
    );
}

export default ErrorPage;