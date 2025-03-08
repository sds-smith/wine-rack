
import { redirect } from 'next/navigation';
import Container from '@mui/material/Container';
import Link from 'next/link';
import { auth } from "@/auth"
import { checkFirstLogin } from '@/auth';
import styles from "../page.module.css";

export default async function Dashboard() {
  const session = await auth();
  const email = session?.user?.email;
  const firstLogin = (await checkFirstLogin(email!))?.firstLogin;

  if (firstLogin) return redirect('/login/change_password')
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h3 >Admin Panel</h3>
        <Container  sx={{display: 'flex', flexWrap: 'wrap', marginTop:'20px'}}>
          <Link href='/admin/manage_categories'>Manage Categories</Link>
        </Container>
      </main>
    </div>
  );
}
