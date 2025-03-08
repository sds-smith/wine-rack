
import Link from 'next/link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';

type AddButtonProps = {
  disabled: boolean
}

export default function AddButton({ disabled }: AddButtonProps) {
  return (
    <Box sx={{marginTop: '20px'}}>
      { disabled
        ? <Button variant='outlined' disabled aria-label="edit category" size='small'>
            <LibraryAddIcon />
            Add New Category
          </Button>
        : <Link href={`/admin/manage_categories/new`}>
            <Button variant='outlined' aria-label="edit category" size='small'>
              <LibraryAddIcon />
              <span style={{marginLeft: '10px'}}>Add New Category</span>
            </Button>
          </Link>
      }
    </Box>
  )
}