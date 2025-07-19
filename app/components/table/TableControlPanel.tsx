'use client'

import { ChangeEvent } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import MenuItem from '@mui/material/MenuItem';
import { CategoriesByCode } from '@/app/types/wine';
import { Page } from '@/app/utils/data';

const pages = {
  'current_inventory' : 'Current Inventory',
  'archived' : 'Archived Wines',
  'get_more' : 'Get More'
}

type TableControlPanelProps = {
    categoriesByCode: CategoriesByCode,
    page: Page
}

export default function TableControlPanel({categoriesByCode, page} : TableControlPanelProps) {
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const filter_by_category = searchParams.get('filter_by_category');
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newFilterCategory = e.target.value;
        if (!newFilterCategory) {
          params.delete('filter_by_category');
        } else {
          params.set('filter_by_category', `${newFilterCategory}`);
        }
        replace(`${pathname}?${params.toString()}`);
    }

    const clearFilter = () => {
        params.delete('filter_by_category');
        replace(`${pathname}?${params.toString()}`);
    }
    
    return (
      <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
        <h3>{pages[page as keyof typeof pages]}</h3>
        <Box sx={{display: 'flex', width: '300px'}}>
          <TextField
            fullWidth
            select
            id="Category" 
            name="Category" 
            label="Filter by Category" 
            variant={"standard"}
            value={filter_by_category || ''}
            onChange={handleChange}
          >
            <MenuItem value={''} ></MenuItem>
            {Object.values(categoriesByCode)?.map((option) => (
              <MenuItem key={option.code} value={option.code}>
                {`${option.code}  ${option.title}`}
              </MenuItem>
            ))}
          </TextField>
          <IconButton onClick={clearFilter} disabled={!filter_by_category} sx={{width: '60px'}}>
            { filter_by_category && <FilterAltOffIcon />}
          </IconButton>
        </Box>
      </Toolbar>
    )
}
