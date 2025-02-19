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
import WineInputButton from './WineInputButton';
import { OptimisticFormContext } from '../context/OptimisticFormContext';
import { Wine, WineField, WineInput } from '../types/wine';

type MongoResponse = {
  status: number,
  success: boolean,
  message?: string
}

type WineInputDialogProps = {
  categories: string[],
  defaultWineInputState: WineInput,
  onSubmit: (wineState: Wine) => Promise<MongoResponse>
} 

const defaultErrorState = {
  Category: false,
  Producer: false,
  Label: false,
  Quantity: false,
  Notes: false
}

export default function WineInputDialog({ defaultWineInputState, categories }: WineInputDialogProps) {
  const router = useRouter();
  const { loading, saveWine } = useContext(OptimisticFormContext);

  const [ open, setOpen ] = useState(false);
  const [ wineState, setWineState ] = useState(defaultWineInputState)
  const [ submitError, setSubmitError ] = useState(defaultErrorState)

  const handleClickOpen = () => setOpen(true);

  const handleClose = () => {
    setSubmitError(defaultErrorState);
    setWineState(defaultWineInputState)
    setOpen(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'Quantity' && Number(value) < 0) return
    const newWineState = (ws: WineInput) => {
      const { key, val } = name.startsWith('Ready')
        ? {
          key: 'Ready',
          val: {
            ...ws.Ready,
            [name.split('-')[1]] : value
          }
        }
        : { key: name, val: value }
      return {
        ...ws,
        [key] : val
      }
    }
    setWineState((ws) => newWineState(ws))
    
    if (value.toString().length && submitError[name as keyof typeof submitError]) {
      setSubmitError(se => ({
        ...se,
        [name]: false
      }))
    }
  }

  const validateRequiredFields = () => {
    let error = false;
    const getErrorState = (wineField: WineField) => !wineField;
    Object.keys(submitError).forEach(key => {
      if (getErrorState(wineState[key as keyof typeof wineState])) {
        setSubmitError(se => ({
          ...se,
          [key]: true
        }))
        error = true;
      }
    })
    return error
  }

  const handleSubmit = async () => {
    const error = validateRequiredFields();
    if (error) {
      return error
    };
    const response = await saveWine(wineState, 'new')
    if (response.success) router.refresh();
    handleClose();
  }

  return (
    <>
      <WineInputButton
        mode={'ADD'}
        onClick={handleClickOpen}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="add-wine-dialog-title"
        aria-describedby="add-wine-dialog-description"
      >
        <DialogTitle id="add-wine-dialog-title">
          Add Wine to Inventory
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
          <Box sx={{width: '100%', marginTop: '15px'}}>
            <TextField sx={{width: '50%'}}  name='Ready-open' id="Ready-open" label="Ready (window open)" variant="standard" value={wineState.Ready.open} onChange={handleChange} />
            <TextField sx={{width: '50%'}}  name='Ready-close' id="Ready-close" label="Ready (window close)" variant="standard" value={wineState.Ready.close} onChange={handleChange} />
          </Box>
          <TextField fullWidth name='Source' id="Source" label="Source" variant="standard" value={wineState.Source} onChange={handleChange} />
          <FormControl sx={{width: '100%', marginTop: '15px'}}>
            <InputLabel htmlFor="Price">Price</InputLabel>
            <Input
              fullWidth 
              name='Price' 
              id="Price" 
              value={wineState.Price ?? ''} 
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
            value={`${wineState.Notes}`} 
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
            value={wineState.Quantity} 
            onChange={handleChange} 
            required error={submitError.Quantity} helperText={submitError.Quantity ? 'Please enter a Quantity' : ''}
          />
          <TextField fullWidth name='Comments' id="Comments" label="Comments" variant="standard" value={wineState.Comments} onChange={handleChange} multiline rows={4} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} disabled={loading} >Submit</Button>
          <Button onClick={handleClose} disabled={loading} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}