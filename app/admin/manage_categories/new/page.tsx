
import { redirect } from 'next/navigation';
import Container from '@mui/material/Container';
import CategoriesTable from '../../../components/admin/CategoriesTable';
import AddCategoryForm from '@/app/components/admin/AddCategoryForm';
import { auth, checkFirstLogin } from "@/auth"
import styles from "../../../page.module.css";

export default async function NewCategoryPage() {
  const session = await auth();
  const email = session?.user?.email;
  const firstLogin = (await checkFirstLogin(email!))?.firstLogin;

  if (firstLogin) return redirect('/login/change_password')
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h3 >Manage Categories</h3>
        <Container  sx={{display: 'flex', flexWrap: 'wrap', marginTop:'20px'}}>
          <CategoriesTable disabled={true} />
          <AddCategoryForm />
        </Container>
      </main>
    </div>
  );
}
