'use client'

import { useState, useEffect } from 'react';
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


export default function AlertDialog({ ID, categories}) {
    const [open, setOpen] = useState(false);
    const [ newWine, setNewWine ] = useState({
        ID,
        Category: '',
        Varietal: '',
        Country: '',
        Vintage: '',
        Producer: '',
        Label: '',
        Appellation: '',
        Ready: '',
        Source: '',
        Price: '',
        Acquired: '',
        Notes: '',
        Quantity: '',
        Comments: '',
    })

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = (e) => {
        console.log({target: e.target})
        const { name, value } = e.target;
        console.log({name, value})
        setNewWine((newWine) => ({
            ...newWine,
            [name]: value
        }))
    }
useEffect(()=>console.log({newWine}),[newWine])
    return (
      <>
        <Button variant="outlined" color='black' onClick={handleClickOpen} sx={{margin: '10px'}}>
          ADD NEW WINE
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
                value={newWine.Category} 
                onChange={handleChange}
                required
            >
              {categories?.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <TextField fullWidth name='Varietal' id="Varietal" label="Varietal" variant="standard" value={newWine.Varietal} onChange={handleChange} />
            <TextField fullWidth name='Country' id="Country" label="Country" variant="standard" value={newWine.Country} onChange={handleChange} />
            <TextField fullWidth name='Vintage' id="Vintage" label="Vintage" variant="standard" value={newWine.Vintage} onChange={handleChange} />
            <TextField fullWidth name='Producer' id="Producer" label="Producer" variant="standard" value={newWine.Producer} onChange={handleChange} required />
            <TextField fullWidth name='Label' id="Label" label="Label" variant="standard" value={newWine.Label} onChange={handleChange} required />
            <TextField fullWidth name='Appellation' id="Appellation" label="Appellation" variant="standard" value={newWine.Appellation} onChange={handleChange} />
            <TextField fullWidth name='Ready' id="Ready" label="Ready" variant="standard" value={newWine.Ready} onChange={handleChange} />
            <TextField fullWidth name='Source' id="Source" label="Source" variant="standard" value={newWine.Source} onChange={handleChange} />
            <FormControl fullWidth name='Price' id="Price" variant="standard" value={newWine.Price} onChange={handleChange}>
              <InputLabel htmlFor="standard-adornment-amount">Price</InputLabel>
              <Input
                id="standard-adornment-amount"
                label='Price'
                type='text'
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
              />
            </FormControl>
            <TextField fullWidth name='Acquired' id="Acquired" label="Acquired" variant="standard" value={newWine.Acquired} onChange={handleChange} />
            <TextField fullWidth select name='Notes' id="Notes" label="Notes" variant="standard" value={newWine.Notes} onChange={handleChange} required >
                <MenuItem value='Yes' >Yes</MenuItem>
                <MenuItem value='No' >No</MenuItem>
            </TextField>
            <TextField fullWidth name='Quantity' id="Quantity" label="Quantity" variant="standard" value={newWine.Quantity} onChange={handleChange} required />
            <TextField fullWidth name='Comments' id="Comments" label="Comments" variant="standard" value={newWine.Comments} onChange={handleChange} multiline rows={4} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Submit</Button>
            <Button onClick={handleClose} autoFocus>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
}
