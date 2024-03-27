import {Box, Tooltip, Typography} from "@mui/material";
import {InfoIcon} from "../../../icons";

export function PairingTooltip() {
    return <Tooltip
        title={
            <>
                <Typography sx={{
                    fontSize: "0.75rem",
                    fontWeight: 400,
                    lineHeight: "142.857%",
                    color: "#fff",
                }}>
                    In this section the CDE Mapper will present fellow CDEs that are meaningful and usually associated with the parent of the pairing suggestions.
                </Typography>
            </>
        }
    >
        <Box ml="0.25rem" display="flex" alignItems="center"><InfoIcon/></Box>
    </Tooltip>;
}
