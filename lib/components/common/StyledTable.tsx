import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { vars } from '../../theme/variables';

const { gray50, gray200, baseWhite } = vars;

function createData(
    subject: string,
    species: string,
    strain: string,
    sex: string,
    age: string,
    group: string,
    studyInjModelTyp: string,
    subject2: string,
    species2: string,
    strain2: string
) {
    return { subject, species, strain, sex, age, group, studyInjModelTyp, subject2, species2, strain2 };
}

const columns = ['Subject', 'Species', 'Strain', 'Sex', 'Age', 'Group', 'StudyInjModelTyp', 'Subject2', 'Species2', 'Strain2']

const rows = [
    createData('sub1', 'Mouse', 'C57BL167', 'Male', '6 weeks', 'sharing', 'sub12', 'Mouse2', 'C57BL1672', 'Male2'),
    createData('sub1', 'Mouse', 'C57BL167', 'Male', '6 weeks', 'sharing', 'sub12', 'Mouse2', 'C57BL1672', 'Male2'),
    createData('sub7', 'Mouse', 'C57BL167', 'Female', '6 weeks', 'sharing', 'sub12', 'Mouse2', 'C57BL1672', 'Male2'),
    createData('sub7', 'Mouse', 'C57BL167', 'Female', '6 weeks', 'sharing', 'sub12', 'Mouse2', 'C57BL1672', 'Male2'),
    createData('sub2', 'Mouse', 'C57BL167', 'Male', '6 weeks', 'sharing', 'sub12', 'Mouse2', 'C57BL1672', 'Male2'),
];

export const StyledTable = ({ tableCellMinWidth }: { tableCellMinWidth: string }) => {

    return (
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
                    background: `linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, ${baseWhite} 83.85%)`
                },
                '& .MuiTableCell-root': {
                    boxSizing: 'border-box',
                    padding: '0.75rem 1.5rem !important',
                    fontSize: '0.875rem',
                    minWidth: tableCellMinWidth,
                    width: tableCellMinWidth,
                    borderTop: '0.0625rem solid',
                    borderColor: gray200,
                    borderLeft: `0.0625rem solid ${gray200}`,

                    '&:last-of-type': {
                        borderRight: `0.0625rem solid ${gray200}`
                    }
                }
            }}
            aria-label="styled table"
        >
            <TableHead sx={{
                '& .MuiTableCell-root': {
                    fontSize: '0.75rem !important'
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
                        <TableCell align="left">{row.subject}</TableCell>
                        <TableCell align="left">{row.species}</TableCell>
                        <TableCell align="left">{row.strain}</TableCell>
                        <TableCell align="left">{row.sex}</TableCell>
                        <TableCell align="left">{row.age}</TableCell>
                        <TableCell align="left">{row.group}</TableCell>
                        <TableCell align="left">{row.studyInjModelTyp}</TableCell>
                        <TableCell align="left">{row.subject2}</TableCell>
                        <TableCell align="left">{row.species2}</TableCell>
                        <TableCell align="left">{row.strain2}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
