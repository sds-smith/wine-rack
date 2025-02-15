'use client'

import { useEffect } from "react";
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
import { Wine } from '../types/wine';
import { getWines } from "../utils/getWines";
import { useWineData } from "../hooks/useWineData";

export default function PrintableTable() {
  const router = useRouter();

  const { columns } = getWines();
  const { chunkedWineList, metaData: { totalBottles } } = useWineData();

  const columnHeadings = columns.filter(h => ![ 'Category' ].includes(h));
  
  useEffect(() => {
    window.print();
    router.push('/')
  }, [router])

  return (
    <Box >
      { chunkedWineList.map((wineList, key) => (
        <TableContainer key={key} component={Paper} sx={{ overflow: "auto", height: "100vh" }}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead sx={{position: 'sticky', top: 0}}>
              <TableRow sx={{background: 'black'}}>
                { columnHeadings.map(h => <TableCell key={h} align="center" sx={{color: 'white'}}>{h}</TableCell>)}
              </TableRow>
            </TableHead>
            <TableBody>
              {wineList.map((row: Wine) => (
                <TableRow
                  key={`${row.Producer}-${row.Label}-${row.Vintage}`}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  { columnHeadings.map(h => <TableCell key={h} align="center">{row[h as keyof Wine]?.toString()}</TableCell>)}
                </TableRow>
              ))}
            </TableBody>
            { key === chunkedWineList.length - 1 &&         
              <TableFooter sx={{position: 'sticky', bottom: 0}}>
                <TableRow sx={{background: 'black'}}>
                  { columnHeadings.map((h)=> 
                    <TableCell key={h} align="center" sx={{color: 'white'}}>
                      {h === 'Varietal' ? 'Total' : h === 'Quantity' ? `${totalBottles}` : ''}
                    </TableCell>
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
