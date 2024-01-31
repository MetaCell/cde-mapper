import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { vars } from '../../theme/variables';

const { gray500 } = vars

export const CommonCircularProgress = ({ label }:{ label: string }) => {

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', margin: 'auto' }}>
            <CircularProgress size={32} />
            <Typography sx={{ fontSize: '0.875rem', color: gray500, marginTop: '0.75rem' }}>{label}</Typography>
        </Box>
    );
}
