
import Grid from "@mui/material/Grid2";
import TopNav from "../components/navigation/TopNav";
import Sidenav from "../components/navigation/Sidenav";

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