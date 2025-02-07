'use client'

import { useState, ChangeEvent } from 'react';
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
import { Wine } from '../hooks/useWines';

type WineInputDialogProps = {
  categories: string[],
  defaultWineState: Wine,
  onSubmit: (wineState: Wine) => Promise<void>
} 

const defaultErrorState = {
  Category: false,
  Producer: false,
  Label: false,
  Quantity: false,
  Notes: false
}

export default function WineInputDialog({ defaultWineState, categories, onSubmit }: WineInputDialogProps) {
    const [open, setOpen] = useState(false);
    const [ wineState, setWineState ] = useState(defaultWineState)
    const [ submitError, setSubmitError ] = useState(defaultErrorState)

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => {
      setSubmitError(defaultErrorState);
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
        if (error) return;
        onSubmit(wineState);
        setWineState(defaultWineState);
        handleClose();
    }

    return (
      <>
        <Button variant="outlined" onClick={handleClickOpen} sx={{margin: '10px', borderColor: 'black', color: 'black'}}>
          {`${'add'} new wine`}
        </Button>
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
              {categories?.map((option) => (
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
            <Button onClick={handleSubmit}>Submit</Button>
            <Button onClick={handleClose} autoFocus>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
}
