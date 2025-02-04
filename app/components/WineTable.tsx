import { ReactNode } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useWines, Wine } from '../hooks/useWines';

export default function WineTable() {
    const { wineList, columns } = useWines();
    const columnHeadings = Object.values(columns).filter(h => ![ 'ID', 'Category' ].includes(h));

    return (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow sx={{background: 'black'}}>
                { columnHeadings.map(h => <TableCell key={h} align="center" sx={{color: 'white'}}>{h}</TableCell>)}
              </TableRow>
            </TableHead>
            <TableBody>
              {wineList.map((row) => (
                <TableRow
                  key={`${row.ID}-${row.Producer}`}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    { columnHeadings.map(h => <TableCell key={h} align="center">{row[h as keyof Wine]?.toString()}</TableCell>)}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
    );
}
