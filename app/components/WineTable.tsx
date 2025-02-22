
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
import PrintButton from './PrintButton';
import AddWineDialog from './AddWineDialog';
import EditWineDialog from './EditWineDialog';
import TableBodyCell from './TableBodyCell';
import FooterRow from './FooterRow';
import { OptimisticFormProvider } from '../context/OptimisticFormContext';
import { getWines } from '../utils/getWines';
import { Wine } from '../types/wine';

const Spacer = () => <TableRow sx={{height: '20px', borderBottom: '1px solid rgba(128, 128, 128, 0.2)'}}/>

export default async function WineTable() {
  const { 
    wineList, 
    columns, 
    categories 
  } = await getWines();
  const columnHeadings = columns.filter(h => ![ 'Category' ].includes(h));

  return (
    <OptimisticFormProvider wineList={wineList} >
      <Box >
        <AddWineDialog
          categories={categories}
        />
        <PrintButton />
        <TableContainer component={Paper} sx={{ overflow: "auto", height: "78vh" }}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead sx={{position: 'sticky', top: 0}}>
              <TableRow sx={{background: 'black'}}>
                <TableCell size='small' sx={{width: '10px'}}></TableCell>
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
                      <TableCell align="center" size='small' sx={{width: '10px'}}>
                        <EditWineDialog
                          wineID={row.ID!}
                          categories={categories}
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
              />
            </TableFooter>
          </Table>
        </TableContainer>
      </Box>
    </OptimisticFormProvider>
  );
}
