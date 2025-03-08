
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuButton from './MenuButton';
import PrintButton from '../buttons/PrintButton';
import AddButton from '../buttons/AddButton';
import { auth } from '@/auth';

type TopNavProps = {
  path: string,
}

export default async function TopNav({path}: TopNavProps) {
  const session = await auth()
  const user = session?.user || {};

  const title: string = process.env.TITLE || '';
  const [ first, second ] = title.split(' and ');

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color='transparent'>
        <Toolbar>
          <MenuButton />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <span style={{textDecoration: user?.name === first ? 'underline' : 'none'}}>{first}</span>
            { second && 
              <span style={{textDecoration: user?.name === second ? 'underline' : 'none'}}>{` and ${second}`}</span>
            }
            {`'s Wine Rack`}
          </Typography>
          { path === 'dashboard' && <AddButton />}
          { path === 'dashboard' && <PrintButton />}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
