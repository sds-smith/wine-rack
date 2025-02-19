'use client'

import { useContext } from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { OptimisticFormContext } from '../context/OptimisticFormContext';

type FooterRowProps = {
  columnHeadings: string[],
}

export default function FooterRow({ columnHeadings }: FooterRowProps) {
  const { metaData: { totalBottles }  } = useContext(OptimisticFormContext)

  return (
    <TableRow sx={{background: 'black'}}>
      <TableCell sx={{color: 'white'}} align='center' >{`Total`}</TableCell>
      { columnHeadings.map((h)=> <TableCell key={h} align="center" sx={{color: 'white'}}>{h === 'Quantity' ? `${totalBottles}` : ''}</TableCell>) }
    </TableRow>
  )
}
