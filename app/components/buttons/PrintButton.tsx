'use client'

import IconButton from '@mui/material/IconButton';
import PrintIcon from '@mui/icons-material/Print';
import { useResponsive } from '@/app/hooks/useResponsive';

export default function PrintButton() {

  const { isDesktop } = useResponsive();

  return (
    <>
      { isDesktop
        ? <IconButton aria-label="print" size='small'>
            <PrintIcon />
          </IconButton>
        : null
      }
    </>
  )
}
