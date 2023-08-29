import React from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '../components/layouts/main';
import TABLE from '../components/assets/svg/table.svg';
import { makeStyles } from '@mui/styles';
import { XIcon } from '../components/assets/icons/icons';
import StyledIconButton from '../components/controls/forms/StyledIconButton';

const useStyles = makeStyles(theme => ({
  textContainer: {
    alignItems: 'center',
    '& .title': {
      color: theme.palette.grey[700],
      fontSize: '1.5rem',
      fontWeight: 500,
      lineHeight: '2.25rem',
    },
    '& .sub': {
      color: theme.palette.grey[500],
    },
  },
}));

function Home() {
  const classes = useStyles();
  const navigate = useNavigate();
  return (
    <MainLayout
      title="Map selected datasets"
      headerLeftNode={
        <StyledIconButton color="primary" size="small">
          <XIcon />
        </StyledIconButton>
      }>
      <Stack alignItems="center" justifyContent="center" width="100%" mx={6}>
        <Stack spacing={6} width="max-content">
          <Stack className={classes.textContainer} spacing={1}>
            <Typography className="title" fontSize={24}>
              Create mapping(s) with selected datasets?
            </Typography>
            <Typography className="sub" color="text" textAlign="center">
              You’ve selected column headers from the [Lab name]’s datasets{' '}
              <br />
              on ODC’s website to map.
            </Typography>
          </Stack>
          <img src={TABLE} alt="table" />
          <Stack alignItems="center" width="100%">
            <Box>
              <Button
                disableRipple
                variant="contained"
                onClick={() => navigate('/mapper')}>
                Start mapping
              </Button>
            </Box>
            <Box mt={1}>
              <Button
                disableRipple
                color="secondary"
                variant="text"
                onClick={() => navigate('/create-template')}>
                No, create an empty template with CDEs instead{' '}
              </Button>
            </Box>
          </Stack>
        </Stack>
      </Stack>
    </MainLayout>
  );
}

export default Home;
