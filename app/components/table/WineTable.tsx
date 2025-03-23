
// import { Fragment } from 'react';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableRow from '@mui/material/TableRow';
// import TableFooter from '@mui/material/TableFooter';
// import Paper from '@mui/material/Paper';
// import Box from '@mui/material/Box';
// import TableControlPanel from './TableControlPanel';
// import SortableTableHead from './SortableTableHead';
// import EditButton from '../buttons/EditButton';
// import TableBodyCell from './TableBodyCell';
// import FooterRow from './FooterRow';
import { getWineData, 
  // getCategories, columns 
  // 
} from '@/app/utils/data';
// import { Wine } from '../../types/wine';
// import { grey } from '@mui/material/colors';


// function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

// const Spacer = ({columns} : {columns: string[]}) => <TableRow sx={{height: '20px', borderBottom: '1px solid rgba(128, 128, 128, 0.2)'}}><><TableCell sx={{ backgroundColor: grey[200], }}/>{columns.map(c => <TableCell key={c} sx={{ backgroundColor: grey[200], }}/>)}</></TableRow>

type WineTableProps = {
  page: string,
  searchParams?: { 
    filter_by_category?: string 
    order?: string 
    orderBy?: string 
  }, 
}

export default async function WineTable({ page, searchParams={}} : WineTableProps) {
  const { filter_by_category, order, orderBy } = searchParams;
  const { wineList: wines, metaData : { totalBottles } } = await getWineData(page);
  const cats = [...new Set(wines.map(wine => wine.Category))]
  console.log({cats})
  console.log({ filter_by_category, order, orderBy })
  // console.log({wines, totalBottles})
  // const columnHeadings = columns.filter(h => ![ 'Category' ].includes(h));
  // const { categoriesByCode } = await getCategories();
  // console.log({categoriesByCode})
  // const filterByCategory = (arr: Wine[]) => filter_by_category ? arr.filter(w => w.Category === filter_by_category) : arr;
  // const sort = (arr: Wine[]) => orderBy ? arr.sort((a, b) => order === 'desc' ? descendingComparator(a, b, orderBy) : descendingComparator(b, a, orderBy)) : arr;
  // const wineList = sort(filterByCategory(wines));

  return (
    <>{cats.map(cat=><div key={cat}>{cat}</div>)}<div>{totalBottles}</div></>
    
    // <Box >
    //   <TableContainer component={Paper} sx={{ overflow: "auto", maxHeight: {xs: "70vh", lg:"85vh"} }}>
    //     <TableControlPanel categoriesByCode={categoriesByCode} page={page} />
    //     <Table size="small" aria-label="a dense table">
    //       <SortableTableHead columns={columnHeadings}/>
    //       <TableBody>
    //         {wineList.map((row: Wine, idx: number) => {
    //           return (
    //             <Fragment key={row.ID}>
    //               { idx > 0 && row[orderBy || 'Category'] !== wineList[idx-1][orderBy || 'Category'] && <Spacer columns={columnHeadings} />}
    //               <TableRow
    //                 // sx={{ '&:last-child td, &:last-child th': { border: 0 }, }}
    //               >
    //                 <TableCell align="center" size='small' >
    //                   <EditButton
    //                     id={row.ID!}
    //                     page={page}
    //                   />
    //                 </TableCell>
    //                   { columnHeadings.map(h => (
    //                     <TableBodyCell 
    //                       key={h} 
    //                       columnId={h}
    //                       wine={row}
    //                       page={page}
    //                     />
    //                   ))}
    //               </TableRow>
    //             </Fragment>
    //         )})}
    //       </TableBody>
    //       <TableFooter sx={{position: 'sticky', bottom: 0}}>
    //         <FooterRow
    //           columnHeadings={columnHeadings}
    //           totalBottles={totalBottles}
    //         />
    //       </TableFooter>
    //     </Table>
    //   </TableContainer>
    // </Box>
  );
}
