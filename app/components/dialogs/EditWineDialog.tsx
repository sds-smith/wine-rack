
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
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import ConfirmationDialog from './ConfirmationDialog';
import { Wine, Category } from '../../types/wine';
import { updateWine, deleteWine } from '../../utils/actions';

type EditWineDialogProps = {
  categories: Category[],
  wine: Wine,
  page: string
} 

export default function EditWineDialog({categories, wine, page}: EditWineDialogProps) {  

  const handleClose = async () => {
    'use server'
    redirect(`/dashboard/${page}`)
  }

  const handleConfirm = async () => {
    'use server'
    await deleteWine(wine.ID!, page)
  }

  return (
    <Dialog
      open
      aria-labelledby="add-wine-dialog-title"
      aria-describedby="add-wine-dialog-description"
    >
      <DialogTitle id="add-wine-dialog-title" sx={{paddingBottom: '0px'}}>
        Edit Wine
      </DialogTitle>
      <form action={updateWine} >
        <DialogContent sx={{paddingTop: '0px'}}>
          <Input type='hidden' name='ID' defaultValue={wine.ID}/>
          <Input type='hidden' name='page' defaultValue={page}/>
          <TextField
            fullWidth
            select
            id="Category" 
            name="Category" 
            label="Category" 
            variant="standard"
            defaultValue={wine.Category || ' '}
          >
            <MenuItem value={' '} ></MenuItem>
            {Object.values(categories)?.map((option) => (
              <MenuItem key={option.code} value={option.code}>
                {`${option.code}  ${option.title}`}
              </MenuItem>
            ))}
          </TextField>
          <TextField fullWidth name='Varietal' id="Varietal" label="Varietal" variant="standard" defaultValue={wine.Varietal || ''} />
          <TextField fullWidth name='Country' id="Country" label="Country" variant="standard" defaultValue={wine.Country || ''} />
          <TextField fullWidth name='Vintage' id="Vintage" label="Vintage" variant="standard"  defaultValue={wine.Vintage || ''} />
          <TextField 
            fullWidth 
            name='Producer' id="Producer" label="Producer" variant="standard" 
            defaultValue={wine.Producer || ''}
          />
          <TextField 
            fullWidth 
            name='Label' id="Label" label="Label" variant="standard" 
            defaultValue={wine.Label || ''}
          />
          <TextField fullWidth name='Appellation' id="Appellation" label="Appellation" variant="standard" defaultValue={wine.Appellation || ''} />
          <Box sx={{width: '100%', marginTop: '0px'}}>
            <TextField sx={{width: '50%'}}  name='Ready-open' id="Ready-open" label="Ready (window open)" variant="standard" defaultValue={wine.Ready?.open || ''}/>
            <TextField sx={{width: '50%'}}  name='Ready-close' id="Ready-close" label="Ready (window close)" variant="standard" defaultValue={wine.Ready?.close || ''}/>
          </Box>
          <TextField fullWidth name='Source' id="Source" label="Source" variant="standard" defaultValue={wine.Source || ''} />
          <FormControl sx={{width: '100%', marginTop: '15px'}}>
            <Input
              fullWidth 
              name='Price' 
              id="Price" 
              type='text'
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
              placeholder='Price'
              defaultValue={wine.Price || ''}
            />
          </FormControl>
          <TextField fullWidth name='Acquired' id="Acquired" label="Acquired" variant="standard" defaultValue={wine.Acquired || ''} />
          <TextField 
            fullWidth 
            select 
            name='Notes' id="Notes" label="Notes" variant="standard" 
            defaultValue={`${wine.Notes}` || ' '}
          >
            <MenuItem value={' '} ></MenuItem>
            <MenuItem value={'true'} >Yes</MenuItem>
            <MenuItem value={'false'} >No</MenuItem>
          </TextField>
          <TextField 
            fullWidth 
            type='number'
            name='Quantity' id="Quantity" label="Quantity" variant="standard" 
            defaultValue={wine.Quantity || ''}
          />
          <TextField fullWidth name='Comments' id="Comments" label="Comments" variant="standard" multiline rows={3} defaultValue={wine.Comments || ''} />   
        </DialogContent>
        <DialogActions>
          <FormControlLabel 
            sx={{width: '20%', color: 'rgba(0, 0, 0, 0.6)' }} 
            control={<Checkbox name='GetMore' defaultChecked={wine.GetMore} inputProps={{ 'aria-label': 'uncontrolled' }} />} 
            label="Get More" 
          />
          <FormControlLabel 
            sx={{width: '33%', color: 'rgba(0, 0, 0, 0.6)' }} 
            control={<Checkbox name='Archived' defaultChecked={wine.Archived} inputProps={{ 'aria-label': 'uncontrolled' }} />} 
            label="Archive" 
          />
          <ConfirmationDialog 
            handleConfirm={handleConfirm}
            disabled={false}
          />
          <Button type='submit' >Submit</Button>
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
