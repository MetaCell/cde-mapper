import {Box, CircularProgress, Typography} from "@mui/material";

export function Loading(props: { loadingMessage: string }) {
    return <Box sx={{background: "#FCFCFD"}} py={25} flexDirection="column" display="flex" alignItems="center">
        <CircularProgress/>
        <Typography sx={{
            fontSize: "0.875rem",
            fontWeight: 400,
            lineHeight: "142.857%",
            mt: "0.75rem",
            color: "#676C74"
        }}> {props.loadingMessage}</Typography>
    </Box>;
}