
import TableCell from '@mui/material/TableCell';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import { updateQuantity } from '../../utils/actions';

type FormFieldProps = {
    columnId: string,
    wineID: string,
    value: string,
    page: string
}

export default function FormField({columnId, wineID, value, page}: FormFieldProps) {

    return (
      <TableCell align="right">
        <form action={updateQuantity}>
          <Input type='hidden' name='ID' defaultValue={wineID} />
          <Input type='hidden' name='page' defaultValue={page}/>
          <TextField 
            variant='standard' 
            size='small' 
            type='number' 
            name={columnId}
            defaultValue={`${value || 0}`} 
            sx={{width: '35px'}}
            InputProps={{
              disableUnderline: true, 
            }}
          />
          <input type="submit" style={{display: "none"}} />
        </form>
      </TableCell>
    )
}
