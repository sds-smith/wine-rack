import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { categories } from '@/app/utils/data';
import { Category } from '@/app/types/wine';

export default function CategoriesTable() {
    const columnHeadings: string[] = ['Code', 'Title', 'Group']
  return (
    <Box >
      <h4>Categories</h4>
      <TableContainer component={Paper} sx={{ overflow: "auto", height: "83vh", marginTop: '10px' }}>
        <Table size="small" aria-label="a dense table">
          <TableHead sx={{position: 'sticky', top: 0}}>
            <TableRow sx={{background: 'black'}}>
              { columnHeadings.map(h => <TableCell key={h} align="center" sx={{color: 'white'}}>{h}</TableCell>)}
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((row: Category) => {
              return (
                  <TableRow key={row.code} >
                      { columnHeadings.map(h => (
                        <TableCell 
                          key={h} 
                           align="center"
                        >
                            {row[h.toLocaleLowerCase() as keyof Category]}
                        </TableCell>
                      ))}
                  </TableRow>
            )})}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}
