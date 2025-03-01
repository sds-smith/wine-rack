
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

type FooterRowProps = {
  columnHeadings: string[],
  totalBottles: number
}

export default async function FooterRow({ columnHeadings, totalBottles }: FooterRowProps) {

  return (
    <TableRow sx={{background: 'black'}}>
      <TableCell sx={{color: 'white'}} align='center' >{`Total`}</TableCell>
      { columnHeadings.map((h)=> <TableCell key={h} align="center" sx={{color: 'white'}}>{h === 'Quantity' ? `${totalBottles}` : ''}</TableCell>) }
    </TableRow>
  )
}
