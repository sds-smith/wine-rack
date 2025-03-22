
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import CategoriesTableRow from './CategoriesTableRow';
import AddButton from './AddButton';
import { getCategories } from '@/app/utils/data';
import { Category } from '@/app/types/wine';

type CategoriesTableProps = {
  disabled: boolean,
  editID?: string
}

export default async function CategoriesTable({ disabled, editID } : CategoriesTableProps) {
  const { categories } = await getCategories();
  const columnHeadings: string[] = ['Code', 'Title', 'Group', 'Color'];

  return (
    <Box width={{xs: 350, lg: 'unset'}} >
      <h4>Categories</h4>
      <TableContainer component={Paper} sx={{ overflow: "auto", height: "60vh", width: 'inherit', marginTop: '10px' }}>
        <Table size="small" aria-label="a dense table">
          <TableHead sx={{position: 'sticky', top: 0}}>
            <TableRow sx={{background: 'black'}}>
              <TableCell></TableCell>
              { columnHeadings.map(h => <TableCell key={h} align="center" sx={{color: 'white'}}>{h}</TableCell>) }
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((row: Category) => (
              <CategoriesTableRow
                key={row.code}
                row={row}
                disabled={disabled}
                isEdit={editID === row.ID}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AddButton disabled={disabled} />
    </Box>
  )
}