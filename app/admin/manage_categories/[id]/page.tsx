
import { redirect } from 'next/navigation';
import Container from '@mui/material/Container';
import CategoriesTable from '../../../components/admin/CategoriesTable';
import EditCategoryForm from '@/app/components/admin/EditCategoryForm';
import { auth, checkFirstLogin} from "@/auth";
import styles from "../../../page.module.css";

type EditCategoryPageProps = { 
  params: Promise<{ id: string }>, 
}

export default async function EditCategoryPage(props: EditCategoryPageProps) {
  const session = await auth();
  const params = await props.params;
  const id = params.id;

  const email = session?.user?.email;
  const firstLogin = await checkFirstLogin(email!);

  if (firstLogin) return redirect('/login/change_password')
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h3 >Manage Categories</h3>
        <Container disableGutters sx={{display: 'flex', flexWrap: 'wrap', marginTop:'20px'}}>
          <CategoriesTable disabled={true} editID={id} />
          <EditCategoryForm categoryID={id} />
        </Container>
      </main>
    </div>
  );
}
