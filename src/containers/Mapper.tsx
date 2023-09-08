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

const { palette } = vars;
type MapperParams = {
  id: string;
};

export default function Mapper() {
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
        <DatasetTable dataset={rawDataset} />
      </Box>
    </MainLayout>
  );
}
