
import Grid from "@mui/material/Grid2";
import TopNav from "../components/navigation/TopNav";
import Sidenav from "../components/navigation/Sidenav";
import { signOut } from "@/auth";
import { Suspense } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const signOutUser = async () => {
    'use server';
    await signOut({ redirectTo: '/' });
  }

  return (
    <Grid  container>
      <TopNav path='admin' />
      <Suspense>
        <Sidenav signOutUser={signOutUser} />
      </Suspense>
      <Grid size={{md: 12}}>
        {children}
      </Grid>
    </Grid >
  );
}