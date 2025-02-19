'use client'

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { Wine } from '../types/wine';

export default function ArchiveModal({open, handleClose, handleConfirm}: {handleClose: () => void, open: boolean, handleConfirm: ()=>void,}) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="add-wine-dialog-title"
      aria-describedby="add-wine-dialog-description"
    >
      <DialogTitle id="add-wine-dialog-title">
        Would You Like to Archive this Wine?
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Wines with Quantity of zero may be archived.
        </DialogContentText>
        <DialogContentText>
          Archived wines are retained in the database but will not appear in the table.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleConfirm}>Yes</Button>
        <Button onClick={handleClose} autoFocus>No</Button>
      </DialogActions>
    </Dialog>
  )
}
