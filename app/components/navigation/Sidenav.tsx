'use client'

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import WineBarIcon from '@mui/icons-material/WineBar';
import ArchiveIcon from '@mui/icons-material/Archive';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import LogoutIcon from '@mui/icons-material/Logout';
import IconButton from '@mui/material/IconButton';

export default function Sidenav({ signOutUser } : { signOutUser: () => void }) {
  const searchParams = useSearchParams();
  const open = searchParams.get('open') === 'true';
  const pathname = usePathname();
  const { replace } = useRouter();



  const toggleDrawer = (newOpen: boolean) => () => {
    const params = new URLSearchParams(searchParams);
    if (open) {
      params.delete('open');
    } else {
      params.set('open', `${newOpen}`);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250, height: '90%' }} role="presentation" >
          <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
            <IconButton onClick={toggleDrawer(false)}>
              <ChevronLeftIcon /> 
            </IconButton>
          </Box>
          <Divider />
          <List
            subheader={
              <ListSubheader component="div" id="tables-list-subheader">
                Tables
              </ListSubheader>
            }
          >
            <ListItem disablePadding >
              <Link href='/dashboard/rack'>
                <ListItemButton>
                  <ListItemIcon>
                    <WineBarIcon />
                  </ListItemIcon>
                  <ListItemText primary={'Current Inventory'} />
                </ListItemButton>
              </Link>
            </ListItem>              
            <ListItem  disablePadding >
            <Link href='/dashboard/archived'>
              <ListItemButton>
                <ListItemIcon>
                  <ArchiveIcon />
                </ListItemIcon>
                <ListItemText primary={'Archived'} />
              </ListItemButton>
            </Link >
            </ListItem>              
            <ListItem  disablePadding>
              <Link href='/dashboard/get_more'>
                <ListItemButton>
                  <ListItemIcon>
                    <ShoppingCartIcon />
                  </ListItemIcon>
                  <ListItemText primary={'Get More'} />
                </ListItemButton>
              </Link >
            </ListItem>
          </List>
        </Box>
        <Divider />
        <form
          action={signOutUser}
        >
          <ListItemButton component='button' type='submit' >
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary={'Sign Out'} />
          </ListItemButton>
        </form>
      </Drawer>
    </div>
  );
}
