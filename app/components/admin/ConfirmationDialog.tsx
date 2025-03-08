'use client'

import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ConfirmationDialog({handleConfirm, disabled}: {handleConfirm: ()=>void, disabled: boolean}) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  return (
    <>
      <IconButton onClick={handleOpen} disabled={disabled} aria-label="delete category" size='small'>
        <DeleteIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="delete-category-dialog-title"
        aria-describedby="delete-category-dialog-description"
      >
        <DialogTitle id="delete-category-dialog-title">
          Are you Sure?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            You are about to permanently delete this Category entry from the database.
          </DialogContentText>
          <DialogContentText>
            This will be irreversible.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirm}>Confirm</Button>
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}