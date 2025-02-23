'use client'

import { useState, useContext, ChangeEvent } from 'react';
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
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import WineInputButton from './WineInputButton';
import ArchiveModal from './ArchiveModal';
import ConfirmationDialog from './ConfirmationDialog';
import { OptimisticFormContext } from '../context/OptimisticFormContext';
import { Wine, WineField, defaultWineState } from '../types/wine';

type EditWineDialogProps = {
  wineID: string,
  categories: string[],
} 

const defaultErrorState = {
  Category: false,
  Producer: false,
  Quantity: false,
  Notes: false
}

export default function EditWineDialog({wineID, categories}: EditWineDialogProps) {  
  const router = useRouter();
  const { loading, winesByID, onChangeWine, resetWinesByID, saveWine, deleteWine } = useContext(OptimisticFormContext);

  const [ open, setOpen ] = useState(false);
  const [ submitError, setSubmitError ] = useState(defaultErrorState)
  const [ openArchiveModal, setOpenArchiveModal ] = useState(false)

  const wine = winesByID[wineID] || defaultWineState

  const handleClickOpen = () => {
    router.refresh();
    setOpen(true);
  }

  const handleClose = () => {
    setSubmitError(defaultErrorState);
    setOpen(false);
  };

  const handleCancel = () => {
    resetWinesByID();
    handleClose();
  }
  
  const handleOpenArchiveModal  = () => setOpenArchiveModal(true);
  const handleCloseArchiveModal = () => {
    setOpenArchiveModal(false);
    handleSubmit(wine)
  };
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'Quantity' && Number(value) < 0) return
    onChangeWine(wineID, name, value)
    if (value.toString().length && submitError[name as keyof typeof submitError]) {
      setSubmitError(se => ({
        ...se,
        [name]: false
      }))
    }
  }

  const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    console.log({ name, checked })
    onChangeWine(wineID, name, `${checked}`)
  }
  
  const validateRequiredFields = () => {
    let error = false;
    const getErrorState = (wineField: WineField) => !wineField && wineField !== false;
    Object.keys(submitError).forEach(key => {
      if (!(key === 'Quantity') && getErrorState(wine[key as keyof typeof wine])) {
        setSubmitError(se => ({
          ...se,
          [key]: true
        }))
        error = true;
      }
    })
    return error
  }
  
  const handleClickSubmit = async () => {
    if (!Number(wine.Quantity)) {
      handleOpenArchiveModal()
    } else {
      handleSubmit(wine);
    };
  }
  
  const handleSubmit = async (wine: Wine) => {
    const error = validateRequiredFields();
    if (error) {
      return error
    };
    const response = await saveWine(wine);
    console.log('[handleSubmit]', {response})
    if (response.success) router.refresh();
    handleClose();
  }
  
  const handleDelete = async () => {
    const response = await deleteWine(wine);
    if (response.success) router.refresh();
    handleClose();
  }

  const handleConfirmArchive = async () => {
    const wineToSave = {
      ...wine,
      Archived: true
    }
    handleCloseArchiveModal();
    handleSubmit(wineToSave)
  }

  return (
    <>
      <WineInputButton
        mode={'EDIT'}
        onClick={handleClickOpen}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="add-wine-dialog-title"
        aria-describedby="add-wine-dialog-description"
      >
        <DialogTitle id="add-wine-dialog-title">
          {'Edit Wine Inventory Entry'}
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
            value={wine.Category} 
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
          <TextField fullWidth name='Varietal' id="Varietal" label="Varietal" variant="standard" value={wine.Varietal} onChange={handleChange} />
          <TextField fullWidth name='Country' id="Country" label="Country" variant="standard" value={wine.Country} onChange={handleChange} />
          <TextField fullWidth name='Vintage' id="Vintage" label="Vintage" variant="standard" value={wine.Vintage} onChange={handleChange} />
          <TextField 
            fullWidth 
            name='Producer' id="Producer" label="Producer" variant="standard" 
            value={wine.Producer} 
            onChange={handleChange} 
            required error={submitError.Producer} helperText={submitError.Producer ? 'Producer cannot be empty' : ''}
          />
          <TextField 
            fullWidth 
            name='Label' id="Label" label="Label" variant="standard" 
            value={wine.Label} 
            onChange={handleChange} 
          />
          <TextField fullWidth name='Appellation' id="Appellation" label="Appellation" variant="standard" value={wine.Appellation} onChange={handleChange} />
          <Box sx={{width: '100%', marginTop: '15px'}}>
            <TextField sx={{width: '50%'}}  name='Ready-open' id="Ready-open" label="Ready (window open)" variant="standard" value={wine.Ready.open} onChange={handleChange} />
            <TextField sx={{width: '50%'}}  name='Ready-close' id="Ready-close" label="Ready (window close)" variant="standard" value={wine.Ready.close} onChange={handleChange} />
          </Box>
          <TextField fullWidth name='Source' id="Source" label="Source" variant="standard" value={wine.Source} onChange={handleChange} />
          <FormControl sx={{width: '100%', marginTop: '15px'}}>
            <InputLabel htmlFor="Price">Price</InputLabel>
            <Input
              fullWidth 
              name='Price' 
              id="Price" 
              value={wine.Price ? wine.Price : ''} 
              onChange={handleChange}
              type='text'
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
            />
          </FormControl>
          <TextField fullWidth name='Acquired' id="Acquired" label="Acquired" variant="standard" value={wine.Acquired} onChange={handleChange} />
          <TextField 
            fullWidth 
            select 
            name='Notes' id="Notes" label="Notes" variant="standard" 
            value={`${wine.Notes}`} 
            onChange={handleChange} 
            required error={submitError.Notes} helperText={submitError.Notes ? 'Please indicate whether notes exist for this wine' : ''}
          >
            <MenuItem value={'null'} ></MenuItem>
            <MenuItem value={'true'} >Yes</MenuItem>
            <MenuItem value={'false'} >No</MenuItem>
          </TextField>
          <TextField 
            fullWidth 
            type='number'
            name='Quantity' id="Quantity" label="Quantity" variant="standard" 
            value={wine.Quantity} 
            onChange={handleChange} 
            required error={submitError.Quantity} helperText={submitError.Quantity ? 'Please enter a Quantity' : ''}
          />
          <TextField fullWidth name='Comments' id="Comments" label="Comments" variant="standard" value={wine.Comments} onChange={handleChange} multiline rows={4} />
        </DialogContent>
        <DialogActions>
          <FormControlLabel 
            sx={{width: '55%', color: 'rgba(0, 0, 0, 0.6)' }} 
            control={<Checkbox checked={wine.GetMore || false } onChange={handleCheck} name='GetMore' inputProps={{ 'aria-label': 'controlled' }} />} 
            label="Get More" 
          />
          <ConfirmationDialog handleConfirm={handleDelete} disabled={loading} /> 
          <Button onClick={handleClickSubmit} disabled={loading} >Submit</Button>
          <Button onClick={handleCancel} disabled={loading} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <ArchiveModal open={openArchiveModal} handleClose={handleCloseArchiveModal} handleConfirm={handleConfirmArchive} />
    </>
  )
}
