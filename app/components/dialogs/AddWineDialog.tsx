
import { redirect } from 'next/navigation';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';
import Input from '@mui/material/Input';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import { createNewWine } from '../../utils/actions.wine';
import { Category } from '@/app/types/wine';

type AddWineDialogProps = {
  categories: Category[],
} 

export default function AddWineDialog({categories}: AddWineDialogProps) {

  const handleClose = async () => {
    'use server'
    redirect('/dashboard/current_inventory')
  }

  return (
    <Dialog
      open
      aria-labelledby="add-wine-dialog-title"
      aria-describedby="add-wine-dialog-description"
    >
      <DialogTitle id="add-wine-dialog-title" sx={{paddingBottom: '0px'}}>
        Add Wine to Inventory
      </DialogTitle>
      <form action={createNewWine} >
        <DialogContent sx={{paddingTop: '0px'}}>
          <Input type='hidden' name='page' id='page' value='dashboard/current_inventory'/>
          <TextField
            fullWidth
            select
            id="Category" 
            name="Category" 
            label="Category" 
            variant="standard"
            defaultValue=' '
          >
            <MenuItem value={' '} ></MenuItem>
            {Object.values(categories)?.map((option) => (
              <MenuItem key={option.code} value={option.code}>
                {`${option.code}  ${option.title}`}
              </MenuItem>
            ))}
          </TextField>
          <TextField fullWidth name='Varietal' id="Varietal" label="Varietal" variant="standard" />
          <TextField fullWidth name='Country' id="Country" label="Country" variant="standard" />
          <TextField fullWidth name='Vintage' id="Vintage" label="Vintage" variant="standard"  />
          <TextField 
            fullWidth 
            name='Producer' id="Producer" label="Producer" variant="standard" 
          />
          <TextField 
            fullWidth 
            name='Label' id="Label" label="Label" variant="standard" 
          />
          <TextField fullWidth name='Appellation' id="Appellation" label="Appellation" variant="standard" />
          <Box sx={{width: '100%', marginTop: '0px'}}>
            <TextField sx={{width: '50%'}}  name='Ready-open' id="Ready-open" label="Ready (window open)" variant="standard" />
            <TextField sx={{width: '50%'}}  name='Ready-close' id="Ready-close" label="Ready (window close)" variant="standard" />
          </Box>
          <TextField fullWidth name='Source' id="Source" label="Source" variant="standard" />
          <FormControl sx={{width: '100%', marginTop: '15px'}}>
            <Input
              fullWidth 
              name='Price' 
              id="Price" 
              type='text'
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
              placeholder='Price'
            />
          </FormControl>
          <TextField fullWidth name='Acquired' id="Acquired" label="Acquired" variant="standard" />
          <TextField 
            fullWidth 
            select 
            name='Notes' id="Notes" label="Notes" variant="standard" 
            defaultValue=' '
          >
            <MenuItem value={' '} ></MenuItem>
            <MenuItem value={'true'} >Yes</MenuItem>
            <MenuItem value={'false'} >No</MenuItem>
          </TextField>
          <TextField 
            fullWidth 
            type='number'
            name='Quantity' id="Quantity" label="Quantity" variant="standard" 
          />
          <TextField fullWidth name='Comments' id="Comments" label="Comments" variant="standard" multiline rows={3} />   
        </DialogContent>
        <DialogActions>
          <Button type='submit' >Submit</Button>
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
