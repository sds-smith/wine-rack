
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import AddWineDialog from './AddWineDialog';
import EditWineDialog from './EditWineDialog';
import { useWines, Wine } from '../hooks/useWines';

export default async function WineTable() {
  const { wineList, columns, nextId, categories } = await useWines();
  const columnHeadings = columns.filter(h => ![ 'ID', 'Category' ].includes(h));

  return (
    <Box >
      <AddWineDialog
        ID={nextId}
        categories={categories}
      />
      <TableContainer component={Paper} sx={{ overflow: "auto", height: "78vh" }}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead sx={{position: 'sticky', top: 0}}>
            <TableRow sx={{background: 'black'}}>
              <TableCell size='small' sx={{width: '10px'}}></TableCell>
              { columnHeadings.map(h => <TableCell key={h} align="center" sx={{color: 'white'}}>{h}</TableCell>)}
            </TableRow>
          </TableHead>
          <TableBody>
            {wineList.map((row: Wine) => (
              <TableRow
                key={`${row.ID}-${row.Producer}`}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="center" size='small' sx={{width: '10px'}}>
                  <EditWineDialog
                    wine={row}
                    categories={categories}
                  />
                </TableCell>
                { columnHeadings.map(h => <TableCell key={h} align="center">{row[h as keyof Wine]?.toString()}</TableCell>)}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
