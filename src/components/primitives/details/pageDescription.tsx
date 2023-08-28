import { Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';

interface IPageDescriptionProps {
  title: string;
  sub?: string;
}
const useStyles = makeStyles(() => ({
  root: {
    '& .title': {
      fontSize: '1.125rem',
      fontWeight: 500,
      lineHeight: '1.7rem',
    },
    '& .sub': {
      fontSize: '0.875rem',
      lineHeight: '1.25rem',
    },
  },

  title: {
    fontSize: '1.125rem',
    fontWeight: 500,
    lineHeight: '1.7rem',
  },
  sub: {
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
  },
}));
export const PageDescription = ({ title, sub }: IPageDescriptionProps) => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Typography className={'title'}>{title}</Typography>
      {!!sub ? <Typography className={'sub'}>{sub}</Typography> : null}
    </Box>
  );
};
