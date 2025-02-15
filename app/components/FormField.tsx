'use client'

import { ChangeEvent, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import TableCell from '@mui/material/TableCell';
import TextField from '@mui/material/TextField';
import ArchiveModal from './ArchiveModal';
import { Wine } from '../types/wine';

type FormFieldProps = {
    value: string,
    wine: Wine
}

export default function FormField({value, wine}: FormFieldProps) {
    const router = useRouter();

    const [ valueState, setValueState ] = useState(value);
    const [ loading, setLoading ] = useState(false);
    const [ openArchiveModal, setOpenArchiveModal ] = useState(false);

    const handleOpenArchiveModal    = () => setOpenArchiveModal(true);
    const handleCloseArchiveModal   = () => setOpenArchiveModal(false);

    const updateQuantity = async (value: string) => {
        await fetch(`/api`, {
            method: 'PATCH',
            body: JSON.stringify({Quantity: value, wine})
        });
        setLoading(false);
        router.refresh();
    }

    const handleArchive = async () => {
        await fetch(`/api`, {
            method: 'PATCH',
            body: JSON.stringify({Archived: true, wine})
        });
        setLoading(false);
        handleCloseArchiveModal();
        router.refresh();
    }

    const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setLoading(true);
        setValueState(value);
        await updateQuantity(value);
        if (!Number(value)) handleOpenArchiveModal();
    }

    useEffect(() => setValueState(value), [value])

    return (
      <TableCell align="right">
          <TextField 
              variant='standard' 
              size='small' 
              type='number' 
              value={valueState} 
              onChange={handleChange}
              disabled={loading}
              sx={{width: '45px'}}
              InputProps={{
                disableUnderline: true, 
              }}
          />
          <ArchiveModal open={openArchiveModal} handleClose={handleCloseArchiveModal} handleConfirm={handleArchive} />
      </TableCell>
    )
}
