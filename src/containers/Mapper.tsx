import {
  Box,
  FormControl,
  IconButton,
  Input,
  InputBase,
  Typography,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppContext } from '../App';
import { MainLayout } from '../components/layouts/main';
import {
  ArrowLeftIcon,
  MagnifyingGlassIcon,
} from '../components/assets/icons/icons';
import StyledInput from '../components/controls/forms/StyledInput';
import vars from '../components/assets/styles/variables';
import StyledIconButton from '../components/controls/forms/StyledIconButton';
import { PageDescription } from '../components/primitives/details/pageDescription';
import DatasetTable from '../components/controls/table/table';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from '../components/controls/accordion/accordion';
import { makeStyles } from '@mui/styles';

const { palette } = vars;
type MapperParams = {
  id: string;
};

const useStyles = makeStyles(theme => ({
  summary: {
    '& .MuiTypography-root': {
      fontSize: '0.875rem',
      fontWeight: 600,
      lineHeight: '1.25rem',
      color: theme.palette.grey[500],
    },
  },
}));

export default function Mapper() {
  const classes = useStyles();
  const { id } = useParams<MapperParams>();
  const { dictionary, datasets, rawDataset } = useAppContext();
  const navigate = useNavigate();

  console.log(dictionary, '==> dictionary');

  return (
    <MainLayout
      title="Map selected datasets"
      headerLeftNode={
        <StyledIconButton size="small" onClick={() => navigate(-1)}>
          <ArrowLeftIcon />
        </StyledIconButton>
      }
      footerNode={<Box>footer</Box>}>
      <Box m={4.5}>
        <Box>
          <PageDescription
            title="Map selected datasets"
            sub="Connect column headers from datasets to Common Data Elements (CDEs)."
          />
        </Box>
        <Box mb={2}>
          <StyledInput
            fullWidth
            startAdornment={<MagnifyingGlassIcon fill={palette.grey[400]} />}
            placeholder="Search column headers or mapped CDEs..."
          />
        </Box>
        <Accordion>
          <AccordionSummary className={classes.summary}>
            <Typography>Preview</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <DatasetTable dataset={rawDataset} />
          </AccordionDetails>
        </Accordion>
      </Box>
    </MainLayout>
  );
}
