import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import MenuButton from './MenuButton';


export default function TopNav() {

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <MenuButton />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Paul and Brenda's Wine Rack
          </Typography>
          <Link href={`/dashboard/rack/new`}>New</Link>
          <Link href={`/print`}>Print</Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
