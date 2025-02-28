import React from 'react';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Link from 'next/link';

export default function EditButton({id}: {id: string}) {
  return (
    <Link href={`/dashboard/${id}/edit`}>
      <IconButton aria-label="edit wine" size='small'>
        <EditIcon />
      </IconButton>
    </Link>
  )
}
