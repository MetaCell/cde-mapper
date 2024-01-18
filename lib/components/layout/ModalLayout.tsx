import React, { PropsWithChildren } from 'react';
import { Box, Typography, CircularProgress} from '@mui/material';
import {useCdeContext} from "../../CdeContext.tsx";
import Header from "../common/Header";
import { vars } from '../../theme/variables.ts';

const {
  drodownDetailBg,
  gray500
 } = vars

interface IMainProps {
    footerNode?: React.ReactNode;
    footerTopElement?: React.ReactNode;
}

export const ModalLayout = ({
                                children,
                                // footerNode,
                                // footerTopElement,
                            }: PropsWithChildren<IMainProps>) => {
                                const { loadingMessage } = useCdeContext();
  return (
    <>
      <Header />
      {loadingMessage ? (
        <Box sx={{ background: drodownDetailBg }} py={25} flexDirection='column' display='flex' alignItems='center'>
          <CircularProgress />
          <Typography sx={{fontSize: '0.875rem', fontWeight: 400, lineHeight: '142.857%', mt: '0.75rem', color: gray500}}>Processing data...</Typography>
        </Box>
      ) : children}
      {/* {(footerNode || footerTopElement) && (
        <Box
            sx={{
                position: 'fixed',
                bottom: 0,
                width: '100%',
                '& .footer': {
                    width: '100%',
                    padding: '0.75rem 1.5rem',
                    backgroundColor: baseWhite,
                    borderTop: `0.0625rem solid grey`,
                },
            }}
        >
            {footerTopElement ? footerTopElement : null}
            {footerNode ? <Box className="footer">{footerNode}</Box> : null}
        </Box>
    )} */}
    </>
  )
};