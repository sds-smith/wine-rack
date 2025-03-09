
import { redirect } from "next/navigation";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { createNewCategory } from "@/app/utils/actions.admin";

export default async function AddCategoryForm() {

  const cancel = async () => {
    'use server'
    redirect(`/admin/manage_categories`)
  }

  return (
    <Box sx={{margin: {xs:'30px 0 0 0', lg: '30px 0 0 40px'}}} >
      <h4 style={{margin: '0 20px'}} >Add Category</h4>
      <form action={createNewCategory} style={{ margin: '20px 0px 20px 20px', padding: '0px'}}>
        <TextField
          fullWidth
          id="code" 
          name="code" 
          label="Category Code" 
          variant="standard"
          required
        />
        <TextField
          fullWidth
          id="title" 
          name="title" 
          label="Category Title" 
          variant="standard"
          required
        />
        <TextField
          fullWidth
          id="group" 
          name="group" 
          label="Category Group" 
          variant="standard"
          required
        />
        <Stack spacing={2} direction='row'>
          <Button type='submit' >Submit</Button>
          <Button onClick={cancel} autoFocus>Cancel</Button>
        </Stack>
      </form>
    </Box>
  )
}
