
import { redirect } from 'next/navigation';
import Container from '@mui/material/Container';
import { auth } from "@/auth"
import { checkFirstLogin } from '@/auth';
import styles from "../page.module.css";
import CategoriesTable from '../components/admin/CategoriesTable';

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
            <CategoriesTable />
        </Container>
      </main>
    </div>
  );
}
