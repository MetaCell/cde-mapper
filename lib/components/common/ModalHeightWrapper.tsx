import React from "react";
import {Box} from "@mui/material";


interface ModalHeightWrapperProps {
    children: React.ReactNode;
    pb?: number | string;
    height?: number | string;
}


const ModalHeightWrapper: React.FC<ModalHeightWrapperProps> = ({
                                                                   children,
                                                                   pb = 6,
                                                                   height = '15.9375rem'
                                                               }) => (
    <Box overflow='auto' height={`calc(100vh - ${height})`} p='1.5rem' pb={pb}>
        {children}
    </Box>
)

export default ModalHeightWrapper;
