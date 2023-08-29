import React from 'react';
import { MainLayout } from '../components/layouts/main';
import { Box, IconButton, Typography } from '@mui/material';
import { ArrowLeftIcon } from '../components/assets/icons/icons';
import { useNavigate } from 'react-router-dom';
import { PageDescription } from '../components/primitives/details/pageDescription';

interface ICreateTemplateProps {}

function CreateTemplate({}: ICreateTemplateProps) {
  const navigate = useNavigate();
  return (
    <MainLayout
      title="Create template"
      headerLeftNode={
        <IconButton size="small" onClick={() => navigate(-1)}>
          <ArrowLeftIcon />
        </IconButton>
      }
      footerNode={<Box>footer</Box>}>
      <Box width="100%" m={4.5}>
        <Box>
          <PageDescription
            title="Create template"
            sub="Generate a template with CDEs or data dictionary fields before data
            collection for accurate mapping. Start by selecting CDEs to create
            template with."
          />
        </Box>
      </Box>
    </MainLayout>
  );
}

export default CreateTemplate;
