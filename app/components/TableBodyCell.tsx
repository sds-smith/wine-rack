import React from 'react'
import TableCell from '@mui/material/TableCell';
import FormField from './FormField';
import { Wine } from '../hooks/useWines';

type TableBodyCellProps = {
    wine: Wine,
    columnId: string
}

export default function TableBodyCell({columnId, wine}: TableBodyCellProps) {
  return (
    <>
        { columnId === 'Quantity'
            ? <FormField value={wine[columnId as keyof Wine]?.toString()} wine={wine} />
            : <TableCell align="center">{wine[columnId as keyof Wine]?.toString()}</TableCell>
        }
    </>
  )
}
