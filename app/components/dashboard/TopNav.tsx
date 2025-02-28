import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuButton from './MenuButton';
import PrintButton from '../PrintButton';
import AddButton from '../AddButton';

export default function TopNav() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color='transparent'>
        <Toolbar>
          <MenuButton />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Paul and Brenda's Wine Rack
          </Typography>
          <AddButton />
          <PrintButton />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
