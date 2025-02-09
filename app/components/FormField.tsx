'use client'

import { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import TableCell from '@mui/material/TableCell';
import TextField from '@mui/material/TextField';
import { Wine } from '../types/wine';

type FormFieldProps = {
    value: string,
    wine: Wine
}

export default function FormField({value, wine}: FormFieldProps) {
    const router = useRouter();

    const [ valueState, setValueState ] = useState(value);
    const [ loading, setLoading ] = useState(false);

    const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
        setLoading(true);
        setValueState(e.target.value);
        await fetch(`/api`, {
            method: 'PATCH',
            body: JSON.stringify({Quantity: e.target.value, wine})
        });
        setLoading(false);
        router.refresh();
    }

    return (
      <TableCell align="right">
          <TextField 
              variant='standard' 
              size='small' 
              type='number' 
              value={valueState} 
              onChange={handleChange}
              disabled={loading}
              InputProps={{
                disableUnderline: true, 
              }}
          />
      </TableCell>
    )
}
