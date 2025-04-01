'use client';

import { createTheme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

const borderTheme = `1px solid ${grey[500]}`

const theme = createTheme({
  typography: {
    fontFamily: 'var(--font-geist-sans),var(--font-geist-mono)',
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: borderTheme,
          '&:first-child': { borderLeft: borderTheme },
          '&:last-child': { borderRight: borderTheme },
        }
      }
    } 
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 820,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default theme;