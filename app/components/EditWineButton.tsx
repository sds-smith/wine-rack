import React from 'react';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

export default function EditWineButton() {
  return (
    <IconButton aria-label="edit" size='small'>
      <EditIcon />
    </IconButton>
  )
}
