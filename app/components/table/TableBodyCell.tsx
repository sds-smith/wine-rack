
import TableCell from '@mui/material/TableCell';
import FormField from './FormField';
import { Wine } from '../../types/wine';
// import { getCategories } from '@/app/utils/data';

type TableBodyCellProps = {
  wine: Wine,
  columnId: string,
  page: string,
}

const boolToYesNo = {
  true: 'Yes',
  false: 'No',
  null: ''
}

export default async function TableBodyCell({columnId, wine, page}: TableBodyCellProps) {
  // const { categoriesByCode } = await getCategories();
  // const { color: backgroundColor } = categoriesByCode[wine.Category];

  const cellContent = columnId === 'Ready'
    ? !wine.Ready.close || wine.Ready.close === wine.Ready.open ? `${wine.Ready.open }`: `${wine.Ready.open} - ${wine.Ready.close}`
    : columnId === 'Notes' ? boolToYesNo[`${wine.Notes}`] 
    : columnId === 'Price' ? (Boolean(wine.Price) && Number(wine.Price) > 0) ? `$${wine.Price}` : ''
    : wine[columnId as keyof Wine] ? `${wine[columnId as keyof Wine]}` : '';

  const { ID } = wine;

  return (
    <>
      { columnId === 'Quantity'
        ? <FormField columnId={columnId} wineID={ID!} value={cellContent} page={page}/>
        // : <TableCell align="center" sx={ columnId === 'Varietal' ? { backgroundColor } : {}}>{cellContent}</TableCell>
        : <TableCell align="center" >{cellContent}</TableCell>
      }
    </>
  )
}
