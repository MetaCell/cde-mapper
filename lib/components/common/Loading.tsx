import {Box, CircularProgress, Typography} from "@mui/material";
import {vars} from '../../theme/variables.ts';

const {
    drodownDetailBg,
    gray500
} = vars

export function Loading(props: { loadingMessage: string }) {
    return <Box sx={{background: drodownDetailBg}} py={25} flexDirection="column" display="flex" alignItems="center">
        <CircularProgress/>
        <Typography sx={{
            fontSize: "0.875rem",
            fontWeight: 400,
            lineHeight: "142.857%",
            mt: "0.75rem",
            color: gray500
        }}> {props.loadingMessage}</Typography>
    </Box>;
}