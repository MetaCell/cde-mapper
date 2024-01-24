import React, { PropsWithChildren } from 'react';
// import { vars } from "../../theme/variables";
import {useCdeContext} from "../../CdeContext.tsx";
import Header from "../common/Header";
import { CommonCircularProgress } from '../common/CommonCircularProgress.tsx';

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
        <CommonCircularProgress label='Processing data...'/>
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