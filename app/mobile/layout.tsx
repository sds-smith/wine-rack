import { Suspense } from "react";
import TopNav from "../components/navigation/TopNav";
import Sidenav from "../components/navigation/Sidenav";
import { signOut } from "@/auth";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const signOutUser = async () => {
    'use server';
    await signOut({ redirectTo: '/' });
  }

  return (
    <>
      <TopNav path='dashboard' />
      <Suspense>
        <Sidenav signOutUser={signOutUser} />
      </Suspense>
      {children}
    </>
  );
}