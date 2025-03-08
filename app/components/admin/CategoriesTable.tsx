import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { lightBlue } from '@mui/material/colors';
import { getCategories } from '@/app/utils/data';
import { Category } from '@/app/types/wine';

import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Link from 'next/link';

type EditButtonProps = {
  id: string,
  disabled: boolean
}
function EditButton({id, disabled}: EditButtonProps) {
  return (
    <>
      { disabled
        ? <IconButton disabled aria-label="edit category" size='small'>
            <EditIcon />
          </IconButton>
        : <Link href={`/admin/manage_categories/${id}`}>
            <IconButton aria-label="edit category" size='small'>
              <EditIcon />
            </IconButton>
          </Link>
      }
    </>

  )
}

function DeleteButton() {
  return (
    <IconButton disabled aria-label="delete category" size='small'>
      <DeleteIcon />
    </IconButton>
  )
}

type CategoriesTableProps = {
  disabled: boolean,
  editID?: string
}

export default async function CategoriesTable({ disabled, editID } : CategoriesTableProps) {
  const { categories } = await getCategories();
  const columnHeadings: string[] = ['Code', 'Title', 'Group'];

  return (
    <Box >
      <h4>Categories</h4>
      <TableContainer component={Paper} sx={{ overflow: "auto", height: "83vh", marginTop: '10px' }}>
        <Table size="small" aria-label="a dense table">
          <TableHead sx={{position: 'sticky', top: 0}}>
            <TableRow sx={{background: 'black'}}>
              <TableCell></TableCell>
              { columnHeadings.map(h => <TableCell key={h} align="center" sx={{color: 'white'}}>{h}</TableCell>) }
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((row: Category) => {
              return (
                  <TableRow key={row.code} sx={{backgroundColor: row.ID === editID ? lightBlue[50] : 'unset'}} >
                      <TableCell>
                        <EditButton
                          id={row.ID}
                          disabled={disabled}
                        />
                      </TableCell>
                      { columnHeadings.map(h => (
                        <TableCell 
                          key={h} 
                           align="center"
                        >
                            {row[h.toLocaleLowerCase() as keyof Category]}
                        </TableCell>
                      ))}
                      <TableCell>
                        <DeleteButton />
                      </TableCell>
                  </TableRow>
            )})}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}
