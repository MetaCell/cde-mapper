import React from 'react';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  return (
    <Box color="primary.main" display="flex" justifyContent="center">
      <>CDE Mapper</>
      <Button variant="contained" onClick={() => navigate('/mapper')}>
        Start mapping
      </Button>
    </Box>
  );
}

export default Home;
