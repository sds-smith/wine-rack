'use client'

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import Paper from '@mui/material/Paper';
import { Wine } from '../../types/wine';

type PrintableTableProps = {
  columns: string[], 
  chunkedWineList: Wine[][], 
  totalBottles: number,
  page: string
}

const boolToYesNo = {
  true: 'Yes',
  false: 'No',
  null: ''
}

const getCellContent = (columnId: string, wine: Wine) => {
    return columnId === 'Ready'
      ? !wine.Ready.close || wine.Ready.close === wine.Ready.open ? `${wine.Ready.open }`: `${wine.Ready.open} - ${wine.Ready.close}`
      : columnId === 'Notes' ? boolToYesNo[`${wine.Notes}`] 
      : wine[columnId as keyof Wine] ? `${wine[columnId as keyof Wine]}` : '';
}

const StyledTableCell = ({children, sx} : {children: ReactNode, sx?: {[key: string] : string}}) => {
  return <TableCell align="center" sx={{...sx, fontSize: '18px'}}>{children}</TableCell>
}

export default function PrintableTable({ columns, chunkedWineList, totalBottles, page }: PrintableTableProps) {
  const router = useRouter();

  const columnHeadings = columns.filter(h => ![ 'Category' ].includes(h));
  
  useEffect(() => {
    window.print();
    router.push(`/dashboard/${page !== 'dashboard' ? page : ''}`)
  }, [router, page])

  return (
    <Box >
      { chunkedWineList.map((wineList, key) => (
        <TableContainer key={key} component={Paper} sx={{ overflow: "auto", height: "100vh" }}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead sx={{position: 'sticky', top: 0}}>
              <TableRow sx={{background: 'black'}}>
                { columnHeadings.map(h => <StyledTableCell key={h} sx={{color: 'white'}}>{h}</StyledTableCell>)}
              </TableRow>
            </TableHead>
            <TableBody>
              {wineList.map((row: Wine) => (
                <TableRow
                  key={row.ID}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  { columnHeadings.map(h => <StyledTableCell key={h} >{getCellContent(h, row)}</StyledTableCell>)}
                </TableRow>
              ))}
            </TableBody>
            { key === chunkedWineList.length - 1 &&         
              <TableFooter sx={{position: 'sticky', bottom: 0}}>
                <TableRow sx={{background: 'black'}}>
                  { columnHeadings.map((h)=> 
                    <StyledTableCell key={h} sx={{color: 'white'}}>
                      {h === 'Varietal' ? 'Total' : h === 'Quantity' ? `${totalBottles}` : ''}
                    </StyledTableCell>
                  )}
                </TableRow>
              </TableFooter>
            }
          </Table>
        </TableContainer>
      ))}
    </Box>
  )
}
