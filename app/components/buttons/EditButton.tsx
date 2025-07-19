
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Link from 'next/link';
import { Page } from '@/app/utils/data';

type EditButtonProps = {
  id: string,
  page: Page
}

export default function EditButton({id, page}: EditButtonProps) {
  return (
    <Link href={`/dashboard/${id}/edit?page=${page}`}>
      <IconButton aria-label="edit wine" size='small'>
        <EditIcon />
      </IconButton>
    </Link>
  )
}
