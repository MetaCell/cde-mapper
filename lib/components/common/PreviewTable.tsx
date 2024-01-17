import { Box, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material"
import { TargetIcon } from "../../icons";
import { vars } from "../../theme/variables";

const {
  gray200,
  gray600,
  gray50
} = vars;

const PreviewTable = () => {
  const mockCells = ['Subject', 'Species', 'Strain', 'Sex', 'Age', 'Group', 'StudyInjModelTyp', 'Subject', 'Species', 'Strain']
  const TableCellUI = (label:string) => (
    <TableCell>
      <Box display='flex' alignItems='center' justifyContent='space-between'>{label}<TargetIcon/></Box>
    </TableCell>
  )
  const TableRowCellUI = (label:string) => (
    <TableCell>
      {label}
    </TableCell>
  )
  return (
    <Table sx={{
      '& .MuiTableCell-root': {
        boxSizing: 'border-box',
        minWidth: '10rem',
        width: '10rem',
        padding: '0.75rem 1.5rem',
        borderTop: '0.0625rem solid',
        borderColor: gray200,
        borderLeft: `0.0625rem solid ${gray200}`,

        '&:last-of-type': {
          borderRight: `0.0625rem solid ${gray200}`
        }
      },


      '& .MuiTableCell-body': {
        fontSize: '0.875rem',
        color: gray600,
        lineHeight: '142.857%'
      },
    }}>
      <TableHead>
        <TableRow sx={{
          '& .MuiTableCell-root': {
            background: gray50,
          },

          '& .MuiTableCell-head': {
            '&:not(:hover) svg': {
              display: 'none'
            }
          }
        }}>
          {
            mockCells.map((cell) => TableCellUI(cell))
          }
        </TableRow>
      </TableHead>

      <TableBody>
        <TableRow>
          {
            mockCells.map((cell) => TableRowCellUI(cell))
          }
        </TableRow>

        <TableRow>
        {
            mockCells.map((cell) => TableRowCellUI(cell))
          }
        </TableRow>

        <TableRow>
          {
            mockCells.map((cell) => TableRowCellUI(cell))
          }
        </TableRow>

        <TableRow>
           {
            mockCells.map((cell) => TableRowCellUI(cell))
          }
        </TableRow>

        <TableRow>
          {
            mockCells.map((cell) => TableRowCellUI(cell))
          }
        </TableRow>

        <TableRow>
          {
            mockCells.map((cell) => TableRowCellUI(cell))
          }
        </TableRow>

        <TableRow>
          {
            mockCells.map((cell) => TableRowCellUI(cell))
          }
        </TableRow>

        <TableRow>
          {
            mockCells.map((cell) => TableRowCellUI(cell))
          }
        </TableRow>

        <TableRow>
          {
            mockCells.map((cell) => TableRowCellUI(cell))
          }
        </TableRow>
      </TableBody>
    </Table>
  )
}

export default PreviewTable;