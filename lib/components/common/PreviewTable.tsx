import { Box, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material"
import { TargetIcon } from "../../icons";

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
        borderColor: '#E4E5E7',
        borderLeft: '0.0625rem solid #E4E5E7',

        '&:last-of-type': {
          borderRight: '0.0625rem solid #E4E5E7'
        }
      },


      '& .MuiTableCell-body': {
        fontSize: '0.875rem',
        color: '#4F5359',
        lineHeight: '142.857%'
      },
    }}>
      <TableHead>
        <TableRow sx={{
          '& .MuiTableCell-root': {
            background: '#F4F5F5',
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