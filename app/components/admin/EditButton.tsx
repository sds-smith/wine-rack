
import Link from 'next/link';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

type EditButtonProps = {
  id: string,
  disabled: boolean
}

export default function EditButton({id, disabled}: EditButtonProps) {
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