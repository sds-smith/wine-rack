'use client'

import { ChangeEvent, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import TableCell from '@mui/material/TableCell';
import TextField from '@mui/material/TextField';
import ArchiveModal from './ArchiveModal';
import { OptimisticFormContext } from '../context/OptimisticFormContext';
import { Wine } from '../types/wine';

type FormFieldProps = {
    columnId: string,
    wineID: string
}

export default function FormField({columnId, wineID}: FormFieldProps) {
    const router = useRouter();
    const { winesByID, setWinesByID, loading, setLoading  } = useContext(OptimisticFormContext);
    const value = winesByID[wineID as keyof typeof winesByID]
        ? winesByID[wineID as keyof typeof winesByID][columnId as keyof Wine]
        : 0

    const [ openArchiveModal, setOpenArchiveModal ] = useState(false);

    const handleOpenArchiveModal    = () => setOpenArchiveModal(true);
    const handleCloseArchiveModal   = () => setOpenArchiveModal(false);

    const updateQuantity = async (value: string) => {
        const newWinesByID = {
            ...winesByID,
            [wineID] : {
                ...winesByID[wineID],
                Quantity: Number(value)
            }
        }
        setWinesByID(newWinesByID)
        await fetch(`/api`, {
            method: 'PATCH',
            body: JSON.stringify({Quantity: Number(value), wineID})
        });
        setLoading(false);
        router.refresh();
    }

    const handleArchive = async () => {
        await fetch(`/api`, {
            method: 'PATCH',
            body: JSON.stringify({Archived: true, wineID})
        });
        setLoading(false);
        handleCloseArchiveModal();
        router.refresh();
    }

    const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        if (Number(value) >= 0) {
            setLoading(true);
            await updateQuantity(value);
            if (!Number(value)) handleOpenArchiveModal();
        }
    }

    return (
      <TableCell align="right">
          <TextField 
              variant='standard' 
              size='small' 
              type='number' 
              value={value} 
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
