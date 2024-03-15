import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { TargetIcon } from '../../icons';
import { vars } from '../../theme/variables';

const { gray50, gray200, gray600, baseWhite } = vars;


export const StyledTable = (props: { sample: string[][], tableCellMinWidth: string }) => {
    const columns = props.sample[0]
    const rows = props.sample.slice(1, 6)

    return (
        <Table
            aria-label="styled table"
            sx={{
                position: 'relative',
                borderBottom: 0,
                '&::after': {
                    content: '""',
                    position: 'absolute',
                    display: 'block',
                    width: '100%',
                    height: '40%',
                    bottom: 0,
                    background: `linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, ${baseWhite} 83.85%)`
                },
                '& .MuiTableCell-root': {
                    borderRight: `0.0625rem solid ${gray200} !important`,
                    padding: '0.75rem 1.5rem !important',
                    fontSize: '0.875rem',
                    color: gray600,
                    borderBottom: `0.0625rem solid ${gray200}`,
                    minWidth: props.tableCellMinWidth,
                    minHeight: '2.75rem',
                    lineHeight: '1.25rem',
                    borderTop: '0.0625rem solid',
                    borderColor: gray200,
                    borderLeft: `0.0625rem solid ${gray200}`,
                }
            }}
        >
            <TableHead sx={{
                '& .MuiTableCell-root': {
                    maxWidth: props.tableCellMinWidth
                },
                '& .MuiTypography-root': {
                    fontSize: '0.75rem',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    width: '4.75rem'
                }
            }}>
                <TableRow sx={{
                    '& .MuiTableCell-head': {
                        '&:not(:hover) svg': {
                            display: 'none'
                        }
                    }
                }}>
                    {
                        columns.map((column, columnIndex) => (
                            <Tooltip key={columnIndex} title={column} placement='top'>
                                <TableCell align="left" sx={{backgroundColor: gray50}}>
                                    <Box display='flex' alignItems='center' justifyContent='space-between'>
                                        <Typography>{column}</Typography>
                                        <IconButton href={'#'+column} sx={{padding: 0, '&:hover': {background: 'transparent'}}}>
                                            <TargetIcon/>
                                        </IconButton>
                                    </Box>
                                </TableCell>
                            </Tooltip>
                        ))
                    }
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.map((row, rowIndex) => (
                    <TableRow key={rowIndex}>
                        {
                            row.map((cell, cellIndex) => (
                                <TableCell key={cellIndex} align="left">{cell}</TableCell>
                            ))
                        }
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
