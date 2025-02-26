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
    const { winesByID, loading, updateQuantity, handleArchive  } = useContext(OptimisticFormContext);
    const value = winesByID[wineID as keyof typeof winesByID]
        ? winesByID[wineID as keyof typeof winesByID][columnId as keyof Wine]
        : 0

    const [ openArchiveModal, setOpenArchiveModal ] = useState(false);

    const handleOpenArchiveModal = () => setOpenArchiveModal(true);
    const handleCloseArchiveModal = () => {
        setOpenArchiveModal(false);
        router.refresh();
    };

    const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        if (Number(value) >= 0) {
            await updateQuantity(value, wineID);
            if (!Number(value)) handleOpenArchiveModal();
        }
    }

    const handleConfirmArchive = () => {
        handleArchive(wineID)
        handleCloseArchiveModal()
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
              sx={{width: '30px'}}
              InputProps={{
                disableUnderline: true, 
              }}
          />
          <ArchiveModal open={openArchiveModal} handleClose={handleCloseArchiveModal} handleConfirm={handleConfirmArchive} />
      </TableCell>
    )
}
