// 'use client'

import React from 'react'
import TableCell from '@mui/material/TableCell';
import FormField from './FormField';
import { Wine } from '../types/wine';

type TableBodyCellProps = {
  wine: Wine,
  columnId: string
}

const boolToYesNo = {
  true: 'Yes',
  false: 'No',
  null: ''
}

export default function TableBodyCell({columnId, wine}: TableBodyCellProps) {
  const cellContent = columnId === 'Ready'
    ? !wine.Ready.close || wine.Ready.close === wine.Ready.open ? `${wine.Ready.open }`: `${wine.Ready.open} - ${wine.Ready.close}`
    : columnId === 'Notes' ? boolToYesNo[`${wine.Notes}`] 
    : columnId === 'Price' ? (Boolean(wine.Price) && Number(wine.Price) > 0) ? `$${wine.Price}` : ''
    : wine[columnId as keyof Wine] ? `${wine[columnId as keyof Wine]}` : '';

    const { ID } = wine;

  return (
    <>
      { columnId === 'Quantity'
        ? <FormField columnId={columnId} wineID={ID!}/>
        : <TableCell align="center">{cellContent}</TableCell>
      }
    </>
  )
}
