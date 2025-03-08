
import IconButton from '@mui/material/IconButton';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Link from 'next/link';

export default function AddButton() {

  return (
    <Link href={`/dashboard/current_inventory/new`}>
      <IconButton aria-label="add wine" size='small'>
        <AddBoxIcon />
      </IconButton>
    </Link>
  )
}
