import {Box, Tooltip, Typography} from "@mui/material";
import {InfoIcon} from "../../../icons";

export function PairingTooltip(props: { selectedCdeAbbreviation: string }) {
    return <Tooltip
        title={
            <>
                <Typography sx={{
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    lineHeight: "142.857%",
                    marginBottom: "0.25rem",
                    color: "#fff",
                }}>We have seen this before</Typography>
                <Typography sx={{
                    fontSize: "0.75rem",
                    fontWeight: 400,
                    lineHeight: "142.857%",
                    color: "#fff",
                }}>
                    {props.selectedCdeAbbreviation} is typically used
                    with the following fellow CDEs
                </Typography>
            </>
        }
    >
        <Box ml="0.25rem" display="flex" alignItems="center"><InfoIcon/></Box>
    </Tooltip>;
}
