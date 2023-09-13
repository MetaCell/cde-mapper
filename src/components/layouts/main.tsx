import { Box, Divider, Stack, Theme, Typography } from '@mui/material';
import React, { PropsWithChildren } from 'react';
import { makeStyles } from '@mui/styles';
import vars from '../assets/styles/variables';

interface IMainProps {
  title: string;
  headerLeftNode?: React.ReactNode;
  footerNode?: React.ReactNode;
  footerTopElement?: React.ReactNode;
}

const { textWhite } = vars;

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    position: 'sticky',
    top: 0,
    borderBottom: `1px solid ${theme.palette.grey[100]}`,
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
    },
  },
  footerContainer: {
    position: 'fixed',
    bottom: 0,
    width: '100%',

    '& .footer': {
      width: '100%',
      padding: '0.75rem 1.5rem',
      backgroundColor: textWhite,
      borderTop: `1px solid ${theme.palette.grey[100]}`,
    },
  },
}));

export const MainLayout = ({
  title,
  children,
  headerLeftNode,
  footerNode,
  footerTopElement,
}: PropsWithChildren<IMainProps>) => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Stack direction="row" spacing={0.75} className={classes.header}>
        {headerLeftNode}
        {headerLeftNode && <Divider />}
        <Typography>{title}</Typography>
      </Stack>
      <Box sx={{ position: 'relative', minHeight: 'calc(100vh - 104px)' }}>
        {children}
      </Box>

      {footerNode || footerTopElement ? (
        <Box className={classes.footerContainer}>
          {footerTopElement ? footerTopElement : null}
          {footerNode ? <Box className="footer">{footerNode} </Box> : null}
        </Box>
      ) : null}
    </Box>
  );
};
