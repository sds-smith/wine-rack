'use client'

import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

type ConfirmationDialogProps = {
  handleConfirm: () => void, 
  disabled: boolean
}

export default function ConfirmationDialog({handleConfirm, disabled} : ConfirmationDialogProps) {
    const [open, setOpen] = useState(false);
  
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    return (
      <>
        <Button onClick={handleOpen} disabled={disabled}>Delete</Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="add-wine-dialog-title"
          aria-describedby="add-wine-dialog-description"
        >
          <DialogTitle id="add-wine-dialog-title">
            Are you Sure?
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              You are about to permanently delete this wine entry from the database.
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