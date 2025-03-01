
import { Fragment } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TableBodyCell from './TableBodyCell';
import FooterRow from './FooterRow';
import { getWineData, columns } from '@/app/utils/data';
import { Wine } from '../../types/wine';
import EditButton from '../buttons/EditButton';

const Spacer = () => <TableRow sx={{height: '20px', borderBottom: '1px solid rgba(128, 128, 128, 0.2)'}}/>

type WineTableProps = {
  page: string
}

export default async function WineTable({ page } : WineTableProps) {
  const { wineList, metaData : { totalBottles } } = await getWineData(page);
  const columnHeadings = columns.filter(h => ![ 'Category' ].includes(h));

  return (
    <Box >
      <TableContainer component={Paper} sx={{ overflow: "auto", height: "85vh" }}>
        <Table size="small" aria-label="a dense table">
          <TableHead sx={{position: 'sticky', top: 0}}>
            <TableRow sx={{background: 'black'}}>
              <TableCell size='small' ></TableCell>
              { columnHeadings.map(h => <TableCell key={h} align="center" sx={{color: 'white'}}>{h}</TableCell>)}
            </TableRow>
          </TableHead>
          <TableBody>
            {wineList.map((row: Wine, idx: number) => {
              return (
                <Fragment key={row.ID}>
                  { idx > 0 && row.Category !== wineList[idx-1].Category && <Spacer />}
                  <TableRow
                    
                    sx={{ '&:last-child td, &:last-child th': { border: 0 }, }}
                  >
                    <TableCell align="center" size='small' >
                      <EditButton
                        id={row.ID!}
                        page={page}
                      />
                    </TableCell>
                      { columnHeadings.map(h => (
                        <TableBodyCell 
                          key={h} 
                          columnId={h}
                          wine={row}
                        />
                      ))}
                  </TableRow>
                </Fragment>
            )})}
          </TableBody>
          <TableFooter sx={{position: 'sticky', bottom: 0}}>
            <FooterRow
              columnHeadings={columnHeadings}
              totalBottles={totalBottles}
            />
          </TableFooter>
        </Table>
      </TableContainer>
    </Box>
  );
}
