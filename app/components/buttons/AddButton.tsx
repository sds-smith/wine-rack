'use client'

import useMediaQuery from '@mui/material/useMediaQuery';
import IconButton from '@mui/material/IconButton';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Link from 'next/link';
import theme from '@/app/theme';

export default function AddButton() {

  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

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
