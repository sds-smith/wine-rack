'use client'

import { ReactNode, useEffect, Fragment } from "react";
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
import { Wine, CategoriesByCode } from '../../types/wine';
import { grey } from "@mui/material/colors";

type PrintableTableProps = {
  columns: string[], 
  chunkedWineList: Wine[][], 
  totalBottles: number,
  page: string,
  categoriesByCode: CategoriesByCode
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

const Spacer = ({columns} : {columns: string[]}) => <TableRow sx={{height: '20px', borderBottom: '1px solid rgba(128, 128, 128, 0.2)'}}><>{columns.map(c => <TableCell key={c} sx={{ backgroundColor: grey[200], }}/>)}</></TableRow>


export default function PrintableTable({ columns, chunkedWineList, totalBottles, page, categoriesByCode }: PrintableTableProps) {
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
              {wineList.map((row: Wine, idx: number) => (
                  <Fragment key={row.ID} >
                    { idx > 0 && row['Category'] !== wineList[idx-1]['Category'] && <Spacer columns={columnHeadings} />}
                    <TableRow >
                      { columnHeadings.map(h => {
                        const sx = h === 'Varietal' ? {backgroundColor: categoriesByCode[row.Category].color || ''} : undefined
                        return <StyledTableCell key={h} sx={sx} >{getCellContent(h, row)}</StyledTableCell>
                      })}
                    </TableRow>
                  </Fragment>
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
