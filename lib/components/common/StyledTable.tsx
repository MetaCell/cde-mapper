import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { vars } from '../../theme/variables';

const { gray50, gray100, gray200 } = vars;

function createData(
    subject: string,
    species: string,
    strain: string,
    sex: string,
    age: string,
    groups: string
) {
    return { subject, species, strain, sex, age, groups };
}

const columns = ['Subject', 'Species', 'Strain', 'Sex', 'Age', 'Groups']

const rows = [
    createData('sub1', 'Mouse', 'C57BL167', 'Male', '6 weeks', 'sharing'),
    createData('sub1', 'Mouse', 'C57BL167', 'Male', '6 weeks', 'sharing'),
    createData('sub7', 'Mouse', 'C57BL167', 'Female', '6 weeks', 'sharing'),
    createData('sub7', 'Mouse', 'C57BL167', 'Female', '6 weeks', 'sharing'),
    createData('sub2', 'Mouse', 'C57BL167', 'Male', '6 weeks', 'sharing'),
];

export const StyledTable = () => {

    return (
        <TableContainer 
            component={Paper} 
            elevation={0}
            sx={{
                maxWidth: 650,
                border: `1px solid ${gray100}`,
                borderBottom: 0
            }}
        >
            <Table
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
                        background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, #FFF 83.85%)'
                    },
                    '& .MuiTableCell-root': {
                        borderRight: `1px solid ${gray200} !important`,
                        padding: '0.75rem 1.5rem !important',
                        fontSize: '0.875rem',
                        borderBottom: `1px solid ${gray200}`,
                        minWidth: '7.5rem',
                        minHeight: '2.75rem',
                        lineHeight: '1.25rem'
                    }
                }}
                aria-label="styled table"
            >
                <TableHead sx={{
                    '& .MuiTableCell-root': {
                        lineHeight: '1.125rem',
                        fontSize: '0.75rem'
                    }
                }}>
                    <TableRow>
                        {
                            columns.map(column => (
                                <TableCell
                                    key={column}
                                    align="left"
                                    sx={{
                                        backgroundColor: gray50
                                    }}
                                >
                                    {column}
                                </TableCell>
                            ))
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow
                            key={index}
                        >
                            <TableCell component="th" scope="row">
                                {row.subject}
                            </TableCell>
                            <TableCell align="left">{row.species}</TableCell>
                            <TableCell align="left">{row.strain}</TableCell>
                            <TableCell align="left">{row.sex}</TableCell>
                            <TableCell align="left">{row.age}</TableCell>
                            <TableCell align="left">{row.groups}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
