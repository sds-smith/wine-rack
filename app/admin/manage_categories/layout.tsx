
import { redirect } from 'next/navigation';
import Container from '@mui/material/Container';
import { auth, checkFirstLogin } from "@/auth"
import styles from "../../page.module.css";

export default async function ManageCategories({ children }: { children: React.ReactNode }) {
  const session = await auth();
  const email = session?.user?.email;
  const firstLogin = await checkFirstLogin(email!);

  if (firstLogin) return redirect('/login/change_password')
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h3 >Manage Categories</h3>
        <Container disableGutters sx={{display: 'flex', marginTop:'20px'}}>
          { children }
        </Container>
      </main>
    </div>
  );
}