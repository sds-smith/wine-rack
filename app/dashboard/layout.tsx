
import Grid from "@mui/material/Grid2";
import TopNav from "../components/dashboard/TopNav";
import Sidenav from "../components/dashboard/Sidenav";

export default function Layout({ children }: { children: React.ReactNode }) {

    return (
      <Grid  container>
        <TopNav />
        <Sidenav />
        <Grid size={{md: 12}}>
          {children}
        </Grid>
      </Grid >
    );
  }