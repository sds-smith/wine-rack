
import { redirect } from 'next/navigation';
import { auth, checkFirstLogin } from "@/auth"

export default async function Dashboard() {
  const session = await auth();
  const email = session?.user?.email;
  const firstLogin = await checkFirstLogin(email!);

  if (firstLogin) return redirect('/login/change_password')
  return (
    redirect('/admin/manage_categories')
  );
}
