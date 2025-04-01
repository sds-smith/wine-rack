
import useMediaQuery from '@mui/material/useMediaQuery';
import theme from '../theme';

export function useResponsive() {
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return {
        isDesktop,
        isMobile
    }
}