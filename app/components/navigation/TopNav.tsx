
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuButton from './MenuButton';
import PrintButton from '../buttons/PrintButton';
import AddButton from '../buttons/AddButton';
import { auth } from '@/auth';

export default async function TopNav() {
  const session = await auth()
  const user = session?.user || {};

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color='transparent'>
        <Toolbar>
          <MenuButton />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <span style={{textDecoration: user?.name === 'Paul' ? 'underline' : 'none'}}>Paul</span>
            {` and `}
            <span style={{textDecoration: user?.name === 'Brenda' ? 'underline' : 'none'}}>Brenda's</span>
            {` Wine Rack`}
          </Typography>
          <AddButton />
          <PrintButton />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
