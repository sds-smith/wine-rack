import { Suspense } from "react";
import TopNav from "../components/navigation/TopNav";
import Sidenav from "../components/navigation/Sidenav";
import { signOut } from "@/auth";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const signOutUser = async () => {
    'use server';
    await signOut({ redirectTo: '/' });
  }

  return (
    <>
      <TopNav path='admin' />
      <Suspense>
        <Sidenav signOutUser={signOutUser} />
      </Suspense>
      {children}
    </>
  );
}