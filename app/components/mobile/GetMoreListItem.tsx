'use client'

import { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import { GetMoreWines } from '@/app/mobile/get_more/page';

type GetMoreListItemProps = {
    wine: GetMoreWines
}

export default function GetMoreListItem({wine} : GetMoreListItemProps) {
    const [ open, setOpen ] = useState<string>('');

    const handleExpand = (id: string | undefined) => {
        if (!!id) {
            if (open === id) {
                setOpen('');
            } else {
                setOpen(id)
            }
        }
    }

    return (
      <>
          <ListItemButton onClick={() => handleExpand(wine.ID)}>
              <ListItemText primary={`${wine.Producer}  ${wine.Varietal || wine.Label} ${wine.Vintage}`} />
              { open === wine.ID ? <ExpandLess /> : <ExpandMore /> }
          </ListItemButton>
          <Collapse in={open === wine.ID} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              { Object.entries(wine).map(([ title, value]) => {
                if (title !== 'ID') {
                    return (
                        <ListItem key={title} sx={{pl: 8}}>
                            <ListItemText primary={`${title}: ${value}`}/>
                        </ListItem>
                )}
}             )}
            </List>
          </Collapse>
      </>
    )
}
