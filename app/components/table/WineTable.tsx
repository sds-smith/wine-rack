
import { Fragment } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TableControlPanel from './TableControlPanel';
import SortableTableHead from './SortableTableHead';
import EditButton from '../buttons/EditButton';
import TableBodyCell from './TableBodyCell';
import FooterRow from './FooterRow';
import { 
  getWineData, 
  getCategories, 
  columns,
  Page
} from '@/app/utils/data';
import { Wine, Ready } from '../../types/wine';
import { grey } from '@mui/material/colors';

function processComparator<T>(wine: Wine, orderBy: T) {
  if (!['open','close'].includes(`${orderBy}`)) return wine[orderBy as keyof Wine];
  let rawComparator = wine.Ready?.[orderBy as keyof Ready];
  if (String(rawComparator).length === 2) rawComparator = `20${rawComparator}`;

  return wine.Ready?.open === 'now'
  ? orderBy === 'open' 
    ? `${new Date().getFullYear()}`.slice(-2) : -2
  : !wine.Ready?.open
    ? orderBy === 'open' ? `${new Date().getFullYear()}`.slice(-2) : 100
  : orderBy === 'close' && !wine.Ready?.close && !!wine.Ready?.open ? 100
  : rawComparator ? `${new Date(rawComparator).getFullYear()}`.slice(-2) : `${new Date().getFullYear()}`.slice(-2)
}

function descendingComparator(a: Wine, b: Wine, orderBy: string) {
  const B = processComparator(b, orderBy);
  const A = processComparator(a, orderBy);
  if (B < A) {
    return -1;
  }
  if (B > A) {
    return 1;
  }
  return 0;
}

export const Spacer = ({columns} : {columns: string[]}) => <TableRow sx={{height: '20px', borderBottom: '1px solid rgba(128, 128, 128, 0.2)'}}><><TableCell sx={{ backgroundColor: grey[200], }}/>{columns.map(c => <TableCell key={c} sx={{ backgroundColor: grey[200], }}/>)}</></TableRow>

type WineTableProps = {
  page: Page,
  searchParams?: { 
    filter_by_category?: string 
    order?: string 
    orderBy?: string 
  }, 
}

export default async function WineTable({ page, searchParams={}} : WineTableProps) {
  const { filter_by_category, order, orderBy } = searchParams;
  const { wineList: wines, metaData : { totalBottles: ttl } } = await getWineData(page);
  const { categoriesByCode } = await getCategories();
  const columnHeadings = columns.filter(h => !['Category'].includes(h))
  const filterByCategory = (arr: Wine[]) => filter_by_category ? arr.filter(w => w.Category === filter_by_category) : arr;
  const sort = (arr: Wine[]) => orderBy 
    ? arr.sort((a, b) => {
      // const A = ['open','close'].includes(orderBy) ? a.Ready : a;
      // const B = ['open','close'].includes(orderBy) ? b.Ready : b;
      return order === 'desc' 
        ? descendingComparator(a, b, orderBy) 
        : descendingComparator(b, a, orderBy) })
    : arr;
  const wineList = sort(filterByCategory(wines));
  const totalBottles = filter_by_category 
    ? wineList.reduce((acc: number, curr: Wine) => acc + Number(curr.Quantity || 0), 0) 
    : ttl;

  return (
    <Box >
      <TableContainer component={Paper} sx={{ overflow: "auto", maxHeight: {xs: "70vh", md:"85vh"} }}>
        <TableControlPanel categoriesByCode={categoriesByCode} page={page} />
        <Table size="small" aria-label="a dense table">
          <SortableTableHead columns={columnHeadings}/>
          <TableBody>
            {wineList.map((row: Wine, idx: number) => {
              return (
                <Fragment key={row.ID}>
                  { idx > 0 && row[orderBy || 'Category'] !== wineList[idx-1][orderBy || 'Category'] && <Spacer columns={columnHeadings} />}
                  <TableRow >
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
                          page={page}
                          categoryColor={categoriesByCode[row.Category].color || ''}
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
