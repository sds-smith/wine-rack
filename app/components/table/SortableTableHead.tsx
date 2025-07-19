'use client'

import { useState } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell, { SortDirection } from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";
import Tooltip from '@mui/material/Tooltip';
import Box from "@mui/material/Box";
import FilterListOffIcon from '@mui/icons-material/FilterListOff';
import { visuallyHidden } from '@mui/utils';
import { Column } from "@/app/types/wine";
import { IconButton } from '@mui/material';

type Order = 'asc' | 'desc';
type OrderBy = Column | 'open' | 'close' | undefined;

type SortableTableHeadProps = {
  columns: Column[]
}

export default function SortableTableHead({columns} : SortableTableHeadProps) {
  const searchParams = useSearchParams();
  const orderBy = searchParams.get('orderBy') as OrderBy;
  const order = searchParams.get('order') as SortDirection;
  const params = new URLSearchParams(searchParams);
  const pathname = usePathname();
  const { replace } = useRouter();

  const [open, setOpen] = useState(false);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: Column,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    const newOrder = isAsc ? 'desc' : 'asc';
    params.set('orderBy', property);
    params.set('order', newOrder);
    replace(`${pathname}?${params.toString()}`);
  };

  const clearSort = () => {
    params.delete('orderBy');
    params.delete('order');
    replace(`${pathname}?${params.toString()}`);
  }

  const createSortHandler =
  (property: Column) => (event: React.MouseEvent<unknown>) => {
    handleRequestSort(event, property);
  };

  return (
    <TableHead sx={{position: 'sticky', top: 0}}>
      <TableRow sx={{background: 'black'}}>
        <TableCell size='small'  >
          <IconButton 
            sx={{color: orderBy ? 'white' : 'unset'}}
            onClick={clearSort}
            disabled={!orderBy}
          >
            <FilterListOffIcon/>
          </IconButton>
        </TableCell>
        { columns.map((h: Column) => (
          <TableCell
            key={h}
            align="center"
            sx={{color: 'white',...(['open','close'].includes(h) && { display: 'none'}),}}
            sortDirection={orderBy === h ? order : undefined}
          >
            { h === 'Ready' 
              ? <div
                  style={{ display: "inline" }}
                  onMouseOver={() => setOpen(true)}
                  onMouseLeave={() => setOpen((['open','close'] as OrderBy[]).includes(orderBy))}
                ><Tooltip
                  placement='top'
                  open={open}
                  title={<><div>
                    <TableSortLabel
                      active={orderBy === 'open'}
                      direction={(orderBy === 'open' ? order : 'asc') as Order}
                      onClick={createSortHandler('open' as Column)}
                      sx={{
                        color: 'white !important',
                        '& .MuiTableSortLabel-icon': {
                            color: 'white !important',
                        },
                    }}
                    >
                      {'Sort by Open'}
                      {orderBy === 'open' ? (
                        <Box component="span" sx={{...visuallyHidden, color: 'white'}}>
                          {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                        </Box>
                      ) : null}
                    </TableSortLabel></div><div>
                    <TableSortLabel
                      active={orderBy === 'close'}
                      direction={(orderBy === 'close' ? order : 'asc') as Order}
                      onClick={createSortHandler('close' as Column)}
                      sx={{
                        color: 'white !important',
                        '& .MuiTableSortLabel-icon': {
                            color: 'white !important',
                        },
                    }}
                    >
                      {'Sort by Close'}
                      {orderBy === 'close' ? (
                        <Box component="span" sx={{...visuallyHidden, color: 'white'}}>
                          {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                        </Box>
                      ) : null}
                    </TableSortLabel>
                  </div></>}

                >
                  <span>{h}</span>
                </Tooltip></div>
              : <TableSortLabel 
                  sx={{
                    color: 'white !important',
                    '& .MuiTableSortLabel-icon': {
                        color: 'white !important',
                    },
                  }} 
                  active={orderBy === h}
                  direction={(orderBy === h ? order : 'asc') as Order}
                  onClick={createSortHandler(h as Column)}
                >
                  {h}
                  {orderBy === h ? (
                    <Box component="span" sx={{...visuallyHidden, color: 'white'}}>
                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </Box>
                  ) : null}
                </TableSortLabel>
            }
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}