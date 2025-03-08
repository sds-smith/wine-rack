
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

export default function PasswordChangedDialog() {
  const handleClose = async () => {
    'use server'
    revalidatePath('/dashboard/current_inventory')
    redirect('/dashboard/current_inventory')
  }

  return (
    <Dialog
      open={true}
      aria-labelledby="password-changed-dialog-title"
      aria-describedby="password-changed-dialog-description"
    >
      <DialogTitle id="password-changed-dialog-title">
        Your Password has been successfully Changed.
      </DialogTitle>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>OK</Button>
      </DialogActions>
    </Dialog>
  )
}
