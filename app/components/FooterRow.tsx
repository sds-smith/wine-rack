
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { getWines } from '../utils/getWines';

type FooterRowProps = {
  columnHeadings: string[],
}

export default async function FooterRow({ columnHeadings }: FooterRowProps) {
  const { metaData: { totalBottles } } = await getWines();

  return (
    <TableRow sx={{background: 'black'}}>
      <TableCell sx={{color: 'white'}} align='center' >{`Total`}</TableCell>
      { columnHeadings.map((h)=> <TableCell key={h} align="center" sx={{color: 'white'}}>{h === 'Quantity' ? `${totalBottles}` : ''}</TableCell>) }
    </TableRow>
  )
}
