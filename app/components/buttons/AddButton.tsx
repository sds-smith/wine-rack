'use client'

import IconButton from '@mui/material/IconButton';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Link from 'next/link';
import { useResponsive } from '@/app/hooks/useResponsive';

export default function AddButton() {
  const { isDesktop } = useResponsive();
  
  return (
    <>
      { isDesktop ?
        <Link href={`/dashboard/current_inventory/new`}>
          <IconButton aria-label="add wine" size='small'>
            <AddBoxIcon />
          </IconButton>
        </Link> :
        null
      }
    </>
  )
}
