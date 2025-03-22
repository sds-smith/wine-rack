
import { redirect } from "next/navigation";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { getCategories } from '@/app/utils/data';
import { updateCategory } from "@/app/utils/actions.admin";

export default async function EditCategoryForm({categoryID} : { categoryID: string }) {
  const { categories } = await getCategories();
  const category = categories.find(category => category.ID === categoryID);

  const cancel = async () => {
    'use server'
    redirect(`/admin/manage_categories`)
  }

  return (
    <Box sx={{margin: {xs:'30px 0 0 0', lg: '30px 0 0 20px' }}} >
      <h4 style={{margin: '0 20px'}} >Edit Category</h4>
      <form action={updateCategory} style={{ margin: '0px 0px 0px 20px', padding: '0px' }}>
        <Input type='hidden' name='ID' defaultValue={categoryID}/>
        <TextField
          fullWidth
          id="code" 
          name="code" 
          label="Category Code" 
          variant="standard"
          defaultValue={category?.code || ' '}
        />
        <TextField
          fullWidth
          id="title" 
          name="title" 
          label="Category Title" 
          variant="standard"
          defaultValue={category?.title || ' '}
        />
        <TextField
          fullWidth
          id="group" 
          name="group" 
          label="Category Group" 
          variant="standard"
          defaultValue={category?.group || ' '}
        />
        <TextField
          fullWidth
          id="color" 
          name="color" 
          label="Category Color" 
          variant="standard"
          defaultValue={category?.color || ' '}
        />
        <Stack spacing={2} direction='row'>
          <Button type='submit' >Submit</Button>
          <Button onClick={cancel} autoFocus>Cancel</Button>
        </Stack>
      </form>
    </Box>
  )
}
