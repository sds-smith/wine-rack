'use client'

import { usePathname } from 'next/navigation'
import IconButton from '@mui/material/IconButton';
import PrintIcon from '@mui/icons-material/Print';
import Link from 'next/link';
import { useResponsive } from '@/app/hooks/useResponsive';

export default function PrintButton() {
  const pathname = usePathname();
  const path = pathname.split('/')
  const page = path[path.length - 1]

  const { isDesktop } = useResponsive();

  return (
    <>
      { isDesktop
        ? <Link href={`/print/${page}`}>
            <IconButton aria-label="print" size='small'>
              <PrintIcon />
            </IconButton>
          </Link>
        : null
      }
    </>
  )
}
