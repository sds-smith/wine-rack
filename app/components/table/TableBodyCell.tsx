import { Suspense } from 'react';
import TableCell from '@mui/material/TableCell';
import FormField from './FormField';
import { Wine } from '../../types/wine';

type TableBodyCellProps = {
  wine: Wine,
  columnId: string,
  page: string,
  categoryColor: string,
}

const boolToYesNo = {
  true: 'Yes',
  false: 'No',
  null: ''
}

export default async function TableBodyCell({columnId, wine, page, categoryColor}: TableBodyCellProps) {

  const cellContent = columnId === 'Ready'
    ? !wine.Ready.close || wine.Ready.close === wine.Ready.open ? `${wine.Ready.open }`: `${wine.Ready.open} - ${wine.Ready.close}`
    : columnId === 'Notes' ? boolToYesNo[`${wine.Notes}`] 
    : columnId === 'Price' ? (Boolean(wine.Price) && Number(wine.Price) > 0) ? `$${wine.Price}` : ''
    : wine[columnId as keyof Wine] ? `${wine[columnId as keyof Wine]}` : '';

  const { ID } = wine;

  return (
    <Suspense>
      { columnId === 'Quantity'
        ? <FormField columnId={columnId} wineID={ID!} value={cellContent} page={page}/>
        // : <TableCell align="center" sx={ columnId === 'Varietal' ? { backgroundColor } : {}}>{cellContent}</TableCell>
        : <TableCell align="center" >{columnId === 'Varietal' ? categoryColor : cellContent}</TableCell>
        // : <TableCell align="center" >{cellContent}</TableCell>
      }
    </Suspense>
  )
}
