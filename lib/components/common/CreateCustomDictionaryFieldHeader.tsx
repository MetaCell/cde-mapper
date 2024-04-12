import {Box, Button, Chip} from "@mui/material";

export function CreateCustomDictionaryFieldHeader(props: { onClose: (isConfirm: boolean) => void }) {
    return <Box
        position="sticky"
        top={0}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{
            background: "#FCFCFD",
            px: "1.5rem",
            py: "0.4375rem",
            borderBottom: "0.0625rem solid #F2F4F7"
        }}
    >
        <Chip size="small" variant="filled" color="warning" label="Draft"/>
        <Box
            gap="0.25rem"
            display="flex"
            alignItems="center"
        >
            <Button onClick={() => props.onClose(false)}>Cancel</Button>
            <Button variant="contained" color="info" onClick={() => props.onClose(true)}>Confirm</Button>
        </Box>
    </Box>;
}
