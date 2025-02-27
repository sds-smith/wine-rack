
import Grid from "@mui/material/Grid2";
import Sidenav from "../components/dashboard/Sidenav";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
      <Grid container >
        <Grid size={{xs: 12, md: 1}}>
          <Sidenav />
        </Grid>
        <Grid size={{md: 11}} >{children}</Grid>
      </Grid>
    );
  }