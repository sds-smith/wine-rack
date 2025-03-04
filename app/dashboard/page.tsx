
import { redirect } from 'next/navigation';
import { auth } from "@/auth"
import { checkFirstLogin } from '@/auth';

export default async function Home() {
  const session = await auth();
  const email = session?.user?.email;
  const firstLogin = (await checkFirstLogin(email!))?.firstLogin;

  return (
    redirect(firstLogin ? '/login/change_password' : '/dashboard/rack')
  );
}
