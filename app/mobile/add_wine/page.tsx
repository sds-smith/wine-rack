
import { redirect } from 'next/navigation';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';
import Input from '@mui/material/Input';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import { createNewWine } from '../../utils/actions.wine';
import { getCategories } from '@/app/utils/data';
import styles from '../../page.module.css'

export default async function page() {
    const { categories } = await getCategories();

    const handleCancel = async () => {
        'use server'
        redirect('/dashboard')
    };

    return (
      <div className={styles.mobile_page}>
        <main className={styles.main}>
          <Container>
            <h2>Add New Wine to Inventory</h2>
            <form action={createNewWine} >
                <Input type='hidden' name='page' id='page' value='dashboard'/>
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
                <Button type='submit' >Submit</Button>
                <Button onClick={handleCancel} autoFocus>
                  Cancel
                </Button>
            </form>
          </Container>
        </main>
      </div>
    )
}
