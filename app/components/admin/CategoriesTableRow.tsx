
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { lightBlue } from '@mui/material/colors';
import ConfirmationDialog from './ConfirmationDialog';
import { Category } from '@/app/types/wine';

import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Link from 'next/link';
import { sorted_wines } from '@/app/utils/data.sorted_wines';
import { deleteCategory } from '@/app/utils/actions.admin';

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

type CategoriesTableRowProps = {
  row: Category,
  disabled: boolean,
  isEdit: boolean
}

export default async function CategoriesTableRow({ row, disabled, isEdit } : CategoriesTableRowProps) {
  const columnHeadings: string[] = ['Code', 'Title', 'Group'];

  const categoryKey = row.code as keyof typeof sorted_wines.Category;
  const hasWines = sorted_wines.Category[categoryKey] >0;

  async function handleConfirm() {
    'use server'
    await deleteCategory(row.ID);
  }

  return (
    <TableRow key={row.code} sx={{backgroundColor: isEdit ? lightBlue[50] : 'unset'}} >
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
        <ConfirmationDialog 
          disabled={hasWines || disabled}
          handleConfirm={handleConfirm}
        />
      </TableCell>
    </TableRow>
  )
}