
import TableCell from '@mui/material/TableCell';
import FormField from './FormField';
import { Wine } from '../../types/wine';
import { lime, yellow, amber, red, pink, purple } from '@mui/material/colors';

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
const varietalBackground = {
  "01-W" : yellow[50],
  "02-W" : yellow[100],
  "03-W" : amber[100],
  "04-W" : yellow[300],
  "05-W" : lime[100],
  "06-R" : pink[50],
  "07-R" : purple[50],
  "08-R" : purple[100],
  "09-W" : yellow[50],
  "09-R" : red[50],
  "10-R" : purple[500],
  "11-R" : pink[500],
  "12-R" : purple[400],
  "13-R" : purple[400],
  "14-R" : purple[600],
  "15-R" : purple[700],
  "16-R" : yellow[50],
  "17-R" : yellow[50],
  "18-R" : yellow[50],
  "19-R" : yellow[50],
  "20-D" : yellow[50],
  "25-M" : yellow[50],
}

export default function TableBodyCell({columnId, wine, page}: TableBodyCellProps) {
  const cellContent = columnId === 'Ready'
    ? !wine.Ready.close || wine.Ready.close === wine.Ready.open ? `${wine.Ready.open }`: `${wine.Ready.open} - ${wine.Ready.close}`
    : columnId === 'Notes' ? boolToYesNo[`${wine.Notes}`] 
    : columnId === 'Price' ? (Boolean(wine.Price) && Number(wine.Price) > 0) ? `$${wine.Price}` : ''
    : wine[columnId as keyof Wine] ? `${wine[columnId as keyof Wine]}` : '';

    const { ID } = wine;
    const backgroundColor = varietalBackground[wine.Category as keyof typeof varietalBackground]

  return (
    <>
      { columnId === 'Quantity'
        ? <FormField columnId={columnId} wineID={ID!} value={cellContent} page={page}/>
        : <TableCell align="center" sx={ columnId === 'Varietal' ? { backgroundColor } : {}}>{cellContent}</TableCell>
      }
    </>
  )
}
