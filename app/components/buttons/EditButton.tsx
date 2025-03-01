import React from 'react';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Link from 'next/link';

type EditButtonProps = {
  id: string,
  page: string
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
