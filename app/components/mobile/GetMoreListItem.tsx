'use client'

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import { GetMoreWines } from '@/app/mobile/get_more/page';
import { grey } from '@mui/material/colors';

type GetMoreListItemProps = {
    wine: GetMoreWines
}

export default function GetMoreListItem({wine} : GetMoreListItemProps) {
    const searchParams = useSearchParams();
    const open = searchParams.get('open_list_item') === wine.ID;
    const pathname = usePathname();
    const { replace } = useRouter();
    
    const handleExpand = () => {
      const params = new URLSearchParams(searchParams);
      if (open) {
        params.delete('open_list_item');
      } else {
        params.set('open_list_item', `${wine.ID}`);
      }
      replace(`${pathname}?${params.toString()}`);
    };

    return (
      <>
          <ListItemButton onClick={handleExpand} sx={open ? {backgroundColor: grey[200]} : {}}>
              <ListItemText 
                primary={
                    <span style={ open ? {fontWeight: 'bold'} : {}}>
                        {`${wine.Producer}  ${wine.Varietal || wine.Label} ${wine.Vintage}`}
                    </span>
                } 
              />
              { open ? <ExpandLess /> : <ExpandMore /> }
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              { Object.entries(wine).map(([ title, value]) => {
                if (title !== 'ID') {
                    return (
                        <ListItem key={title} sx={{pl: 8}}>
                            <ListItemText primary={<><span style={{fontWeight: 'bold'}}>{title}:</span>  {value || ' '}</>}/>
                        </ListItem>
                )}
}             )}
            </List>
          </Collapse>
          <Divider />
      </>
    )
}
