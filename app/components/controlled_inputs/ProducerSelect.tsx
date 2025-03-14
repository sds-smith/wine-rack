'use client'

import { ChangeEvent } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

type ProducerSelectProps = {
    producers: string[],
    variant: 'outlined' | 'filled' | 'standard',
    handleSelectProducer: (newSelected: string) => void,
    selectedProducer: string
} 

export default function ProducerSelect({ producers, variant, handleSelectProducer, selectedProducer} : ProducerSelectProps) {

    const handleChange = (e: ChangeEvent<HTMLInputElement >) => {
      handleSelectProducer(e.target.value)
    }

    return (
        <TextField
          fullWidth
          select
          id="Producer" 
          name="Producer" 
          label="Producer" 
          variant={ variant || "standard"}
          value={selectedProducer || ' '}
          onChange={handleChange}
        >
          <MenuItem value={' '} ></MenuItem>
          {Object.values(producers)?.map((option) => (
            <MenuItem key={option} value={option}>
              {`${option}`}
            </MenuItem>
          ))}
        </TextField>  
    )
}
