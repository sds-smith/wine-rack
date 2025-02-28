'use client'

import * as React from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export default function MenuButton() {
    const searchParams = useSearchParams();
    const open = searchParams.get('open') === 'true';
    const pathname = usePathname();
    const { replace } = useRouter();
    
    const toggleDrawer = (newOpen: boolean) => () => {
      const params = new URLSearchParams(searchParams);
      if (open) {
        params.delete('open');
      } else {
        params.set('open', `${newOpen}`);
      }
      replace(`${pathname}?${params.toString()}`);
    };
      
    return (
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
        onClick={toggleDrawer(!open)}
      >
        <MenuIcon />
      </IconButton>
    )
}
