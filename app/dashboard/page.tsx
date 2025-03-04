
import { redirect } from 'next/navigation';
import { auth } from "@/auth"
import { checkFirstLogin } from '@/auth';
import CurrentInventoryByCategory from '../components/graphs/CurrentInventoryByCategory';
import SampleGraph from '../components/graphs/SampleGraph';

export default async function Dashboard() {
  const session = await auth();
  const email = session?.user?.email;
  const firstLogin = (await checkFirstLogin(email!))?.firstLogin;

  if (firstLogin) return redirect('/login/change_password')
  return (
    <div>Dashboard
      <CurrentInventoryByCategory />
      <SampleGraph />
    </div>
  );
}
