'use client'

import { useState, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import WineInputButton from './WineInputButton';
import { Wine } from '../types/wine';

type MongoResponse = {
  status: number,
  success: boolean,
  message?: string
}

type WineInputDialogProps = {
  mode: string,
  categories: string[],
  defaultWineState: Wine,
  onSubmit: (wineState: Wine) => Promise<MongoResponse>
} 

const defaultErrorState = {
  Category: false,
  Producer: false,
  Label: false,
  Quantity: false,
  Notes: false
}

const dialogTitle = {
  ADD: 'Add Wine to Inventory',
  EDIT: 'Edit Wine Inventory Entry'
}

export default function WineInputDialog({ mode, defaultWineState, categories, onSubmit }: WineInputDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [ wineState, setWineState ] = useState(defaultWineState)
  const [ submitError, setSubmitError ] = useState(defaultErrorState)
  const [ loading, setLoading ] = useState(false)

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => {
    setSubmitError(defaultErrorState);
    setWineState(defaultWineState)
    setOpen(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setWineState((ws) => ({
      ...ws,
      [name]: value
    }))
    if (value.length && submitError[name as keyof typeof submitError]) {
      setSubmitError(se => ({
        ...se,
        [name]: false
      }))
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    let error = false;
    Object.keys(submitError).forEach(key => {
      if (!wineState![key as keyof typeof wineState]) {
        setSubmitError(se => ({
          ...se,
          [key]: true
        }))
        error = true;
      }
    })
    if (error) {
      setLoading(false)
      return
    };
    const response = await onSubmit(wineState);
    setLoading(false)
    if (response.success) router.refresh();
    handleClose();
  }

  const handleDelete = async () => {
    setLoading(true)
    const resp = await fetch(`/api`, {
      method: 'DELETE',
      body: JSON.stringify(wineState)
    });
    const response = await resp.json();
    setLoading(false)
    if (response.success) router.refresh();
    handleClose();
  }

  return (
    <>
      <WineInputButton
        mode={mode}
        onClick={handleClickOpen}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="add-wine-dialog-title"
        aria-describedby="add-wine-dialog-description"
      >
        <DialogTitle id="add-wine-dialog-title">
          {dialogTitle[mode as keyof typeof dialogTitle]}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="add-wine-dialog-description">
          </DialogContentText>
          <TextField
            fullWidth
            select
            id="Category" 
            name="Category" 
            label="Category" 
            variant="standard" 
            value={wineState.Category} 
            onChange={handleChange}
            required
            error={submitError.Category}
            helperText={submitError.Category ? 'Please select a Category' : ''}
          >
            {Object.values(categories)?.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField fullWidth name='Varietal' id="Varietal" label="Varietal" variant="standard" value={wineState.Varietal} onChange={handleChange} />
          <TextField fullWidth name='Country' id="Country" label="Country" variant="standard" value={wineState.Country} onChange={handleChange} />
          <TextField fullWidth name='Vintage' id="Vintage" label="Vintage" variant="standard" value={wineState.Vintage} onChange={handleChange} />
          <TextField 
            fullWidth 
            name='Producer' id="Producer" label="Producer" variant="standard" 
            value={wineState.Producer} 
            onChange={handleChange} 
            required error={submitError.Producer} helperText={submitError.Producer ? 'Producer cannot be empty' : ''}
          />
          <TextField 
            fullWidth 
            name='Label' id="Label" label="Label" variant="standard" 
            value={wineState.Label} 
            onChange={handleChange} 
            required error={submitError.Label} helperText={submitError.Label ? 'Label cannot be empty' : ''}
          />
          <TextField fullWidth name='Appellation' id="Appellation" label="Appellation" variant="standard" value={wineState.Appellation} onChange={handleChange} />
          <TextField fullWidth name='Ready' id="Ready" label="Ready" variant="standard" value={wineState.Ready} onChange={handleChange} />
          <TextField fullWidth name='Source' id="Source" label="Source" variant="standard" value={wineState.Source} onChange={handleChange} />
          <FormControl sx={{width: '100%', marginTop: '15px'}}>
            <InputLabel htmlFor="Price">Price</InputLabel>
            <Input
              fullWidth 
              name='Price' 
              id="Price" 
              value={wineState.Price} 
              onChange={handleChange}
              type='text'
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
            />
          </FormControl>
          <TextField fullWidth name='Acquired' id="Acquired" label="Acquired" variant="standard" value={wineState.Acquired} onChange={handleChange} />
          <TextField 
            fullWidth 
            select 
            name='Notes' id="Notes" label="Notes" variant="standard" 
            value={wineState.Notes} 
            onChange={handleChange} 
            required error={submitError.Notes} helperText={submitError.Notes ? 'Please indicate whether notes exist for this wine' : ''}
          >
            <MenuItem value='Yes' >Yes</MenuItem>
            <MenuItem value='No' >No</MenuItem>
          </TextField>
          <TextField 
            fullWidth 
            name='Quantity' id="Quantity" label="Quantity" variant="standard" 
            value={wineState.Quantity} 
            onChange={handleChange} 
            required error={submitError.Quantity} helperText={submitError.Quantity ? 'Please enter a Quantity' : ''}
          />
          <TextField fullWidth name='Comments' id="Comments" label="Comments" variant="standard" value={wineState.Comments} onChange={handleChange} multiline rows={4} />
        </DialogContent>
        <DialogActions>
          { mode === 'EDIT' && <ConfirmationDialog handleConfirm={handleDelete} disabled={loading} /> }
          <Button onClick={handleSubmit} disabled={loading} >Submit</Button>
          <Button onClick={handleClose} disabled={loading} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

function ConfirmationDialog({handleConfirm, disabled}: {handleConfirm: ()=>void, disabled: boolean}) {
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