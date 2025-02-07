import React from 'react';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';

type EditWineButtonProps = {
  mode: string,
  onClick: () => void
}

export default function EditWineButton({ mode, onClick }: EditWineButtonProps) {
  return (
  <>
    { mode === 'EDIT'
      ? <IconButton aria-label="edit" size='small' onClick={onClick}>
          <EditIcon />
        </IconButton>
      : <Button variant="outlined" onClick={onClick} sx={{margin: '10px', borderColor: 'black', color: 'black'}}>
          {`${mode} new wine`}
        </Button>
    }
  </>
  )
}
