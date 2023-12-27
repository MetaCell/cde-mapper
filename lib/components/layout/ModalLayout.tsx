import React, { PropsWithChildren } from 'react';
import { Box, Divider, Typography, Button,  IconButton} from '@mui/material';
import { vars } from "../../theme/variables";
import { CloseIcon } from "../../icons";
import {useCdeContext} from "../../CdeContext.tsx";


const { baseWhite, gray100, gray700 } = vars

const styles = {
  root: {
    padding: '0.75rem 1.5rem',
    gap: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    borderBottom: `0.0625rem solid ${gray100}`,
    background: baseWhite,

    '& .MuiTypography-root': {
      fontSize: '0.875rem',
      fontWeight: 600,
      lineHeight: '142.857%',
      color: gray700
    }
  }
}
interface IMainProps {
    // title: string;
    // headerLeftNode?: React.ReactNode;
    footerNode?: React.ReactNode;
    footerTopElement?: React.ReactNode;
}

export const ModalLayout = ({
                                // title,
                                children,
                                // headerLeftNode,
                                footerNode,
                                footerTopElement,
                            }: PropsWithChildren<IMainProps>) => {
    const {handleClose} = useCdeContext();
    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={styles.root}>
                <Box display='flex' alignItems='center' flex={1}>
                    <IconButton disableRipple sx={{
                    borderRadius: '0.5rem',

                    '&:hover': {
                        background: gray100
                    }
                    }}
                    onClick={handleClose}
                    >
                        <CloseIcon />
                    </IconButton>
                    <Divider sx={{ borderRight: `0.0625rem solid ${gray100}`, height: '2.25rem', mx: '1rem' }} />
                    <Typography>
                        Map selected datasets
                    </Typography>
                </Box>

                <Button disableRipple variant="outlined">Info</Button>
            </Box>
            <Box sx={{ position: 'relative', minHeight: 'calc(100vh - 104px)' }}>
                {children}
            </Box>

            {(footerNode || footerTopElement) && (
                <Box
                    sx={{
                        position: 'fixed',
                        bottom: 0,
                        width: '100%',
                        '& .footer': {
                            width: '100%',
                            padding: '0.75rem 1.5rem',
                            backgroundColor: baseWhite,
                            borderTop: `1px solid grey`,
                        },
                    }}
                >
                    {footerTopElement ? footerTopElement : null}
                    {footerNode ? <Box className="footer">{footerNode}</Box> : null}
                </Box>
            )}
        </Box>
    );
};
