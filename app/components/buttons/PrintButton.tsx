'use client'

import { usePathname } from 'next/navigation'
import IconButton from '@mui/material/IconButton';
import PrintIcon from '@mui/icons-material/Print';
import { useResponsive } from '@/app/hooks/useResponsive';
import { generatePdf } from '@/app/utils/pdf';

export default function PrintButton() {
  const pathname = usePathname();
  const path = pathname.split('/')
  const page = path[path.length - 1]

  const { isDesktop } = useResponsive();

  const handleClick = () => generatePdf(page);

  return (
    <>
      { isDesktop
        ? <IconButton aria-label="print" size='small' onClick={handleClick}>
            <PrintIcon />
          </IconButton>
        : null
      }
    </>
  )
}
