import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Tooltip } from '@mui/material';
import { makeStyles } from '@mui/styles';

const TRUNCATE_LENGTH = 17;

const useStyles = makeStyles(() => ({
  ellipsis: {
    minWidth: '10rem',
    maxWidth: '10rem',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}));

export default function DatasetTable({
  dataset,
}: {
  dataset: Array<Record<string, unknown>>;
}) {
  const classes = useStyles();
  const keys = Object.keys(dataset[0]);

  return (
    <TableContainer>
      <Table
        sx={{ minWidth: 650 }}
        aria-label="simple table"
        stickyHeader={true}>
        <TableHead>
          <TableRow>
            {keys.map((key, index) => {
              const isTruncated = key.length > TRUNCATE_LENGTH;
              return (
                <Tooltip
                  key={`${key}_${index}`}
                  title={isTruncated ? key : ''}
                  arrow>
                  <TableCell
                    key={`${key}_${index}`}
                    className={classes.ellipsis}>
                    {key}
                  </TableCell>
                </Tooltip>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {dataset.map((data, index) => {
            const rowItems = Object.values(data);
            return (
              <TableRow key={`${rowItems[0]}_${index}`}>
                {rowItems.map(item => (
                  <TableCell key={`${item}_${index}`}>
                    {item as string}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
