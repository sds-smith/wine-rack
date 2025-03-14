'use client'

import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Category } from '@/app/types/wine';
import { ChangeEvent } from 'react';

type CategorySelectProps = {
    categories: Category[],
    variant: 'outlined' | 'filled' | 'standard',
    handleSelectCategory: (newSelected: Category) => void,
    selectedCategory: Category
} 

export default function CategorySelect({ categories, variant, handleSelectCategory, selectedCategory} : CategorySelectProps) {

    const handleChange = (e: ChangeEvent<HTMLInputElement >) => {
      const newSelected: Category = categories.find(cat => cat.code === e.target.value)!
      handleSelectCategory(newSelected)
    }

    return (
        <TextField
          fullWidth
          select
          id="Category" 
          name="Category" 
          label="Category" 
          variant={ variant || "standard"}
          value={selectedCategory?.code || ' '}
          onChange={handleChange}
        >
          <MenuItem value={' '} ></MenuItem>
          {Object.values(categories)?.map((option) => (
            <MenuItem key={option.code} value={option.code}>
              {`${option.code}  ${option.title}`}
            </MenuItem>
          ))}
        </TextField>  
    )
}
