'use client'

import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Wine } from '@/app/types/wine';
import { ChangeEvent } from 'react';

type WineSelectProps = {
    wines: Wine[],
    variant: 'outlined' | 'filled' | 'standard',
    handleSelectWine: (newSelected: Wine) => void,
    selectedWine: Wine | undefined
} 

export default function WineSelect({ wines, variant, handleSelectWine, selectedWine} : WineSelectProps) {

    const handleChange = (e: ChangeEvent<HTMLInputElement >) => {
      const newSelected: Wine = wines.find(wine => wine.ID === e.target.value)!
      handleSelectWine(newSelected)
    }

    return (
        <TextField
          fullWidth
          select
          id="Wine" 
          name="Wine" 
          label="Wine" 
          variant={ variant || "standard"}
          value={selectedWine?.ID || ' '}
          onChange={handleChange}
        >
          <MenuItem value={' '} ></MenuItem>
          {Object.values(wines)?.map((option) => (
            <MenuItem key={option.ID} value={option.ID}>
              {`${option.Producer}  ${option.Varietal || option.Label} ${option.Vintage}`}
            </MenuItem>
          ))}
        </TextField>  
    )
}
