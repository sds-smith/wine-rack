'use client'

import React from 'react';
import IconButton from '@mui/material/IconButton';
import PrintIcon from '@mui/icons-material/Print';
import Link from 'next/link';

export default function PrintButton() {

    return (
      <Link href={`/print`}>
        <IconButton aria-label="print" size='small'>
            <PrintIcon />
        </IconButton>
      </Link>
    )
}
