import React, { PropsWithChildren } from 'react';
import { Box, Divider, Stack, Typography } from '@mui/material';
import vars from '../assets/styles/variables';

interface IMainProps {
    title: string;
    headerLeftNode?: React.ReactNode;
    footerNode?: React.ReactNode;
    footerTopElement?: React.ReactNode;
}

const { textWhite, palette } = vars;

export const ModalLayout = ({
                                title,
                                children,
                                headerLeftNode,
                                footerNode,
                                footerTopElement,
                            }: PropsWithChildren<IMainProps>) => {
    return (
        <Box sx={{ width: '100%' }}>
            <Stack
                direction="row"
                spacing={0.75}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    position: 'sticky',
                    top: 0,
                    borderBottom: `1px solid ${palette.grey[100]}`,
                    padding: '0.75rem 1.5rem',
                    backgroundColor: textWhite,
                    zIndex: 1,
                    '& .MuiDivider-root': {
                        display: 'block',
                    },
                    '& .MuiTypography-root': {
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        lineHeight: '1.25rem',
                        color: 'grey.700'
                    },
                }}
            >
                {headerLeftNode}
                {headerLeftNode && <Divider />}
                <Typography>{title}</Typography>
            </Stack>
            <Box sx={{ position: 'relative' }}>
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
                            backgroundColor: textWhite,
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
