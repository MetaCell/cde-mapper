import { Box } from '@mui/material';
import { useLocation, useMatch, useParams } from 'react-router-dom';
import { useAppContext } from '../App';

type MapperParams = {
  id: string;
};

export default function Mapper() {
  const { id } = useParams<MapperParams>();
  const { dictionary } = useAppContext();

  console.log(dictionary, '==> dictionary');

  return <Box>mapper {`:${dictionary}`}</Box>;
}
