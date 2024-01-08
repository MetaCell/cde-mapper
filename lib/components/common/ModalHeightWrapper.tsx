import React from "react";
import { Box } from "@mui/material";

const ModalHeightWrapper:React.FC<any> = ({ children, pb = 6, height = '20.4375rem'}) => (
  <Box overflow='auto' height={`calc(100vh - ${height})`} p='1.5rem' pb={pb}>
    {children}
  </Box>
)

export default ModalHeightWrapper;