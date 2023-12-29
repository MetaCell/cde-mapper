import { Box, CircularProgress, Typography } from "@mui/material";
import { useCdeContext } from "../../CdeContext";
import Header from "../common/Header";
import React from "react";

const StepsLayout:React.FC<any> = ({ children }) => {
  const { loadingMessage } = useCdeContext();
  if (loadingMessage) {
    return <CircularProgress />
  }
  return (
    <>
      <Header />
      {loadingMessage ? (
        <Box sx={{ background: '#FCFCFD' }} py={25} flexDirection='column' display='flex' alignItems='center'>
          <CircularProgress />
          <Typography sx={{fontSize: '0.875rem', fontWeight: 400, lineHeight: '142.857%', mt: '0.75rem', color: '#676C74'}}>Processing data...</Typography>
        </Box>
      ) : children}
    </>
  )
 };

export default StepsLayout;